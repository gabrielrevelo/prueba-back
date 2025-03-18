import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ResponseHandler } from '../utils/responseHandler';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHandler.error(
      res,
      400,
      errors.array().map(err => err.msg).join(', ')
    );
  }
  next();
}; 