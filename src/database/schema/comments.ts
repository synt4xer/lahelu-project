import { foreignKey, index, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { posts } from './posts';

export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    postId: integer('post_id').references(() => posts.id),
    userId: integer('user_id').references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    // foreign key
    foreignKey({
      columns: [table.postId],
      foreignColumns: [posts.id],
    }),

    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
    }),

    // composite index
    index('comments_post_time_idx').on(table.postId, table.createdAt.desc(), table.id),
    index('comments_user_time_idx').on(table.userId, table.createdAt.desc(), table.id),
  ],
);

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
export type CommentWithUser = typeof comments.$inferSelect & {
  username: string;
  avatar: string | null;
};
