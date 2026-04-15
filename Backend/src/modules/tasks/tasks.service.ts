import { prisma } from '../../shared/prisma.js';

export const getAllTasks = async (userId: string) => {
  return await prisma.task.findMany({ where: { userId } });
};

export const createTask = async (userId: string, data: any) => {
  return await prisma.task.create({
    data: { ...data, userId }
  });
};