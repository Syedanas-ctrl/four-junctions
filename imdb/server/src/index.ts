import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import actorsRouter from './modules/actors/controller';
import moviesRouter from './modules/movies/controller';
import producersRouter from './modules/producers/controller';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/actors', actorsRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/producers', producersRouter);

// Error handling for invalid routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});