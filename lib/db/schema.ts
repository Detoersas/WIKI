import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  videoUrl: text('video_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  duration: integer('duration'),
  likes: integer('likes').default(0),
  views: integer('views').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export type Video = typeof videos.$inferSelect
export type NewVideo = typeof videos.$inferInsert
