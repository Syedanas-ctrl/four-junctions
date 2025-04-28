"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../../db");
const entity_1 = require("../entity");
const crudService_1 = require("../../../utils/crudService");
const errorHandler_1 = require("../../../utils/errorHandler");
class ActorService extends crudService_1.CrudService {
    constructor() {
        super(db_1.db, {
            table: entity_1.actors,
            entityName: 'Actor',
            relations: [
                {
                    table: entity_1.movieActors,
                    foreignKey: 'actorId'
                }
            ]
        });
        // Additional specialized methods that are specific to actors
        this.getActorMovies = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const actorMovies = await this.db.query.actors.findFirst({
                    where: (0, drizzle_orm_1.eq)(entity_1.actors.id, id),
                    with: {
                        movieActors: {
                            with: {
                                movie: true,
                            },
                        },
                    },
                });
                if (!actorMovies) {
                    throw (0, errorHandler_1.notFound)(this.entityName);
                }
                const movies = actorMovies.movieActors.map((ma) => ({
                    ...ma.movie,
                    role: ma.role,
                }));
                res.json(movies);
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
    }
}
exports.ActorService = ActorService;
// Create and export an instance
const actorService = new ActorService();
exports.default = actorService;
