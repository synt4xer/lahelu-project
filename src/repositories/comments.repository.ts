import db from '../database';
import { and, desc, eq, lt } from 'drizzle-orm';
import { users } from '../database/schema/users';
import { NotFoundError } from '../errors/custom-errors';
import { NewComment, Comment, comments, CommentWithUser } from '../database/schema/comments';

export class CommentsRepository {
  async create(postId: number, data: NewComment): Promise<Comment> {
    const [comment] = await db
      .insert(comments)
      .values({ ...data, postId })
      .returning();
    return comment;
  }

  async findById(id: number): Promise<Comment> {
    const comment = await db
      .select()
      .from(comments)
      .where(eq(comments.id, id))
      .limit(1)
      .then((rows) => rows[0]);

    if (!comment) {
      throw new NotFoundError('Comment not found');
    }

    return comment;
  }

  async findByPostId(postId: number): Promise<Comment[]> {
    const postComments = await db.select().from(comments).where(eq(comments.postId, postId));

    return postComments;
  }

  async findByPostIdPaginated(
    postId: number,
    limit: number = 10,
    date?: Date,
    commentId?: number,
  ): Promise<{ comments: CommentWithUser[]; hasMore: boolean }> {
    const query = db
      .select({
        id: comments.id,
        userId: comments.userId,
        postId: comments.postId,
        content: comments.content,
        username: users.username,
        avatar: users.avatar,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
      })
      .from(comments)
      .innerJoin(users, eq(comments.userId, users.id))
      .where(
        and(
          eq(comments.postId, postId),
          date ? lt(comments.createdAt, date) : undefined,
          commentId ? eq(comments.id, commentId) : undefined,
        ),
      )
      .orderBy(desc(comments.createdAt), desc(comments.id))
      .limit(limit + 1);

    const results = await query;
    const hasMore = results.length > limit;

    return { comments: results.slice(0, limit), hasMore };
  }

  async update(id: number, data: Partial<NewComment>): Promise<Comment> {
    const [comment] = await db
      .update(comments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(comments.id, id))
      .returning();

    if (!comment) {
      throw new NotFoundError('Comment not found');
    }

    return comment;
  }

  async delete(id: number): Promise<void> {
    const [comment] = await db.delete(comments).where(eq(comments.id, id)).returning();

    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
  }
}
