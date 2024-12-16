import {
  boolean,
  foreignKey,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const posts = pgTable(
  'posts',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    mediaUrl: text('media_url').notNull(),
    mediaWidth: integer('media_width').notNull(),
    mediaHeight: integer('media_height').notNull(),
    isPrivate: boolean('is_private').notNull().default(false),
    userId: integer('user_id').references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    // foreign key
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
    }),

    // composite index
    index('posts_cursor_user_idx').on(table.createdAt.desc(), table.id, table.userId),
    index('posts_privacy_time_idx').on(table.isPrivate, table.createdAt.desc(), table.id),
  ],
);

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
