'use server'

import { db } from '@/lib/db'
import { videos } from '@/lib/db/schema'
import { desc, eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getVideos() {
  return db
    .select()
    .from(videos)
    .orderBy(desc(videos.createdAt))
}

export async function getVideo(id: number) {
  const result = await db
    .select()
    .from(videos)
    .where(eq(videos.id, id))
    .limit(1)
  return result[0] || null
}

export async function incrementLikes(id: number) {
  await db
    .update(videos)
    .set({ 
      likes: sql`${videos.likes} + 1`,
      updatedAt: new Date()
    })
    .where(eq(videos.id, id))
  revalidatePath('/')
  revalidatePath(`/video/${id}`)
}

export async function incrementViews(id: number) {
  await db
    .update(videos)
    .set({ 
      views: sql`${videos.views} + 1`,
      updatedAt: new Date()
    })
    .where(eq(videos.id, id))
}

export async function createVideo(data: {
  title: string
  description: string
  videoUrl: string
  thumbnailUrl?: string
  duration?: number
}) {
  const result = await db
    .insert(videos)
    .values(data)
    .returning()
  revalidatePath('/')
  return result[0]
}

export async function deleteVideo(id: number) {
  await db.delete(videos).where(eq(videos.id, id))
  revalidatePath('/')
}
