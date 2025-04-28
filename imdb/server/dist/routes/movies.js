"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const router = express_1.default.Router();
// Get all movies
router.get('/', movieController_1.getAllMovies);
// Get a single movie by ID
router.get('/:id', movieController_1.getMovieById);
// Create a new movie
router.post('/', movieController_1.createMovie);
// Update a movie
router.put('/:id', movieController_1.updateMovie);
// Delete a movie
router.delete('/:id', movieController_1.deleteMovie);
// Add an actor to a movie
router.post('/:movieId/actors/:actorId', movieController_1.addActorToMovie);
// Remove an actor from a movie
router.delete('/:movieId/actors/:actorId', movieController_1.removeActorFromMovie);
exports.default = router;
