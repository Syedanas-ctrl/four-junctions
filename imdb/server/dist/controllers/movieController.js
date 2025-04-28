"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeActorFromMovie = exports.addActorToMovie = exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovieById = exports.getAllMovies = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const errorHandler_1 = require("../utils/errorHandler");
const getAllMovies = async (req, res) => {
    try {
        const allMovies = await db_1.db.select().from(schema_1.movies);
        res.json(allMovies);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.getAllMovies = getAllMovies;
const getMovieById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const movie = await db_1.db.query.movies.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.movies.id, id),
            with: {
                producer: true,
                movieActors: {
                    with: {
                        actor: true,
                    },
                },
            },
        });
        if (!movie) {
            throw (0, errorHandler_1.notFound)('Movie');
        }
        // Format the response
        // TODO: remove any
        const formattedMovie = {
            ...movie,
            actors: movie.movieActors.map((ma) => ({
                ...ma.actor,
                role: ma.role,
            })),
        };
        // Remove the movieActors field
        delete formattedMovie.movieActors;
        res.json(formattedMovie);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.getMovieById = getMovieById;
const createMovie = async (req, res) => {
    try {
        const { title, releaseYear, plot, duration, producerId, posterUrl } = req.body;
        if (!title || !releaseYear) {
            throw new errorHandler_1.ApiError('Title and release year are required', 400);
        }
        // Check if producer exists
        const producerExists = await db_1.db.select({ id: schema_1.producers.id })
            .from(schema_1.producers)
            .where((0, drizzle_orm_1.eq)(schema_1.producers.id, producerId));
        if (producerExists.length === 0) {
            throw (0, errorHandler_1.badRequest)('Producer does not exist');
        }
        const newMovie = await db_1.db.insert(schema_1.movies).values({
            title,
            releaseYear,
            plot,
            duration,
            producerId,
            posterUrl,
        }).execute();
        res.status(201).json({
            id: newMovie.insertId,
            title,
            releaseYear,
            plot,
            duration,
            producerId,
            posterUrl
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.createMovie = createMovie;
const updateMovie = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, releaseYear, plot, duration, producerId, posterUrl } = req.body;
        // Check if movie exists
        const movieExists = await db_1.db.select({ id: schema_1.movies.id })
            .from(schema_1.movies)
            .where((0, drizzle_orm_1.eq)(schema_1.movies.id, id));
        if (movieExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Movie');
        }
        // If producerId is provided, check if producer exists
        if (producerId !== undefined) {
            const producerExists = await db_1.db.select({ id: schema_1.producers.id })
                .from(schema_1.producers)
                .where((0, drizzle_orm_1.eq)(schema_1.producers.id, producerId));
            if (producerExists.length === 0) {
                throw (0, errorHandler_1.badRequest)('Producer does not exist');
            }
        }
        await db_1.db.update(schema_1.movies)
            .set({
            title: title || undefined,
            releaseYear: releaseYear || undefined,
            plot: plot || undefined,
            duration: duration || undefined,
            producerId: producerId || undefined,
            posterUrl: posterUrl || undefined,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.movies.id, id));
        res.json({ id, ...req.body });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Check if movie exists
        const movieExists = await db_1.db.select({ id: schema_1.movies.id })
            .from(schema_1.movies)
            .where((0, drizzle_orm_1.eq)(schema_1.movies.id, id));
        if (movieExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Movie');
        }
        // Delete associated movie-actor relationships
        await db_1.db.delete(schema_1.movieActors).where((0, drizzle_orm_1.eq)(schema_1.movieActors.movieId, id));
        // Delete the movie
        await db_1.db.delete(schema_1.movies).where((0, drizzle_orm_1.eq)(schema_1.movies.id, id));
        res.status(204).end();
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.deleteMovie = deleteMovie;
const addActorToMovie = async (req, res) => {
    try {
        const movieId = parseInt(req.params.movieId);
        const actorId = parseInt(req.params.actorId);
        const { role } = req.body;
        // Check if movie exists
        const movieExists = await db_1.db.select({ id: schema_1.movies.id })
            .from(schema_1.movies)
            .where((0, drizzle_orm_1.eq)(schema_1.movies.id, movieId));
        if (movieExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Movie');
        }
        // Check if actor exists
        const actorExists = await db_1.db.select({ id: schema_1.actors.id })
            .from(schema_1.actors)
            .where((0, drizzle_orm_1.eq)(schema_1.actors.id, actorId));
        if (actorExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Actor');
        }
        // Check if the relationship already exists
        const relationExists = await db_1.db.select()
            .from(schema_1.movieActors)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.movieActors.movieId, movieId), (0, drizzle_orm_1.eq)(schema_1.movieActors.actorId, actorId)));
        if (relationExists.length > 0) {
            throw (0, errorHandler_1.badRequest)('Actor is already in this movie');
        }
        // Create the relationship
        await db_1.db.insert(schema_1.movieActors).values({
            movieId,
            actorId,
            role,
        });
        res.status(201).json({ movieId, actorId, role });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.addActorToMovie = addActorToMovie;
const removeActorFromMovie = async (req, res) => {
    try {
        const movieId = parseInt(req.params.movieId);
        const actorId = parseInt(req.params.actorId);
        // Check if the relationship exists
        const relationExists = await db_1.db.select()
            .from(schema_1.movieActors)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.movieActors.movieId, movieId), (0, drizzle_orm_1.eq)(schema_1.movieActors.actorId, actorId)));
        if (relationExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Actor is not in this movie');
        }
        // Delete the relationship
        await db_1.db.delete(schema_1.movieActors)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.movieActors.movieId, movieId), (0, drizzle_orm_1.eq)(schema_1.movieActors.actorId, actorId)));
        res.status(204).end();
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.removeActorFromMovie = removeActorFromMovie;
