"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRelations = exports.movies = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const mysql_core_2 = require("drizzle-orm/mysql-core");
const audit_1 = require("../../../db/audit");
const entity_1 = require("../../producers/entity");
const entity_2 = require("../../actors/entity");
const drizzle_orm_1 = require("drizzle-orm");
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
    interests: (0, mysql_core_2.json)('interests'), // Stored as JSON string
    countriesOfOrigin: (0, mysql_core_2.json)('countries_of_origin'), // Stored as JSON string
    externalLinks: (0, mysql_core_2.json)('external_links'), // Stored as JSON string
    spokenLanguages: (0, mysql_core_2.json)('spoken_languages'), // Stored as JSON string
    filmingLocations: (0, mysql_core_2.json)('filming_locations'), // Stored as JSON string
    budget: (0, mysql_core_1.bigint)('budget', { mode: 'number' }),
    grossWorldwide: (0, mysql_core_1.bigint)('gross_worldwide', { mode: 'number' }),
    genres: (0, mysql_core_2.json)('genres'), // Stored as JSON string
    isAdult: (0, mysql_core_1.int)('is_adult').default(0),
    runtimeMinutes: (0, mysql_core_1.int)('runtime_minutes'),
    averageRating: (0, mysql_core_1.int)('average_rating'),
    numVotes: (0, mysql_core_1.bigint)('num_votes', { mode: 'number' }),
    producerId: (0, mysql_core_1.int)('producer_id').references(() => entity_1.producers.id),
    categories: (0, mysql_core_2.json)('categories'), //Eg: Top 250, Top rated tamil movies, etc
    ...audit_1.auditFields,
});
exports.moviesRelations = (0, drizzle_orm_1.relations)(exports.movies, ({ one, many }) => ({
    producer: one(entity_1.producers, {
        fields: [exports.movies.producerId],
        references: [entity_1.producers.id],
    }),
    movieActors: many(entity_2.movieActors),
}));
