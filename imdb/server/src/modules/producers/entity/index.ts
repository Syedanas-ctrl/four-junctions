import { int, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core';
import { auditFields } from '../../../db/schema';
import { movies } from '../../movies/entity';
import { relations } from 'drizzle-orm';

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

export type Producer = typeof producers.$inferSelect;