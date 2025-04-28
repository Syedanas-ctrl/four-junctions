import { Response } from 'express';

// Custom error class with status code
export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

// Error handling middleware
export const errorHandler = (err: Error, res: Response): void => {
  console.error('Error:', err);
  
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  
  // Default to 500 internal server error if not a known error type
  res.status(500).json({ error: 'Internal server error' });
};

// Not found error
export const notFound = (entity: string): ApiError => {
  return new ApiError(`${entity} not found`, 404);
};

// Bad request error
export const badRequest = (message: string): ApiError => {
  return new ApiError(message, 400);
};

// Unauthorized error
export const unauthorized = (message = 'Unauthorized'): ApiError => {
  return new ApiError(message, 401);
};

// Forbidden error
export const forbidden = (message = 'Forbidden'): ApiError => {
  return new ApiError(message, 403);
}; 