import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { movies } from '../entity';
import { CrudService } from '../../../utils/crudService';
import { errorHandler, notFound } from '../../../utils/errorHandler';
import { actors, movieActors } from '../../actors/entity';
import { IMDB_API_MOVIE_CAST, IMDB_API_CAST_DETAILS } from '../../../utils/constants';
import axios from 'axios';
import { producers } from '../../producers/entity';

export class MovieService extends CrudService<typeof movies> {
  constructor() {
    super(db, {
      table: movies,
      entityName: 'Movie',
      relations: [
        {
          table: movieActors,
          foreignKey: 'movieId'
        }
      ]
    });
  }

  override getByImdbId = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const entity = await this.db.select().from(this.table).where(eq(this.table.imdbId, id));

      if (entity.length === 0) {
        throw notFound(this.entityName);
      }

      // Get actors for the movie
      const movie = entity[0];
      const { actors, producer } = await this.fetchMovieActors(movie);

      // Return movie with actors
      res.json({
        ...movie,
        actors,
        producer: producer?.[0]
      });
    } catch (error) {
      errorHandler(error as Error, res);
    }
  }

  // Additional specialized methods that are specific to movies
  getMovieActors = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      // Fetch actors and handle response
      const actors = await this.fetchMovieActors(id);
      res.json(actors);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  };

  private fetchMovieCast = async (movie: any) => {
    const movieActorsData = await this.db.select({
      actor: actors,
      role: movieActors.role
    })
      .from(movieActors)
      .leftJoin(actors, eq(movieActors.actorId, actors.id))
      .where(eq(movieActors.movieId, movie.id));

    const movieProducerData = await this.db.select({
      id: producers.id,
      imdbId: producers.imdbId,
      fullName: producers.fullName,
      job: producers.job,
      primaryImage: producers.primaryImage,
      height: producers.height,
      bio: producers.bio,
      birthDate: producers.birthDate
    })
      .from(movies)
      .leftJoin(producers, eq(movies.producerId, producers.id))
      .where(eq(movies.id, movie.id));

    return {
      actors: movieActorsData,
      producer: movieProducerData
    };
  }

  // Private method to fetch movie actors and return data instead of responding directly
  private fetchMovieActors = async (movie: any) => {

    // Query for movie actors
    const { actors: movieActorsData, producer: movieProducerData } = await this.fetchMovieCast(movie);

    // If no actors found, fetch from IMDB API
    if ((movieActorsData.length === 0 || movieProducerData.length === 0) && movie.imdbId) {
      // Fetch and save actors
      await this.fetchAndSaveCast(movie);

      // Query again with the newly added actors
      const updatedMovieActorsData = await this.db.select({
        actor: actors,
        role: movieActors.role
      })
        .from(movieActors)
        .leftJoin(actors, eq(movieActors.actorId, actors.id))
        .where(eq(movieActors.movieId, movie.id));

        const movieProducerData = await this.db.select({
          id: producers.id,
          imdbId: producers.imdbId,
          fullName: producers.fullName,
          job: producers.job,
          primaryImage: producers.primaryImage,
          height: producers.height,
          bio: producers.bio,
          birthDate: producers.birthDate
        })
          .from(movies)
          .leftJoin(producers, eq(movies.producerId, producers.id))
          .where(eq(movies.id, movie.id));

      // Format the result
      return {
        actors: updatedMovieActorsData.map((item: { actor: any; role: string | null }) => ({
          ...item.actor,
          role: item.role
        })),
        producer: movieProducerData
      };
    }

    // Format the result
    return {
      actors: movieActorsData.map((item: { actor: any; role: string | null }) => ({
        ...item.actor,
        role: item.role
      })),
      producer: movieProducerData
    };
  };

  // Helper method to fetch actors from IMDB API and save them to the database
  private fetchAndSaveCast = async (movie: any) => {
    try {
      const castApiConfig = IMDB_API_MOVIE_CAST(movie.imdbId);
      const castResponse = await axios.get(castApiConfig.url, { headers: castApiConfig.headers });
      const cast = castResponse.data;

      if (!Array.isArray(cast)) {
        console.error('Invalid cast data format:', cast);
        return;
      }

      const processCastMember = async (castMember: any) => {
        if (!castMember.id || !castMember.fullName || !['actor', 'actress', 'producer'].includes(castMember.job)) return;

        const isProducer = castMember.job === 'producer';
        const table = isProducer ? producers : actors;
        const existingPerson = await this.db.select()
          .from(table)
          .where(eq(table.imdbId, castMember.id));

        if (existingPerson.length > 0) return existingPerson[0].id;

        try {
          const actorDetailsConfig = IMDB_API_CAST_DETAILS(castMember.id);
          const actorResponse = await axios.get(actorDetailsConfig.url, { headers: actorDetailsConfig.headers });
          const actorDetails = actorResponse.data.data.name;

          const personData = {
            imdbId: castMember.id,
            fullName: actorDetails?.nameText?.text || castMember.fullName,
            job: castMember.job,
            createdBy: 'system',
            primaryImage: actorDetails?.primaryImage?.url || null,
            height: actorDetails?.height?.measurement?.value || null,
            bio: actorDetails?.bio?.text?.plainText || null,
            birthDate: actorDetails?.birthDate?.date || null,
          };

          const result = await this.db.insert(table).values(personData);
          return Array.isArray(result) && result.length > 0 ? result[0].insertId : null;
        } catch (error) {
          console.error(`Error fetching ${castMember.job} details:`, error);
          const basicData = {
            imdbId: castMember.id,
            fullName: castMember.fullName,
            job: castMember.job,
            createdBy: 'system'
          };
          const result = await this.db.insert(table).values(basicData);
          return Array.isArray(result) && result.length > 0 ? result[0].insertId : null;
        }
      };

      for (const castMember of cast) {
        const personId = await processCastMember(castMember);
        if (!personId) continue;

        if (castMember.job === 'producer' && !movie.producerId) {
          // Update the movie's producerId
          await this.db.update(movies)
            .set({ producerId: personId })
            .where(eq(movies.id, movie.id));
          continue;
        }

        const role = castMember.characters?.[0] || null;
        const existingRelation = await this.db.select()
          .from(movieActors)
          .where(eq(movieActors.movieId, movie.id))
          .where(eq(movieActors.actorId, personId));

        if (existingRelation.length === 0) {
          await this.db.insert(movieActors).values({
            movieId: movie.id,
            actorId: personId,
            role,
            createdBy: 'system'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching and saving actors:', error);
    }
  };

  overrideupdate = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { data, actors, producerId } = req.body;

      // First check if movie exists
      const existingMovie = await this.db.select()
        .from(this.table)
        .where(eq(this.table.id, id));

      if (existingMovie.length === 0) {
        throw notFound(this.entityName);
      }

      // Update movie details if provided
      if (data) {
        await this.db.update(this.table)
          .set(data)
          .where(eq(this.table.id, id));
      }

      // Update producer if provided
      if (producerId) {
        await this.db.update(this.table)
          .set({ producerId })
          .where(eq(this.table.id, id));
      }

      // Update actors if provided
      if (actors && Array.isArray(actors)) {
        // First remove existing actor relations
        await this.db.delete(movieActors)
          .where(eq(movieActors.movieId, id));

        // Then add new actor relations
        for (const actor of actors) {
          if (actor.actorId && actor.role) {
            await this.db.insert(movieActors)
              .values({
                movieId: id,
                actorId: actor.actorId,
                role: actor.role,
                createdBy: 'system'
              });
          }
        }
      }

      // Fetch and return updated movie with relations
      const updatedMovie = await this.db.select()
        .from(this.table)
        .where(eq(this.table.id, id));

      const { actors: movieActorsList, producer } = await this.fetchMovieActors(updatedMovie[0]);

      res.json({
        ...updatedMovie[0],
        actors: movieActorsList,
        producer: producer?.[0]
      });
    } catch (error) {
      errorHandler(error as Error, res);
    }
  }
}

// Create and export an instance
const movieService = new MovieService();

export default movieService; 