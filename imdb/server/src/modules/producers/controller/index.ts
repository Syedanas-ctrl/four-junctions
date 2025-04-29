import { Router } from 'express';
import producerService from '../service';

const router = Router();

// CRUD routes
router.get('/', producerService.getAll);
router.get('/search/:name', producerService.searchByName);
router.get('/:id', producerService.getById);
router.get('/imdb/:id', producerService.getByImdbId);
router.post('/', producerService.create);
router.put('/:id', producerService.update);
router.delete('/:id', producerService.delete);

export default router; 