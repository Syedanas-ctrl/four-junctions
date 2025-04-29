import { mysqlTable, varchar, int, text, bigint } from 'drizzle-orm/mysql-core';
import { json } from 'drizzle-orm/mysql-core';
import { auditFields } from '../../../db/audit';
import { producers } from '../../producers/entity';
import { movieActors } from '../../actors/entity';
import { relations } from 'drizzle-orm';

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
    budget: bigint('budget', { mode: 'number' }),
    grossWorldwide: bigint('gross_worldwide', { mode: 'number' }),
    genres: json('genres'), // Stored as JSON string
    isAdult: int('is_adult').default(0),
    runtimeMinutes: int('runtime_minutes'),
    averageRating: int('average_rating'),
    numVotes: bigint('num_votes', { mode: 'number' }),
    producerId: int('producer_id').references(() => producers.id),
    categories: json('categories'), //Eg: Top 250, Top rated tamil movies, etc
    ...auditFields,
  });

export type Movie = typeof movies.$inferSelect;

  export const moviesRelations = relations(movies, ({ one, many }) => ({
    producer: one(producers, {
      fields: [movies.producerId],
      references: [producers.id],
    }),
    movieActors: many(movieActors),
  }));