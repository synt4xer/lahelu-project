import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { PostsService } from '../services/posts.service';
import { S3Service } from '../services/s3.service';
import { ResponseUtil } from '../utils/response.util';
import { RequestWithUser } from '../types/auth.type';
import { ValidationError } from '../errors/custom-errors';
import { CompressionService } from '../services/compression.service';
import { AppConstant } from '../utils/constant';
import { getContentType } from '../utils/base.util';

export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly s3Service: S3Service,
  ) {}

  createPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const contentBucketName = AppConstant.S3_BUCKET_CONTENT_NAME!;
      const userId = req.user?.id;
      const file = req.file;
      const compressedFilePath = path.join('uploads', `compressed-${req.file?.filename}`);
      const { title, isPrivate } = req.body;
      let s3ContentUrl: string;
      let finalWidth: number;
      let finalHeight: number;

      if (!title || !file) {
        throw new ValidationError('Invalid request body');
      }

      const mimeType = getContentType(file.path);

      if (mimeType.startsWith('image/')) {
        const { outputPath, width, height } = await CompressionService.compressImage(
          file.path,
          compressedFilePath,
        );
        s3ContentUrl = outputPath;
        finalWidth = width;
        finalHeight = height;
      } else if (mimeType.startsWith('video/')) {
        const { outputPath, width, height } = await CompressionService.compressVideo(
          file.path,
          compressedFilePath,
        );
        s3ContentUrl = outputPath;
        finalWidth = width;
        finalHeight = height;
      } else {
        throw new ValidationError('Invalid file type');
      }

      const mediaUrl = await this.s3Service.uploadFile(s3ContentUrl, contentBucketName, mimeType);

      const [post] = await Promise.all([
        this.postsService.createPost({
          userId,
          title,
          mediaUrl,
          mediaWidth: finalWidth,
          mediaHeight: finalHeight,
          isPrivate,
        }),
        CompressionService.removeFile(compressedFilePath),
        CompressionService.removeFile(file.path),
      ]);

      ResponseUtil.success(res, {
        message: 'Post created successfully',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  };

  getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cursor = req.query.cursor as string | undefined;
      const limit = parseInt((req.query.limit as string) || '10');

      const { posts, hasMore, nextCursor } = await this.postsService.getPosts(limit, cursor);

      ResponseUtil.success(res, {
        message: 'Posts fetched successfully',
        data: posts,
        hasMore,
        nextCursor,
      });
    } catch (error) {
      next(error);
    }
  };

  getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const post = await this.postsService.getPost(id);
      ResponseUtil.success(res, {
        message: 'Post fetched successfully',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  };

  // getComments = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const postId = parseInt(req.params.postId);
  //     const comments = await this.postsService.getComments(postId);
  //     ResponseUtil.success(res, {
  //       message: 'Comments fetched successfully',
  //       data: comments,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // createComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //   try {
  //     const postId = parseInt(req.params.postId);
  //     const userId = req.user?.id;
  //     const { content } = req.body;

  //     if (!content) {
  //       throw new ValidationError('Invalid request body');
  //     }

  //     const comment = await this.postsService.createComment(postId, {
  //       userId,
  //       content,
  //     });
  //     ResponseUtil.success(res, {
  //       message: 'Comment created successfully',
  //       data: comment,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
