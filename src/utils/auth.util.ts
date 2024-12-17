import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppConstant } from './constant';
import { User } from '../types/auth.type';
import { AuthTokenError, ValidationError } from '../errors/custom-errors';

export class AuthUtil {
  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(AppConstant.SALT);
    return await bcrypt.hash(password, salt);
  }

  static generateToken(userId: number, username: string): string {
    if (!userId || !username) {
      throw new ValidationError('User ID and username are required for token generation');
    }

    return jwt.sign({ id: userId, username }, AppConstant.JWT_SECRET, {
      expiresIn: AppConstant.JWT_EXPIRED_TIME,
    });
  }

  static verifyToken(token: string): User {
    if (!token) {
      throw new AuthTokenError();
    }

    try {
      return jwt.verify(token, AppConstant.JWT_SECRET) as User;
    } catch (error) {
      throw new AuthTokenError('Invalid or expired token');
    }
  }
}
