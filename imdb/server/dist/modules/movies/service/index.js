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
                const actors = await this.fetchMovieActors(movie);
                // Return movie with actors
                res.json({
                    ...movie,
                    actors
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
        // Private method to fetch movie actors and return data instead of responding directly
        this.fetchMovieActors = async (movie) => {
            // Query for movie actors
            const movieActorsData = await this.db.select({
                actor: entity_2.actors,
                role: entity_2.movieActors.role
            })
                .from(entity_2.movieActors)
                .leftJoin(entity_2.actors, (0, drizzle_orm_1.eq)(entity_2.movieActors.actorId, entity_2.actors.id))
                .where((0, drizzle_orm_1.eq)(entity_2.movieActors.movieId, movie.id));
            // If no actors found, fetch from IMDB API
            if (movieActorsData.length === 0 && movie.imdbId) {
                // Fetch and save actors
                await this.fetchAndSaveActors(movie);
                // Query again with the newly added actors
                const updatedMovieActorsData = await this.db.select({
                    actor: entity_2.actors,
                    role: entity_2.movieActors.role
                })
                    .from(entity_2.movieActors)
                    .leftJoin(entity_2.actors, (0, drizzle_orm_1.eq)(entity_2.movieActors.actorId, entity_2.actors.id))
                    .where((0, drizzle_orm_1.eq)(entity_2.movieActors.movieId, movie.id));
                // Format the result
                return updatedMovieActorsData.map((item) => ({
                    ...item.actor,
                    role: item.role
                }));
            }
            // Format the result
            return movieActorsData.map((item) => ({
                ...item.actor,
                role: item.role
            }));
        };
        // Helper method to fetch actors from IMDB API and save them to the database
        this.fetchAndSaveActors = async (movie) => {
            try {
                // Get the movie cast from IMDB API
                const castApiConfig = (0, constants_1.IMDB_API_MOVIE_CAST)(movie.imdbId);
                const castResponse = await axios_1.default.get(castApiConfig.url, { headers: castApiConfig.headers });
                const cast = castResponse.data;
                if (!Array.isArray(cast)) {
                    console.error('Invalid cast data format:', cast);
                    return;
                }
                // Process each cast member
                for (const castMember of cast) {
                    if (!castMember.id || !castMember.fullName)
                        continue;
                    // Check if actor already exists in database
                    const existingActor = await this.db.select()
                        .from(entity_2.actors)
                        .where((0, drizzle_orm_1.eq)(entity_2.actors.imdbId, castMember.id));
                    let actorId;
                    if (existingActor.length === 0) {
                        // Actor doesn't exist, get detailed info and create
                        try {
                            const actorDetailsConfig = (0, constants_1.IMDB_API_CAST_DETAILS)(castMember.id);
                            const actorResponse = await axios_1.default.get(actorDetailsConfig.url, { headers: actorDetailsConfig.headers });
                            const actorDetails = actorResponse.data;
                            // Create new actor
                            const actorData = {
                                imdbId: castMember.id,
                                fullName: actorDetails?.nameText?.text || castMember.fullName,
                                job: castMember.job || 'actor',
                                createdBy: 'system'
                            };
                            const result = await this.db.insert(entity_2.actors).values(actorData);
                            actorId = Array.isArray(result) && result.length > 0 ? result[0].insertId : null;
                        }
                        catch (error) {
                            console.error('Error fetching actor details:', error);
                            // Create basic actor without details
                            const actorData = {
                                imdbId: castMember.id,
                                fullName: castMember.fullName,
                                job: castMember.job || 'actor',
                                createdBy: 'system'
                            };
                            const result = await this.db.insert(entity_2.actors).values(actorData);
                            actorId = Array.isArray(result) && result.length > 0 ? result[0].insertId : null;
                        }
                    }
                    else {
                        // Actor exists
                        actorId = existingActor[0].id;
                    }
                    if (actorId) {
                        // Link actor to movie
                        const role = castMember.characters && castMember.characters.length > 0
                            ? castMember.characters[0]
                            : null;
                        // Check if the relationship already exists
                        const existingRelation = await this.db.select()
                            .from(entity_2.movieActors)
                            .where((0, drizzle_orm_1.eq)(entity_2.movieActors.movieId, movie.id))
                            .where((0, drizzle_orm_1.eq)(entity_2.movieActors.actorId, actorId));
                        if (existingRelation.length === 0) {
                            // Create relationship
                            await this.db.insert(entity_2.movieActors).values({
                                movieId: movie.id,
                                actorId: actorId,
                                role: role,
                                createdBy: 'system'
                            });
                        }
                    }
                }
            }
            catch (error) {
                console.error('Error fetching and saving actors:', error);
            }
        };
    }
}
exports.MovieService = MovieService;
// Create and export an instance
const movieService = new MovieService();
exports.default = movieService;
