"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducerMovies = exports.deleteProducer = exports.updateProducer = exports.createProducer = exports.getProducerById = exports.getAllProducers = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const errorHandler_1 = require("../utils/errorHandler");
const getAllProducers = async (req, res) => {
    try {
        const allProducers = await db_1.db.select().from(schema_1.producers);
        res.json(allProducers);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.getAllProducers = getAllProducers;
const getProducerById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const producer = await db_1.db.select().from(schema_1.producers).where((0, drizzle_orm_1.eq)(schema_1.producers.id, id));
        if (producer.length === 0) {
            throw (0, errorHandler_1.notFound)('Producer');
        }
        res.json(producer[0]);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.getProducerById = getProducerById;
const createProducer = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, bio } = req.body;
        if (!firstName || !lastName) {
            throw new errorHandler_1.ApiError('First name and last name are required', 400);
        }
        const newProducer = await db_1.db.insert(schema_1.producers).values({
            firstName,
            lastName,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            bio,
        }).execute();
        res.status(201).json({
            id: newProducer.insertId,
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
exports.createProducer = createProducer;
const updateProducer = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { firstName, lastName, dateOfBirth, bio } = req.body;
        const producerExists = await db_1.db.select({ id: schema_1.producers.id })
            .from(schema_1.producers)
            .where((0, drizzle_orm_1.eq)(schema_1.producers.id, id));
        if (producerExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Producer');
        }
        await db_1.db.update(schema_1.producers)
            .set({
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            bio: bio || undefined,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.producers.id, id));
        res.json({ id, ...req.body });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.updateProducer = updateProducer;
const deleteProducer = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // First check if producer exists
        const producerExists = await db_1.db.select({ id: schema_1.producers.id })
            .from(schema_1.producers)
            .where((0, drizzle_orm_1.eq)(schema_1.producers.id, id));
        if (producerExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Producer');
        }
        // Check if producer has any movies
        const producerMovies = await db_1.db.select().from(schema_1.movies).where((0, drizzle_orm_1.eq)(schema_1.movies.producerId, id));
        if (producerMovies.length > 0) {
            throw (0, errorHandler_1.badRequest)('Cannot delete producer with associated movies. Remove movies first.');
        }
        // Delete the producer
        await db_1.db.delete(schema_1.producers).where((0, drizzle_orm_1.eq)(schema_1.producers.id, id));
        res.status(204).end();
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.deleteProducer = deleteProducer;
const getProducerMovies = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Check if producer exists
        const producerExists = await db_1.db.select({ id: schema_1.producers.id })
            .from(schema_1.producers)
            .where((0, drizzle_orm_1.eq)(schema_1.producers.id, id));
        if (producerExists.length === 0) {
            throw (0, errorHandler_1.notFound)('Producer');
        }
        const producerMovies = await db_1.db.select().from(schema_1.movies).where((0, drizzle_orm_1.eq)(schema_1.movies.producerId, id));
        res.json(producerMovies);
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, res);
    }
};
exports.getProducerMovies = getProducerMovies;
