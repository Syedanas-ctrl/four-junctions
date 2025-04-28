import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/imdb_db';

// Create the connection
const connection = mysql.createPool({
  uri: connectionString,
});

// Create the Drizzle client
export const db = drizzle(connection, { schema, mode: 'planetscale' });

export default db;