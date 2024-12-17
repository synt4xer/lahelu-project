import { eq } from 'drizzle-orm';
import db from '../database';
import { NewUser, User, users } from '../database/schema/users';
import { NotFoundError } from '../errors/custom-errors';

export class UsersRepository {
  async create(data: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)
      .then((rows) => rows[0]);

    return user;
  }

  async update(id: number, data: Partial<NewUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async delete(id: number): Promise<void> {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();

    if (!user) {
      throw new NotFoundError('User not found');
    }
  }
}
