"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../../db");
const entity_1 = require("../entity");
const crudService_1 = require("../../../utils/crudService");
const errorHandler_1 = require("../../../utils/errorHandler");
const entity_2 = require("../../actors/entity");
const constants_1 = require("../../../utils/constants");
const axios_1 = __importDefault(require("axios"));
const entity_3 = require("../../producers/entity");
class MovieService extends crudService_1.CrudService {
    constructor() {
        super(db_1.db, {
            table: entity_1.movies,
            entityName: 'Movie',
            relations: [
                {
                    table: entity_2.movieActors,
                    foreignKey: 'movieId'
                }
            ]
        });
        this.getByImdbId = async (req, res) => {
            try {
                const id = req.params.id;
                const entity = await this.db.select().from(this.table).where((0, drizzle_orm_1.eq)(this.table.imdbId, id));
                if (entity.length === 0) {
                    throw (0, errorHandler_1.notFound)(this.entityName);
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
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
        // Additional specialized methods that are specific to movies
        this.getMovieActors = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                // Fetch actors and handle response
                const actors = await this.fetchMovieActors(id);
                res.json(actors);
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
        this.fetchMovieCast = async (movie) => {
            const movieActorsData = await this.db.select({
                actor: entity_2.actors,
                role: entity_2.movieActors.role
            })
                .from(entity_2.movieActors)
                .leftJoin(entity_2.actors, (0, drizzle_orm_1.eq)(entity_2.movieActors.actorId, entity_2.actors.id))
                .where((0, drizzle_orm_1.eq)(entity_2.movieActors.movieId, movie.id));
            const movieProducerData = await this.db.select({
                id: entity_3.producers.id,
                imdbId: entity_3.producers.imdbId,
                fullName: entity_3.producers.fullName,
                job: entity_3.producers.job,
                primaryImage: entity_3.producers.primaryImage,
                height: entity_3.producers.height,
                bio: entity_3.producers.bio,
                birthDate: entity_3.producers.birthDate
            })
                .from(entity_1.movies)
                .leftJoin(entity_3.producers, (0, drizzle_orm_1.eq)(entity_1.movies.producerId, entity_3.producers.id))
                .where((0, drizzle_orm_1.eq)(entity_1.movies.id, movie.id));
            return {
                actors: movieActorsData,
                producer: movieProducerData
            };
        };
        // Private method to fetch movie actors and return data instead of responding directly
        this.fetchMovieActors = async (movie) => {
            // Query for movie actors
            const { actors: movieActorsData, producer: movieProducerData } = await this.fetchMovieCast(movie);
            // If no actors found, fetch from IMDB API
            if ((movieActorsData.length === 0 || movieProducerData.length === 0) && movie.imdbId) {
                // Fetch and save actors
                await this.fetchAndSaveCast(movie);
                // Query again with the newly added actors
                const updatedMovieActorsData = await this.db.select({
                    actor: entity_2.actors,
                    role: entity_2.movieActors.role
                })
                    .from(entity_2.movieActors)
                    .leftJoin(entity_2.actors, (0, drizzle_orm_1.eq)(entity_2.movieActors.actorId, entity_2.actors.id))
                    .where((0, drizzle_orm_1.eq)(entity_2.movieActors.movieId, movie.id));
                const movieProducerData = await this.db.select({
                    id: entity_3.producers.id,
                    imdbId: entity_3.producers.imdbId,
                    fullName: entity_3.producers.fullName,
                    job: entity_3.producers.job,
                    primaryImage: entity_3.producers.primaryImage,
                    height: entity_3.producers.height,
                    bio: entity_3.producers.bio,
                    birthDate: entity_3.producers.birthDate
                })
                    .from(entity_1.movies)
                    .leftJoin(entity_3.producers, (0, drizzle_orm_1.eq)(entity_1.movies.producerId, entity_3.producers.id))
                    .where((0, drizzle_orm_1.eq)(entity_1.movies.id, movie.id));
                // Format the result
                return {
                    actors: updatedMovieActorsData.map((item) => ({
                        ...item.actor,
                        role: item.role
                    })),
                    producer: movieProducerData
                };
            }
            // Format the result
            return {
                actors: movieActorsData.map((item) => ({
                    ...item.actor,
                    role: item.role
                })),
                producer: movieProducerData
            };
        };
        // Helper method to fetch actors from IMDB API and save them to the database
        this.fetchAndSaveCast = async (movie) => {
            try {
                const castApiConfig = (0, constants_1.IMDB_API_MOVIE_CAST)(movie.imdbId);
                const castResponse = await axios_1.default.get(castApiConfig.url, { headers: castApiConfig.headers });
                const cast = castResponse.data;
                if (!Array.isArray(cast)) {
                    console.error('Invalid cast data format:', cast);
                    return;
                }
                const processCastMember = async (castMember) => {
                    if (!castMember.id || !castMember.fullName || !['actor', 'actress', 'producer'].includes(castMember.job))
                        return;
                    const isProducer = castMember.job === 'producer';
                    const table = isProducer ? entity_3.producers : entity_2.actors;
                    const existingPerson = await this.db.select()
                        .from(table)
                        .where((0, drizzle_orm_1.eq)(table.imdbId, castMember.id));
                    if (existingPerson.length > 0)
                        return existingPerson[0].id;
                    try {
                        const actorDetailsConfig = (0, constants_1.IMDB_API_CAST_DETAILS)(castMember.id);
                        const actorResponse = await axios_1.default.get(actorDetailsConfig.url, { headers: actorDetailsConfig.headers });
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
                    }
                    catch (error) {
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
                    if (!personId)
                        continue;
                    if (castMember.job === 'producer' && !movie.producerId) {
                        // Update the movie's producerId
                        await this.db.update(entity_1.movies)
                            .set({ producerId: personId })
                            .where((0, drizzle_orm_1.eq)(entity_1.movies.id, movie.id));
                        continue;
                    }
                    const role = castMember.characters?.[0] || null;
                    const existingRelation = await this.db.select()
                        .from(entity_2.movieActors)
                        .where((0, drizzle_orm_1.eq)(entity_2.movieActors.movieId, movie.id))
                        .where((0, drizzle_orm_1.eq)(entity_2.movieActors.actorId, personId));
                    if (existingRelation.length === 0) {
                        await this.db.insert(entity_2.movieActors).values({
                            movieId: movie.id,
                            actorId: personId,
                            role,
                            createdBy: 'system'
                        });
                    }
                }
            }
            catch (error) {
                console.error('Error fetching and saving actors:', error);
            }
        };
        this.update = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const { actors, producer: producerData, ...data } = req.body;
                // First check if movie exists
                const existingMovie = await this.db.select()
                    .from(this.table)
                    .where((0, drizzle_orm_1.eq)(this.table.id, id));
                if (existingMovie.length === 0) {
                    throw (0, errorHandler_1.notFound)(this.entityName);
                }
                // Update movie details if provided
                if (data) {
                    await this.db.update(this.table)
                        .set(data)
                        .where((0, drizzle_orm_1.eq)(this.table.id, id));
                }
                // Update producer if provided
                if (producerData?.id) {
                    await this.db.update(this.table)
                        .set({ producerId: producerData.id })
                        .where((0, drizzle_orm_1.eq)(this.table.id, id));
                }
                // Update actors if provided
                if (actors && Array.isArray(actors)) {
                    // First remove existing actor relations
                    await this.db.delete(entity_2.movieActors)
                        .where((0, drizzle_orm_1.eq)(entity_2.movieActors.movieId, id));
                    // Then add new actor relations
                    for (const actor of actors) {
                        if (actor.id && actor.role) {
                            await this.db.insert(entity_2.movieActors)
                                .values({
                                movieId: id,
                                actorId: actor.id,
                                role: actor.role,
                                createdBy: 'system'
                            });
                        }
                    }
                }
                // Fetch and return updated movie with relations
                const updatedMovie = await this.db.select()
                    .from(this.table)
                    .where((0, drizzle_orm_1.eq)(this.table.id, id));
                const { actors: movieActorsList, producer } = await this.fetchMovieActors(updatedMovie[0]);
                res.json({
                    ...updatedMovie[0],
                    actors: movieActorsList,
                    producer: producer?.[0]
                });
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
    }
}
exports.MovieService = MovieService;
// Create and export an instance
const movieService = new MovieService();
exports.default = movieService;
