import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-border bg-muted">
      <div className="mx-auto max-w-4xl px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground no-underline hover:no-underline">
            Free Game Tutorials Wiki
          </Link>
          
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-primary hover:underline">
              Main Page
            </Link>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">
              Discussion
            </span>
          </nav>
        </div>
      </div>
    </header>
  )
}
