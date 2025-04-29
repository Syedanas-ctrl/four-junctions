import { Router } from 'express';
import actorService from '../service';

const router = Router();

// CRUD routes
router.get('/', actorService.getAll);
router.get('/search/:name', actorService.searchByName);
router.get('/:id', actorService.getById);
router.get('/imdb/:id', actorService.getByImdbId);
router.post('/', actorService.create);
router.put('/:id', actorService.update);
router.delete('/:id', actorService.delete);

// Custom routes
router.get('/:id/movies', actorService.getActorMovies);

export default router; 