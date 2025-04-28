import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const runMigrations = async () => {
  const connectionString = process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/imdb_db';

  console.log('Running migrations...');
  
  const connection = await mysql.createConnection({
    uri: connectionString,
  });

  const db = drizzle(connection);

  // This automatically runs needed migrations on the database
  await migrate(db, { migrationsFolder: path.join(__dirname, '../../drizzle') });

  await connection.end();
  console.log('Migrations completed successfully');
};

runMigrations().catch((err) => {
  console.error('Error during migration:', err);
  process.exit(1);
}); 