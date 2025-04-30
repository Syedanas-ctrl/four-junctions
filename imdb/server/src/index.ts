import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import actorsRouter from './modules/actors/controller';
import moviesRouter from './modules/movies/controller';
import producersRouter from './modules/producers/controller';
import { backfillData } from './backfill/script';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the IMDB API' });
});
app.get('/backfill', async (req: Request, res: Response) => {
  await backfillData().then(() => {
    res.json({ message: 'Backfill completed successfully' });
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});
app.use('/api/actors', actorsRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/producers', producersRouter);

// Error handling for invalid routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});