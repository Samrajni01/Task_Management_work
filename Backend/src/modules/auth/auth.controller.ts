import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as authService from './auth.service.js';
import { catchAsync } from '../../shared/utils/catchAsync.js';
import { AppError } from '../../shared/utils/AppError.js';
import { ENV } from '../../config/env.js';

export const register = catchAsync(async (req: Request, res: Response) => {
  const existingUser = await authService.findUserByEmail(req.body.email);
  if (existingUser) throw new AppError('Email already in use', 400);

  const user = await authService.createUser(req.body);

  res.status(201).json({ status: 'success', data: { user } });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  const token = jwt.sign({ id: user.id }, ENV.JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({ status: 'success', token });
});