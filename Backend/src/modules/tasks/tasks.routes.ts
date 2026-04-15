import { Router } from 'express';
import * as taskController from './tasks.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import { createTaskSchema } from './tasks.dto.js';
import { protect } from '../../shared/middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints (requires authentication)
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all my tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: uuid-here
 *                       title:
 *                         type: string
 *                         example: My Task
 *                       description:
 *                         type: string
 *                         example: Task description
 *                       status:
 *                         type: string
 *                         example: PENDING
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: My New Task
 *               description:
 *                 type: string
 *                 example: Task description here
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *                 example: PENDING
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: uuid-here
 *                     title:
 *                       type: string
 *                       example: My New Task
 *                     status:
 *                       type: string
 *                       example: PENDING
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       400:
 *         description: Validation error
 */

router.use(protect);

router.get('/', taskController.getMyTasks);
router.post('/', validate(createTaskSchema), taskController.createNewTask);

export default router;