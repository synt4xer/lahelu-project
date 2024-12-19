import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { ResponseUtil } from '../utils/response.util';
import { ValidationError } from '../errors/custom-errors';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ValidationError('Username and password are required');
      }

      const result = await this.authService.login(username, password);

      ResponseUtil.success(res, 'Login successful', {
        token: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
