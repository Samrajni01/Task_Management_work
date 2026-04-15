import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Port is converted to a number and  default is the number 5000
  PORT: z.string().transform(Number).default(5000), 
  
  DATABASE_URL: z.string().url('Invalid Database URL format'),
  
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be at least 8 characters long'),
  
  JWT_EXPIRES_IN: z.string().default('1d'),
  
  // Redis URL validation
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid Environment Variables:', JSON.stringify(_env.error.format(), null, 2));
  process.exit(1);
}

export const ENV = _env.data;