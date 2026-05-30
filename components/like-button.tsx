'use client'

import { useState } from 'react'
import { incrementLikes } from '@/app/actions/videos'

interface LikeButtonProps {
  videoId: number
  initialLikes: number
}

export function LikeButton({ videoId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiking, setIsLiking] = useState(false)

  async function handleLike() {
    setIsLiking(true)
    setLikes((prev) => prev + 1)
    
    try {
      await incrementLikes(videoId)
    } catch (error) {
      setLikes((prev) => prev - 1)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiking}
      className="inline-flex items-center gap-2 border border-border bg-muted px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
    >
      <span className="text-red-600">{'\u2665'}</span>
      <span>Like this tutorial ({likes.toLocaleString()})</span>
    </button>
  )
}
