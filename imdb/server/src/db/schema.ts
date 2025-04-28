import { relations } from 'drizzle-orm';
import { varchar, int, timestamp, json, mysqlTable, primaryKey, text } from 'drizzle-orm/mysql-core';

// Reusable audit fields
export const auditFields = {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('created_at').defaultNow(),
  createdBy: varchar('created_by', { length: 255 }),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  updatedBy: varchar('updated_by', { length: 255 }),
  deletedAt: timestamp('deleted_at'),
  deletedBy: varchar('deleted_by', { length: 255 }),
};

export const actors = mysqlTable('actors', {
  imdbId: varchar('imdb_id', { length: 20 }),
  fullName: varchar('full_name', { length: 255 }),
  job: varchar('job', { length: 100 }).default('actor'),
  primaryImage: text('primary_image'),
  height: int('height'),
  bio: text('bio'),
  birthDate: varchar('birth_date', { length: 30 }),
  ...auditFields,
});

export const movieActors = mysqlTable('movie_actors', {
  movieId: int('movie_id').notNull().references(() => movies.id),
  actorId: int('actor_id').notNull().references(() => actors.id),
  role: varchar('role', { length: 100 }),
  createdAt: auditFields.createdAt,
  createdBy: auditFields.createdBy,
  updatedAt: auditFields.updatedAt,
  updatedBy: auditFields.updatedBy,
  deletedAt: auditFields.deletedAt,
  deletedBy: auditFields.deletedBy,
}, (table: any) => { // TODO: remove any
  return {
    pk: primaryKey(table.movieId, table.actorId),
  };
});

export const actorsRelations = relations(actors, ({ many }) => ({
  movieActors: many(movieActors),
}));

export const movieActorsRelations = relations(movieActors, ({ one }) => ({
  movie: one(movies, {
    fields: [movieActors.movieId],
    references: [movies.id],
  }),
  actor: one(actors, {
    fields: [movieActors.actorId],
    references: [actors.id],
  }),
})); 

export const movies = mysqlTable('movies', {
  imdbId: varchar('imdb_id', { length: 20 }),
  url: varchar('url', { length: 255 }),
  primaryTitle: varchar('primary_title', { length: 255 }).notNull(),
  originalTitle: varchar('original_title', { length: 255 }),
  type: varchar('type', { length: 50 }).default('movie'),
  description: text('description'),
  primaryImage: text('primary_image'),
  contentRating: varchar('content_rating', { length: 10 }),
  startYear: int('start_year').notNull(),
  endYear: int('end_year'),
  releaseDate: varchar('release_date', { length: 30 }),
  language: varchar('language', { length: 50 }),
  interests: json('interests'), // Stored as JSON string
  countriesOfOrigin: json('countries_of_origin'), // Stored as JSON string
  externalLinks: json('external_links'), // Stored as JSON string
  spokenLanguages: json('spoken_languages'), // Stored as JSON string
  filmingLocations: json('filming_locations'), // Stored as JSON string
  budget: int('budget'),
  grossWorldwide: int('gross_worldwide'),
  genres: json('genres'), // Stored as JSON string
  isAdult: int('is_adult').default(0),
  runtimeMinutes: int('runtime_minutes'),
  averageRating: int('average_rating'),
  numVotes: int('num_votes'),
  producerId: int('producer_id').notNull().references(() => producers.id),
  categories: json('categories'), //Eg: Top 250, Top rated tamil movies, etc
  ...auditFields,
});

export const moviesRelations = relations(movies, ({ one, many }) => ({
  producer: one(producers, {
    fields: [movies.producerId],
    references: [producers.id],
  }),
  movieActors: many(movieActors),
}));

export const producers = mysqlTable('producers', {
  imdbId: varchar('imdb_id', { length: 20 }),
  fullName: varchar('full_name', { length: 255 }),
  job: varchar('job', { length: 100 }).default('producer'),
  primaryImage: text('primary_image'),
  height: int('height'),
  bio: text('bio'),
  birthDate: varchar('birth_date', { length: 30 }),
  ...auditFields,
});

export const producersRelations = relations(producers, ({ many }) => ({
  movies: many(movies),
}));
