import express from 'express';
import { PostsRepository } from '../repositories/posts.repository';
import { PostsService } from '../services/posts.service';
import { CommentsRepository } from '../repositories/comments.repository';
import { PostsController } from '../controllers/posts.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../utils/multer';
import { S3Service } from '../services/s3.service';

const router = express.Router();

// dependency injection
const s3Service = new S3Service();
const postsRepository = new PostsRepository();
const commentsRepository = new CommentsRepository();
const postsService = new PostsService(postsRepository, commentsRepository);
const postsController = new PostsController(postsService, s3Service);

// routes
router.post('/', authenticate, upload.single('file'), postsController.createPost);
router.get('/', authenticate, postsController.getPosts);
router.get('/:id', authenticate, postsController.getPost);
// router.get('/:id/comments', authenticate, postsController.getComments);
// router.post('/:id/comments', authenticate, postsController.createComment);

export default router;
