"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActorMovies = exports.deleteActor = exports.updateActor = exports.createActor = exports.getActorById = exports.getAllActors = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const errorHandler_1 = require("../utils/errorHandler");
const getAllActors = async (req, res) => {
    try {
        const allActors = await db_1.db.select().from(schema_1.actors);
        res.json(allActors);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.getAllActors = getAllActors;
const getActorById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const actor = await db_1.db.select().from(schema_1.actors).where((0, drizzle_orm_1.eq)(schema_1.actors.id, id));
        if (actor.length === 0) {
            throw (0, errorHandler_1.notFound)('Actor');
        }
        res.json(actor[0]);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.getActorById = getActorById;
const createActor = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, bio } = req.body;
        if (!firstName || !lastName) {
            throw new errorHandler_1.ApiError('First name and last name are required', 400);
        }
        const newActor = await db_1.db.insert(schema_1.actors).values({
            firstName,
            lastName,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            bio,
        }).execute();
        res.status(201).json({
            id: newActor.insertId,
            firstName,
            lastName,
            dateOfBirth,
            bio
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.createActor = createActor;
const updateActor = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { firstName, lastName, dateOfBirth, bio } = req.body;
        const actorExists = await db_1.db.select({ id: schema_1.actors.id })
            .from(schema_1.actors)
            .where((0, drizzle_orm_1.eq)(schema_1.actors.id, id));
        if (actorExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Actor');
        }
        await db_1.db.update(schema_1.actors)
            .set({
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            bio: bio || undefined,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.actors.id, id));
        res.json({ id, ...req.body });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.updateActor = updateActor;
const deleteActor = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // First check if actor exists
        const actorExists = await db_1.db.select({ id: schema_1.actors.id })
            .from(schema_1.actors)
            .where((0, drizzle_orm_1.eq)(schema_1.actors.id, id));
        if (actorExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Actor');
        }
        // Delete associated movie actor relationships
        await db_1.db.delete(schema_1.movieActors).where((0, drizzle_orm_1.eq)(schema_1.movieActors.actorId, id));
        // Delete the actor
        await db_1.db.delete(schema_1.actors).where((0, drizzle_orm_1.eq)(schema_1.actors.id, id));
        res.status(204).end();
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.deleteActor = deleteActor;
const getActorMovies = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const actorMovies = await db_1.db.query.actors.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.actors.id, id),
            with: {
                movieActors: {
                    with: {
                        movie: true,
                    },
                },
            },
        });
        if (!actorMovies) {
            throw (0, errorHandler_1.notFound)('Actor');
        }
        // TODO: remove any
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
exports.getActorMovies = getActorMovies;
