"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actorController_1 = require("../controllers/actorController");
const router = express_1.default.Router();
// Get all actors
router.get('/', actorController_1.getAllActors);
// Get a single actor by ID
router.get('/:id', actorController_1.getActorById);
// Create a new actor
router.post('/', actorController_1.createActor);
// Update an actor
router.put('/:id', actorController_1.updateActor);
// Delete an actor
router.delete('/:id', actorController_1.deleteActor);
// Get movies for a specific actor
router.get('/:id/movies', actorController_1.getActorMovies);
exports.default = router;
