import express, { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UsersRepository } from '../repositories/users.repository';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// dependency injection
const usersRepository = new UsersRepository();
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

// routes
router.post('/login', authController.login);

router.get('/test', authenticate, (_req: Request, res: Response) => {
  res.status(200).json({ status: 'hi, i am test!' });
});

export default router;
