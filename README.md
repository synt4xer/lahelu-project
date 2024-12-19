# Lahelu Test Project

A test project for Lahelu, a meme sharing platform.

## Features

- User authentication with password hashing
- Image post creation (public/private)
- Comment system with pagination
- Cursor-based pagination for efficient loading of posts and comments

## Database Schema

### Users Table
- `id`: Serial primary key
- `username`: Unique text
- `password`: Hashed text
- `avatar`: Text URL
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Posts Table
- `id`: Serial primary key
- `title`: Text
- `media_url`: Text URL
- `media_width`: Integer
- `media_height`: Integer
- `is_private`: Boolean
- `user_id`: Foreign key to Users
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Comments Table
- `id`: Serial primary key
- `content`: Text
- `post_id`: Foreign key to Posts
- `user_id`: Foreign key to Users
- `created_at`: Timestamp
- `updated_at`: Timestamp

For details, please refer to `migrations/` folder.

## API Endpoints

### Authentication
- `POST /auth/login` - Login user

### Posts
- `GET /posts` - Get paginated posts
- `POST /posts` - Create new post
- `GET /posts/:id` - Get single post
- `GET /posts/:id/comments` - Get paginated comments for post
- `POST /posts/:id/comments` - Create comment on post

## Development

1. Clone the repository
2. Install dependencies: `yarn`
3. Set up environment variables on `docker-compose.yml`, ask for the REDACTED values
4. Run the project using docker compose
5. Start with `docker-compose build --no-cache`
6. Then `docker-compose up`
7. The migrations will run automatically based on config on `database/index.ts` line 18.
8. For development, start development server with: `yarn dev`
9. To run unit tests: `yarn test:unit`

## Technologies Used

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [DrizzleORM](https://orm.drizzle.team/)
- [Express](https://expressjs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- [AWS S3](https://aws.amazon.com/s3/) for image storage
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Docker](https://www.docker.com/)

