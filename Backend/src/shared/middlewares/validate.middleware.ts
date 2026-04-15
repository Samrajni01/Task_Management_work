import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { catchAsync } from '../utils/catchAsync.js';

export const validate = (schema: z.ZodType<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    }); 
    next();
  });