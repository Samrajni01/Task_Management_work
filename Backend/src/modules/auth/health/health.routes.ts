import { Router } from 'express';
import { prisma } from '../../../shared/prisma.js'; 

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: System health check
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check system health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: System is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: System is healthy
 *                 database:
 *                   type: string
 *                   example: connected
 *                 timestamp:
 *                   type: string
 *                   example: 2026-04-15T00:00:00.000Z
 *       503:
 *         description: System unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: System unhealthy
 *                 database:
 *                   type: string
 *                   example: disconnected
 */
router.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'success',
      message: 'System is healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'System unhealthy',
      database: 'disconnected'
    });
  }
});

export default router;