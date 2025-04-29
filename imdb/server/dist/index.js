"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const controller_1 = __importDefault(require("./modules/actors/controller"));
const controller_2 = __importDefault(require("./modules/movies/controller"));
const controller_3 = __importDefault(require("./modules/producers/controller"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the IMDB API' });
});
app.use('/api/actors', controller_1.default);
app.use('/api/movies', controller_2.default);
app.use('/api/producers', controller_3.default);
// Error handling for invalid routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
