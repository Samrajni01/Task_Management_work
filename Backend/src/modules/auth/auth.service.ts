import bcrypt from 'bcryptjs';
// Change line 3 to this:
import { prisma } from '../../shared/prisma.js'; 

export const createUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 12);
  
  return await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
    select: { id: true, email: true, role: true },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};