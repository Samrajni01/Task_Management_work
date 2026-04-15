import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { globalErrorHandler } from './shared/middlewares/error.middleware.js';
import { AppError } from './shared/utils/AppError.js';
import authRoutes from './modules/auth/auth.routes.js';
import healthRoutes from './modules/auth/health/health.routes.js';
import taskRoutes from './modules/tasks/tasks.routes.js';
import { setupSwagger } from './config/swagger.js';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
setupSwagger(app);

// 404 handler
app.all('*path', (req: Request, res: Response, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;