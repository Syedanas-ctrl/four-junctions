import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { actors, movieActors } from '../entity';
import { CrudService } from '../../../utils/crudService';
import { errorHandler, notFound } from '../../../utils/errorHandler';

export class ActorService extends CrudService<typeof actors> {
  constructor() {
    super(db, {
      table: actors,
      entityName: 'Actor',
      relations: [
        {
          table: movieActors,
          foreignKey: 'actorId'
        }
      ]
    });
  }

  // Additional specialized methods that are specific to actors
  getActorMovies = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      const actorMovies = await this.db.query.actors.findFirst({
        where: eq(actors.id, id),
        with: {
          movieActors: {
            with: {
              movie: true,
            },
          },
        },
      });
      
      if (!actorMovies) {
        throw notFound(this.entityName);
      }
      
      const movies = actorMovies.movieActors.map((ma: any) => ({
        ...ma.movie,
        role: ma.role,
      }));
      
      res.json(movies);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  };
}

// Create and export an instance
const actorService = new ActorService();

export default actorService; 