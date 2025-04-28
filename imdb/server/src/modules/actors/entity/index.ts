import { int, text } from "drizzle-orm/mysql-core";

import { auditFields } from "../../../db/schema";
import { mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core';
import { movies } from "../../movies/entity";
import { relations } from "drizzle-orm";

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

export type Actor = typeof actors.$inferSelect;

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