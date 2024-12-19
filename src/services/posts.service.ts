// import { Comment, NewComment } from '../database/schema/comments';
import { NewPost, Post } from '../database/schema/posts';
import { NotFoundError } from '../errors/custom-errors';
import { CommentsRepository } from '../repositories/comments.repository';
import { PostsRepository } from '../repositories/posts.repository';
import { generateCursor, parseCursor } from '../utils/base.util';

export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async createPost(data: NewPost): Promise<Post> {
    const post = await this.postsRepository.create(data);
    return post;
  }

  async getPosts(
    limit: number = 10,
    cursor?: string,
  ): Promise<{ posts: Post[]; hasMore: boolean; nextCursor?: string | null }> {
    const cursorDate = cursor ? parseCursor(cursor) : null;
    const { date, id } = cursorDate || {};
    const { posts, hasMore } = await this.postsRepository.findMany(limit, date, id);

    return {
      posts,
      hasMore,
      nextCursor: hasMore
        ? generateCursor(posts[posts.length - 1].createdAt, posts[posts.length - 1].id)
        : null,
    };
  }

  async getPost(id: number): Promise<Post> {
    try {
      const post = await this.postsRepository.findById(id);
      return post;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error('Failed to get post');
    }
  }

  // async getComments(id: number): Promise<Comment[]> {
  //   const comments = await this.commentsRepository.findByPostId(id);
  //   return comments;
  // }

  // async createComment(id: number, data: NewComment): Promise<Comment> {
  //   const comment = await this.commentsRepository.create(id, data);
  //   return comment;
  // }
}
