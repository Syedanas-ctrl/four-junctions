"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producerController_1 = require("../controllers/producerController");
const router = express_1.default.Router();
// Get all producers
router.get('/', producerController_1.getAllProducers);
// Get a single producer by ID
router.get('/:id', producerController_1.getProducerById);
// Create a new producer
router.post('/', producerController_1.createProducer);
// Update a producer
router.put('/:id', producerController_1.updateProducer);
// Delete a producer
router.delete('/:id', producerController_1.deleteProducer);
// Get all movies by a producer
router.get('/:id/movies', producerController_1.getProducerMovies);
exports.default = router;
