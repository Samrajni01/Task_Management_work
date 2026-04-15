//For ADMIN
import type { Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

export const restrictTo = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    // roles is an array like ['ADMIN', 'MANAGER']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};