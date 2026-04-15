import app from './app.js';
import { ENV } from './config/env.js';
import { logger } from './shared/utils/logger.js';

const port = ENV.PORT;

const server = app.listen(port, () => {
  logger.info(`🚀 Server running in ${ENV.NODE_ENV} mode on http://localhost:${port}`);
  logger.info(`📖 Documentation available at http://localhost:${port}/api-docs`);
});

// Handle unhandled promise rejections (e.g., DB connection issues)
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions (e.g., bugs in synchronous code)
process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);
  process.exit(1);
});