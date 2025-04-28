"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidden = exports.unauthorized = exports.badRequest = exports.notFound = exports.errorHandler = exports.ApiError = void 0;
// Custom error class with status code
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
// Error handling middleware
const errorHandler = (err, res) => {
    console.error('Error:', err);
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    // Default to 500 internal server error if not a known error type
    res.status(500).json({ error: 'Internal server error' });
};
exports.errorHandler = errorHandler;
// Not found error
const notFound = (entity) => {
    return new ApiError(`${entity} not found`, 404);
};
exports.notFound = notFound;
// Bad request error
const badRequest = (message) => {
    return new ApiError(message, 400);
};
exports.badRequest = badRequest;
// Unauthorized error
const unauthorized = (message = 'Unauthorized') => {
    return new ApiError(message, 401);
};
exports.unauthorized = unauthorized;
// Forbidden error
const forbidden = (message = 'Forbidden') => {
    return new ApiError(message, 403);
};
exports.forbidden = forbidden;
