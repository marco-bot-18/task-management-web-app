import { body, param } from 'express-validator';

export const createTaskRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Invalid status')
];

export const updateTaskRules = [
  param('id').isMongoId().withMessage('Invalid task id'),
  body('title').optional().trim().notEmpty(),
  body('description').optional().isString(),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
];

export const idParamRule = [param('id').isMongoId().withMessage('Invalid task id')];
