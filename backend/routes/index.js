import express from "express";
import { checkAuth } from "../utils/checkAuth.js";
import authRoutes from './auth.js';
import usersRoutes from './users.js';
import tasksRoutes from './tasks.js';

const router = express.Router();

router.use('/auth', authRoutes); // Mounts the authentication routes under '/auth' path
router.use('/users', checkAuth, usersRoutes); // Mounts the user routes under '/users' path with authentication middleware
router.use('/tasks', checkAuth, tasksRoutes); // Mounts the task routes under '/tasks' path with authentication middleware

export default router;