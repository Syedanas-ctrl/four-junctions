"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("drizzle-orm/mysql2");
const migrator_1 = require("drizzle-orm/mysql2/migrator");
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const runMigrations = async () => {
    const connectionString = process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/imdb_db';
    console.log('Running migrations...', connectionString, process.env.DATABASE_URL);
    const connection = await promise_1.default.createConnection({
        uri: connectionString,
    });
    const db = (0, mysql2_1.drizzle)(connection);
    // This automatically runs needed migrations on the database
    await (0, migrator_1.migrate)(db, { migrationsFolder: path_1.default.join(__dirname, '../../drizzle') });
    await connection.end();
    console.log('Migrations completed successfully');
};
runMigrations().catch((err) => {
    console.error('Error during migration:', err);
    process.exit(1);
});
