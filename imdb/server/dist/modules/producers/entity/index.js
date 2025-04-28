"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.producersRelations = exports.producers = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const schema_1 = require("../../../db/schema");
const entity_1 = require("../../movies/entity");
const drizzle_orm_1 = require("drizzle-orm");
exports.producers = (0, mysql_core_1.mysqlTable)('producers', {
    imdbId: (0, mysql_core_1.varchar)('imdb_id', { length: 20 }),
    fullName: (0, mysql_core_1.varchar)('full_name', { length: 255 }),
    job: (0, mysql_core_1.varchar)('job', { length: 100 }).default('producer'),
    ...schema_1.auditFields,
});
exports.producersRelations = (0, drizzle_orm_1.relations)(exports.producers, ({ many }) => ({
    movies: many(entity_1.movies),
}));
