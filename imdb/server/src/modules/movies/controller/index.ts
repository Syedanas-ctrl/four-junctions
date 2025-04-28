import { Router } from 'express';
import movieService from '../service';

const router = Router();

// CRUD routes
router.get('/', movieService.getAll);
router.get('/imdb/:id', movieService.getByImdbId);
router.get('/:id', movieService.getById);
router.post('/', movieService.create);
router.put('/:id', movieService.update);
router.delete('/:id', movieService.delete);

// Custom routes
router.get('/:id/actors', movieService.getMovieActors);

export default router; 