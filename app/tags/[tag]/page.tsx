import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { blogPosts } from '@/lib/blog-data'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).map((tag) => ({
    tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params

  return {
    title: `#${tag} | Terminus`,
    description: `Posts tagged with ${tag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const postsWithTag = blogPosts.filter((post) => post.tags.includes(tag))

  const sortedPosts = postsWithTag.sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/tags" className="text-primary hover:text-accent underline text-sm">
            ← Back to Tags
          </Link>
        </div>

        <h1 className="text-3xl font-mono font-bold text-primary mb-2">
          #{tag}
        </h1>
        <p className="text-muted-foreground mb-12">
          {sortedPosts.length} post{sortedPosts.length !== 1 ? 's' : ''}
        </p>

        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts with this tag.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
