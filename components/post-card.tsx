import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-data'

interface PostCardProps {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(post.date)

  return (
    <article className="border border-border p-6 hover:bg-card transition-colors">
      <Link href={`/blog/${post.id}`} className="group">
        <h2 className="text-xl font-semibold font-mono text-primary group-hover:text-accent transition-colors mb-2">
          {post.title}
        </h2>
      </Link>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
        <span>{formattedDate}</span>
        <span>·</span>
        <span>{post.readingTime} min read</span>
      </div>

      <p className="text-foreground mb-4">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="inline-block px-2 py-1 text-xs bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  )
}
