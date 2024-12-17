import { Response, NextFunction } from 'express';
import { AuthUtil } from '../utils/auth.util';
import { AuthTokenError } from '../errors/custom-errors';
import { RequestWithUser } from '../types/auth.type';

export const authenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthTokenError('Invalid authorization header format');
    }

    const token = authHeader.split(' ')[1];
    const decoded = AuthUtil.verifyToken(token);

    // Add user info to request object for use in subsequent middleware/routes
    req.user = {
      id: decoded.id,
      username: decoded.username
    };

    next();
  } catch (error) {
    next(error);
  }
};
