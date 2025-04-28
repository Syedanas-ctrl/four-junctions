"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieActorsRelations = exports.actorsRelations = exports.movieActors = exports.actors = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const schema_1 = require("../../../db/schema");
const mysql_core_2 = require("drizzle-orm/mysql-core");
const entity_1 = require("../../movies/entity");
const drizzle_orm_1 = require("drizzle-orm");
exports.actors = (0, mysql_core_2.mysqlTable)('actors', {
    imdbId: (0, mysql_core_2.varchar)('imdb_id', { length: 20 }),
    fullName: (0, mysql_core_2.varchar)('full_name', { length: 255 }),
    job: (0, mysql_core_2.varchar)('job', { length: 100 }).default('actor'),
    ...schema_1.auditFields,
});
exports.movieActors = (0, mysql_core_2.mysqlTable)('movie_actors', {
    movieId: (0, mysql_core_1.int)('movie_id').notNull().references(() => entity_1.movies.id),
    actorId: (0, mysql_core_1.int)('actor_id').notNull().references(() => exports.actors.id),
    role: (0, mysql_core_2.varchar)('role', { length: 100 }),
    createdAt: schema_1.auditFields.createdAt,
    createdBy: schema_1.auditFields.createdBy,
    updatedAt: schema_1.auditFields.updatedAt,
    updatedBy: schema_1.auditFields.updatedBy,
    deletedAt: schema_1.auditFields.deletedAt,
    deletedBy: schema_1.auditFields.deletedBy,
}, (table) => {
    return {
        pk: (0, mysql_core_2.primaryKey)(table.movieId, table.actorId),
    };
});
exports.actorsRelations = (0, drizzle_orm_1.relations)(exports.actors, ({ many }) => ({
    movieActors: many(exports.movieActors),
}));
exports.movieActorsRelations = (0, drizzle_orm_1.relations)(exports.movieActors, ({ one }) => ({
    movie: one(entity_1.movies, {
        fields: [exports.movieActors.movieId],
        references: [entity_1.movies.id],
    }),
    actor: one(exports.actors, {
        fields: [exports.movieActors.actorId],
        references: [exports.actors.id],
    }),
}));
