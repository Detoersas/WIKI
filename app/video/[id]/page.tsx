import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getVideo, getVideos } from '@/app/actions/videos'
import { Header } from '@/components/header'
import { LikeButton } from '@/components/like-button'

interface VideoPageProps {
  params: Promise<{ id: string }>
}

function formatDate(date: Date | null) {
  if (!date) return 'Unknown'
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params
  const videoId = parseInt(id, 10)
  
  if (isNaN(videoId)) {
    notFound()
  }

  const video = await getVideo(videoId)
  
  if (!video) {
    notFound()
  }

  const allVideos = await getVideos()
  const relatedVideos = allVideos.filter((v) => v.id !== video.id).slice(0, 5)

  // Check if it's a Jumpshare embed URL
  const isJumpshareEmbed = video.videoUrl.includes('jumpshare.com/embed')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-4 text-sm">
          <Link href="/" className="text-primary hover:underline">Main Page</Link>
          <span className="text-muted-foreground"> &gt; </span>
          <span className="text-foreground">{video.title}</span>
        </div>

        <div className="border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2">
            <h1 className="text-xl font-bold text-foreground">
              {video.title}
            </h1>
          </div>
          
          <div className="px-4 py-4">
            <div className="mb-4 border border-border bg-secondary p-2 text-xs">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 pr-4 font-bold text-muted-foreground">Views:</td>
                    <td className="py-1">{(video.views || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-bold text-muted-foreground">Likes:</td>
                    <td className="py-1">{(video.likes || 0).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-bold text-muted-foreground">Date:</td>
                    <td className="py-1">{formatDate(video.createdAt)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mb-3 border-b border-border pb-1 text-lg font-bold text-foreground">
              Video
            </h2>
            
            <div className="mb-4 border border-border bg-black">
              {isJumpshareEmbed ? (
                <iframe
                  src={video.videoUrl}
                  className="aspect-video w-full"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                />
              ) : (
                <video
                  src={video.videoUrl}
                  controls
                  className="aspect-video w-full"
                  poster={video.thumbnailUrl || undefined}
                />
              )}
            </div>

            <div className="mb-6">
              <LikeButton videoId={video.id} initialLikes={video.likes || 0} />
            </div>

            {video.description && (
              <>
                <h2 className="mb-3 border-b border-border pb-1 text-lg font-bold text-foreground">
                  Description
                </h2>
                <div className="mb-6 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {video.description}
                </div>
              </>
            )}

            {relatedVideos.length > 0 && (
              <>
                <h2 className="mb-3 border-b border-border pb-1 text-lg font-bold text-foreground">
                  See Also
                </h2>
                <ul className="mb-4 list-disc pl-5 text-sm">
                  {relatedVideos.map((relatedVideo) => (
                    <li key={relatedVideo.id} className="py-0.5">
                      <Link href={`/video/${relatedVideo.id}`} className="text-primary hover:underline">
                        {relatedVideo.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mb-3 border-b border-border pb-1 text-lg font-bold text-foreground">
              References
            </h2>
            <p className="text-sm text-muted-foreground italic">
              This tutorial was contributed anonymously. If you found it helpful, please click the like button above.
            </p>
          </div>
        </div>
        
        <footer className="mt-4 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>Content is available under public domain. | <Link href="/" className="text-primary hover:underline">Return to Main Page</Link></p>
        </footer>
      </main>
    </div>
  )
}
