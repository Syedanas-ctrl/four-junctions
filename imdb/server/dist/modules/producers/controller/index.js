"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = __importDefault(require("../service"));
const router = (0, express_1.Router)();
// CRUD routes
router.get('/', service_1.default.getAll);
router.get('/search/:name', service_1.default.searchByName);
router.get('/:id', service_1.default.getById);
router.get('/imdb/:id', service_1.default.getByImdbId);
router.post('/', service_1.default.create);
router.put('/:id', service_1.default.update);
router.delete('/:id', service_1.default.delete);
exports.default = router;
