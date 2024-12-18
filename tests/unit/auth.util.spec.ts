import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthUtil } from '../../src/utils/auth.util';
import { AppConstant } from '../../src/utils/constant';
import { AuthTokenError, ValidationError } from '../../src/errors/custom-errors';

describe('AuthUtil', () => {
  describe('validatePassword', () => {
    it('should return true for matching passwords', async () => {
      const plainPassword = 'password123';
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const result = await AuthUtil.validatePassword(plainPassword, hashedPassword);

      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const plainPassword = 'password123';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const result = await AuthUtil.validatePassword(wrongPassword, hashedPassword);

      expect(result).toBe(false);
    });
  });

  describe('hashPassword', () => {
    it('should hash password successfully', async () => {
      const password = 'password123';

      const hashedPassword = await AuthUtil.hashPassword(password);

      expect(hashedPassword).not.toBe(password);
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(0);
    });
  });

  describe('generateToken', () => {
    it('should generate valid JWT token', () => {
      const userId = 1;
      const username = 'testuser';

      const token = AuthUtil.generateToken(userId, username);

      const decoded = jwt.verify(token, AppConstant.JWT_SECRET) as { id: number; username: string };
      expect(decoded.id).toBe(userId);
      expect(decoded.username).toBe(username);
    });

    it('should throw ValidationError when userId or username is missing', () => {
      expect(() => AuthUtil.generateToken(0, '')).toThrow(ValidationError);
      expect(() => AuthUtil.generateToken(1, '')).toThrow(ValidationError);
      expect(() => AuthUtil.generateToken(0, 'username')).toThrow(ValidationError);
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token successfully', () => {
      const userId = 1;
      const username = 'testuser';
      const token = jwt.sign({ id: userId, username }, AppConstant.JWT_SECRET);

      const result = AuthUtil.verifyToken(token);

      expect(result.id).toBe(userId);
      expect(result.username).toBe(username);
    });

    it('should throw AuthTokenError for invalid token', () => {
      expect(() => AuthUtil.verifyToken('invalid-token')).toThrow(AuthTokenError);
    });

    it('should throw AuthTokenError for empty token', () => {
      expect(() => AuthUtil.verifyToken('')).toThrow(AuthTokenError);
    });

    it('should throw AuthTokenError for expired token', () => {
      const token = jwt.sign({ id: 1, username: 'test' }, AppConstant.JWT_SECRET, {
        expiresIn: '0s',
      });

      expect(() => AuthUtil.verifyToken(token)).toThrow(AuthTokenError);
    });
  });
});
