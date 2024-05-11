import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../types/ErrorHandler-type'; // Ensure this path is correct

const handleAllError = (err: ErrorHandler | any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Handling other types of errors
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'An unexpected error occurred',
  });
};

export default handleAllError;
