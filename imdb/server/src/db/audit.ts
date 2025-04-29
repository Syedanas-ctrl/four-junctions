import { int, timestamp, varchar } from "drizzle-orm/mysql-core";

export const auditFields = {
    id: int('id').primaryKey().autoincrement(),
    createdAt: timestamp('created_at').defaultNow(),
    createdBy: varchar('created_by', { length: 255 }),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    updatedBy: varchar('updated_by', { length: 255 }),
    deletedAt: timestamp('deleted_at'),
    deletedBy: varchar('deleted_by', { length: 255 }),
  };