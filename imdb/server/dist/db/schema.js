"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.producersRelations = exports.producers = exports.moviesRelations = exports.movies = exports.movieActorsRelations = exports.actorsRelations = exports.movieActors = exports.actors = exports.auditFields = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
// Reusable audit fields
exports.auditFields = {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    createdBy: (0, mysql_core_1.varchar)('created_by', { length: 255 }),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
    updatedBy: (0, mysql_core_1.varchar)('updated_by', { length: 255 }),
    deletedAt: (0, mysql_core_1.timestamp)('deleted_at'),
    deletedBy: (0, mysql_core_1.varchar)('deleted_by', { length: 255 }),
};
exports.actors = (0, mysql_core_1.mysqlTable)('actors', {
    imdbId: (0, mysql_core_1.varchar)('imdb_id', { length: 20 }),
    fullName: (0, mysql_core_1.varchar)('full_name', { length: 255 }),
    job: (0, mysql_core_1.varchar)('job', { length: 100 }).default('actor'),
    ...exports.auditFields,
});
exports.movieActors = (0, mysql_core_1.mysqlTable)('movie_actors', {
    movieId: (0, mysql_core_1.int)('movie_id').notNull().references(() => exports.movies.id),
    actorId: (0, mysql_core_1.int)('actor_id').notNull().references(() => exports.actors.id),
    role: (0, mysql_core_1.varchar)('role', { length: 100 }),
    createdAt: exports.auditFields.createdAt,
    createdBy: exports.auditFields.createdBy,
    updatedAt: exports.auditFields.updatedAt,
    updatedBy: exports.auditFields.updatedBy,
    deletedAt: exports.auditFields.deletedAt,
    deletedBy: exports.auditFields.deletedBy,
}, (table) => {
    return {
        pk: (0, mysql_core_1.primaryKey)(table.movieId, table.actorId),
    };
});
exports.actorsRelations = (0, drizzle_orm_1.relations)(exports.actors, ({ many }) => ({
    movieActors: many(exports.movieActors),
}));
exports.movieActorsRelations = (0, drizzle_orm_1.relations)(exports.movieActors, ({ one }) => ({
    movie: one(exports.movies, {
        fields: [exports.movieActors.movieId],
        references: [exports.movies.id],
    }),
    actor: one(exports.actors, {
        fields: [exports.movieActors.actorId],
        references: [exports.actors.id],
    }),
}));
exports.movies = (0, mysql_core_1.mysqlTable)('movies', {
    imdbId: (0, mysql_core_1.varchar)('imdb_id', { length: 20 }),
    url: (0, mysql_core_1.varchar)('url', { length: 255 }),
    primaryTitle: (0, mysql_core_1.varchar)('primary_title', { length: 255 }).notNull(),
    originalTitle: (0, mysql_core_1.varchar)('original_title', { length: 255 }),
    type: (0, mysql_core_1.varchar)('type', { length: 50 }).default('movie'),
    description: (0, mysql_core_1.text)('description'),
    primaryImage: (0, mysql_core_1.text)('primary_image'),
    contentRating: (0, mysql_core_1.varchar)('content_rating', { length: 10 }),
    startYear: (0, mysql_core_1.int)('start_year').notNull(),
    endYear: (0, mysql_core_1.int)('end_year'),
    releaseDate: (0, mysql_core_1.varchar)('release_date', { length: 30 }),
    language: (0, mysql_core_1.varchar)('language', { length: 50 }),
    interests: (0, mysql_core_1.json)('interests'), // Stored as JSON string
    countriesOfOrigin: (0, mysql_core_1.json)('countries_of_origin'), // Stored as JSON string
    externalLinks: (0, mysql_core_1.json)('external_links'), // Stored as JSON string
    spokenLanguages: (0, mysql_core_1.json)('spoken_languages'), // Stored as JSON string
    filmingLocations: (0, mysql_core_1.json)('filming_locations'), // Stored as JSON string
    budget: (0, mysql_core_1.int)('budget'),
    grossWorldwide: (0, mysql_core_1.int)('gross_worldwide'),
    genres: (0, mysql_core_1.json)('genres'), // Stored as JSON string
    isAdult: (0, mysql_core_1.int)('is_adult').default(0),
    runtimeMinutes: (0, mysql_core_1.int)('runtime_minutes'),
    averageRating: (0, mysql_core_1.int)('average_rating'),
    numVotes: (0, mysql_core_1.int)('num_votes'),
    producerId: (0, mysql_core_1.int)('producer_id').notNull().references(() => exports.producers.id),
    categories: (0, mysql_core_1.json)('categories'), //Eg: Top 250, Top rated tamil movies, etc
    ...exports.auditFields,
});
exports.moviesRelations = (0, drizzle_orm_1.relations)(exports.movies, ({ one, many }) => ({
    producer: one(exports.producers, {
        fields: [exports.movies.producerId],
        references: [exports.producers.id],
    }),
    movieActors: many(exports.movieActors),
}));
exports.producers = (0, mysql_core_1.mysqlTable)('producers', {
    imdbId: (0, mysql_core_1.varchar)('imdb_id', { length: 20 }),
    fullName: (0, mysql_core_1.varchar)('full_name', { length: 255 }),
    job: (0, mysql_core_1.varchar)('job', { length: 100 }).default('producer'),
    ...exports.auditFields,
});
exports.producersRelations = (0, drizzle_orm_1.relations)(exports.producers, ({ many }) => ({
    movies: many(exports.movies),
}));
