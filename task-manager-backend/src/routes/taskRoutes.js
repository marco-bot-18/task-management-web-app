import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} from '../controllers/taskController.js';
import { auth } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import {
  createTaskRules,
  idParamRule,
  updateTaskRules
} from '../validators/taskValidators.js';

const router = Router();

router.use(auth);

router
  .route('/')
  .get(getTasks)
  .post(createTaskRules, validate, createTask);

router
  .route('/:id')
  .get(idParamRule, validate, getTaskById)
  .patch(updateTaskRules, validate, updateTask)
  .delete(idParamRule, validate, deleteTask);

export default router;
