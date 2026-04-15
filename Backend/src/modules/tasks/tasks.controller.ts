import type { Request, Response } from 'express';
import * as taskService from './tasks.service.js';
import { catchAsync } from '../../shared/utils/catchAsync.js';

export const getMyTasks = catchAsync(async (req: any, res: Response) => {
  const tasks = await taskService.getAllTasks(req.user.id);
  res.status(200).json({ status: 'success', data: { tasks } });
});

export const createNewTask = catchAsync(async (req: any, res: Response) => {
  const task = await taskService.createTask(req.user.id, req.body);
  res.status(201).json({ status: 'success', data: { task } });
});