import db from '../database';
import { eq, desc, and, lte, gt } from 'drizzle-orm';
import { NotFoundError } from '../errors/custom-errors';
import { NewPost, Post, posts } from '../database/schema/posts';

export class PostsRepository {
  async create(data: NewPost): Promise<Post> {
    const [post] = await db.insert(posts).values(data).returning();
    return post;
  }

  async findById(id: number): Promise<Post> {
    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1)
      .then((rows) => rows[0]);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return post;
  }

  async findMany(
    limit: number = 10,
    date?: Date,
    id?: number,
  ): Promise<{ posts: Post[]; hasMore: boolean }> {
    const query = db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt), desc(posts.id))
      .limit(limit + 1);

    if (date && id) {
      query.where(and(lte(posts.createdAt, date), gt(posts.id, id)));
    }

    const results = await query;
    const hasMore = results.length > limit;

    return { posts: results.slice(0, limit), hasMore };
  }

  async update(id: number, data: Partial<NewPost>): Promise<Post> {
    const [post] = await db
      .update(posts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return post;
  }

  async delete(id: number): Promise<void> {
    const [post] = await db.delete(posts).where(eq(posts.id, id)).returning();

    if (!post) {
      throw new NotFoundError('Post not found');
    }
  }
}
