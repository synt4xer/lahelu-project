import { UsersRepository } from '../../src/repositories/users.repository';
import { NotFoundError } from '../../src/errors/custom-errors';
import db from '../../src/database';
import { users } from '../../src/database/schema/users';

jest.mock('../../src/database', () => ({
  insert: jest.fn(),
  select: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe('UsersRepository', () => {
  let repository: UsersRepository;

  beforeEach(() => {
    repository = new UsersRepository();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockUser]),
        }),
      });

      const result = await repository.create({
        username: 'testuser',
        password: 'hashedpassword',
      });

      expect(result).toEqual(mockUser);
      expect(db.insert).toHaveBeenCalledWith(users);
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await repository.findById(1);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundError if user not found', async () => {
      (db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValue(null),
      });

      await expect(repository.findById(999)).rejects.toThrow(NotFoundError);
    });
  });

  describe('findByUsername', () => {
    it('should find user by username', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await repository.findByUsername('testuser');

      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      (db.select as jest.Mock).mockReturnValue({
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        then: jest.fn().mockResolvedValue(null),
      });

      const result = await repository.findByUsername('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const mockUser = {
        id: 1,
        username: 'updateduser',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValue([mockUser]),
      });

      const result = await repository.update(1, {
        username: 'updateduser',
      });

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundError if user not found during update', async () => {
      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValue([]),
      });

      await expect(repository.update(999, { username: 'updateduser' })).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValue([mockUser]),
      });

      await expect(repository.delete(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundError if user not found during deletion', async () => {
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValue([]),
      });

      await expect(repository.delete(999)).rejects.toThrow(NotFoundError);
    });
  });
});
