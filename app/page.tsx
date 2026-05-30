import { getVideos } from '@/app/actions/videos'
import { Header } from '@/components/header'
import Link from 'next/link'

export default async function HomePage() {
  const videos = await getVideos()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2">
            <h1 className="text-xl font-bold text-foreground">
              Free Game Tutorials Wiki
            </h1>
          </div>
          
          <div className="px-4 py-4">
            <p className="mb-4 text-sm leading-relaxed text-foreground">
              Welcome to the <strong>Free Game Tutorials Wiki</strong>, the free encyclopedia of game installation guides that anyone can read. 
              This wiki contains tutorials for downloading and installing games for free on PC.
            </p>
            
            <div className="mb-6 border-l-4 border-primary bg-secondary px-4 py-2">
              <p className="text-sm text-foreground">
                <strong>Note:</strong> Please like and follow if the tutorials help you. All videos are made by anonymous contributors.
              </p>
            </div>

            <h2 className="mb-3 border-b border-border pb-1 text-lg font-bold text-foreground">
              Contents
            </h2>
            
            <div className="mb-6 border border-border bg-secondary p-3">
              <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Table of Contents</p>
              <ol className="list-decimal pl-5 text-sm">
                <li><a href="#tutorials" className="text-primary">Video Tutorials</a></li>
                <li><a href="#about" className="text-primary">About This Wiki</a></li>
              </ol>
            </div>

            <h2 id="tutorials" className="mb-3 border-b border-border pb-1 text-lg font-bold text-foreground">
              Video Tutorials
            </h2>

            {videos.length === 0 ? (
              <p className="text-sm italic text-muted-foreground">
                No tutorials have been added yet. Check back soon.
              </p>
            ) : (
              <table className="mb-6 w-full border-collapse border border-border text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-3 py-2 text-left font-bold">#</th>
                    <th className="border border-border px-3 py-2 text-left font-bold">Title</th>
                    <th className="border border-border px-3 py-2 text-left font-bold">Likes</th>
                    <th className="border border-border px-3 py-2 text-left font-bold">Views</th>
                    <th className="border border-border px-3 py-2 text-left font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video, index) => (
                    <tr key={video.id} className="hover:bg-secondary">
                      <td className="border border-border px-3 py-2">{index + 1}</td>
                      <td className="border border-border px-3 py-2">
                        <Link href={`/video/${video.id}`} className="text-primary hover:underline">
                          {video.title}
                        </Link>
                      </td>
                      <td className="border border-border px-3 py-2">{video.likes || 0}</td>
                      <td className="border border-border px-3 py-2">{video.views || 0}</td>
                      <td className="border border-border px-3 py-2 text-muted-foreground">
                        {video.createdAt ? new Date(video.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'Unknown'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <h2 id="about" className="mb-3 border-b border-border pb-1 text-lg font-bold text-foreground">
              About This Wiki
            </h2>
            
            <p className="text-sm leading-relaxed text-foreground">
              This wiki was created to help people find and install games for free. All tutorials are contributed 
              anonymously. If you find a tutorial helpful, please click the like button on the video page.
            </p>
          </div>
        </div>
        
        <footer className="mt-4 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>Content is available under public domain. | Privacy policy | About</p>
        </footer>
      </main>
    </div>
  )
}
