import { Request, Response, NextFunction } from 'express';
import { ResponseHandler } from '../utils/responseHandler';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.code === 11000) {
    return ResponseHandler.error(res, 409, "Email already exists");
  }
  
  if (error.name === "CastError") {
    return ResponseHandler.error(res, 400, "Invalid ID format");
  }

  ResponseHandler.error(res, 500, "Internal server error");
}; 