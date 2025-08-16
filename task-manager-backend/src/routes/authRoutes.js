import { Router } from 'express';
import { login, me, register } from '../controllers/authController.js';
import { auth } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { loginRules, registerRules } from '../validators/authValidators.js';

const router = Router();

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.get('/me', auth, me);

export default router;
