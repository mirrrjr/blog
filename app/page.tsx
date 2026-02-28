import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { blogPosts } from '@/lib/blog-data'

export default function Page() {
  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <section className="mb-12 border border-border p-6">
          <h1 className="text-2xl font-mono font-bold text-primary mb-4">Hello there! 👋</h1>
          <p className="text-foreground mb-3">
            I'm Mirsoli — a backend-focused developer who enjoys building things on the web and tinkering with Linux.
            My primary stack revolves around{' '}
            <span className="font-mono font-semibold">Laravel & PHP</span> on the server side, and{' '}
            <span className="font-mono font-semibold">React / Next.js</span> on the front.
          </p>
          <p className="text-foreground mb-3">
            When I'm not writing code, I'm probably hopping between Linux distros, customizing my setup,
            or reading about systems I'll never have time to fully explore.
          </p>
          <p className="text-foreground">
            Feel free to look around — check out my{' '}
            <Link href="/archive" className="text-primary hover:text-accent underline">
              blog
            </Link>
            , browse my{' '}
            <Link href="/projects" className="text-primary hover:text-accent underline">
              projects
            </Link>
            , or just say{' '}
            <Link href="mailto:mirrrrjr@gmail.com" className="text-primary hover:text-accent underline">
              hi
            </Link>
            .
          </p>
        </section>

        {/* Featured Post */}
        <section className="mb-12">
          <h2 className="text-xl font-mono font-semibold text-primary mb-6">Latest Post</h2>
          <PostCard post={featuredPost} />
        </section>

        {/* Recent Posts */}
        {otherPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-mono font-semibold text-primary mb-6">More Posts</h2>
            <div className="space-y-6">
              {otherPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Read More Link */}
        <section className="text-center border-t border-b border-border py-8">
          <Link
            href="/archive"
            className="inline-block text-primary hover:text-accent font-mono font-semibold underline"
          >
            Read More Posts {'→'}
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
