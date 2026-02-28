import fs from 'fs'
import path from 'path'

export interface BlogPost {
  id: string
  title: string
  date: Date
  author: string
  readingTime: number
  tags: string[]
  excerpt: string
  content: string
}

function loadPostsFromMarkdown(): BlogPost[] {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts')

    // Agar papka bo'lmasa bo'sh array qaytarish
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))

    return files.map(file => {
      const fullPath = path.join(postsDirectory, file)
      const content = fs.readFileSync(fullPath, 'utf-8')

      // Front matter parsing (YAML format)
      const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
      const match = content.match(frontMatterRegex)

      if (!match) {
        throw new Error(`${file} da front matter mavjud emas`)
      }

      const [, frontMatterStr, postContent] = match
      const frontMatter = parseFrontMatter(frontMatterStr)

      return {
        id: frontMatter.id || file.replace('.md', ''),
        title: frontMatter.title || 'Sarlavha yo\'q',
        date: new Date(frontMatter.date || new Date()),
        author: frontMatter.author || 'Noma\'lum',
        readingTime: frontMatter.readingTime || Math.ceil(postContent.split(' ').length / 200),
        tags: frontMatter.tags || [],
        excerpt: frontMatter.excerpt || postContent.substring(0, 150),
        content: postContent.trim(),
      }
    }).sort((a, b) => b.date.getTime() - a.date.getTime())
  } catch (error) {
    console.error('Postlarni yuklashda xato:', error)
    return []
  }
}

function parseFrontMatter(str: string): Record<string, any> {
  const result: Record<string, any> = {}
  const lines = str.split('\n')

  for (const line of lines) {
    if (!line.trim()) continue

    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()

    if (key.trim() === 'tags') {
      result.tags = value
        .replace(/[\[\]]/g, '')
        .split(',')
        .map(t => t.trim())
    } else if (key.trim() === 'readingTime') {
      result.readingTime = parseInt(value)
    } else {
      result[key.trim()] = value
    }
  }

  return result
}

// Markdown fayllardan va statik postlardan postlarni birlash
const markdownPosts = loadPostsFromMarkdown()

export const blogPosts: BlogPost[] = [
  ...markdownPosts,
  //   {
  //     id: 'math-typesetting',
  //     title: 'Math Typesetting',
  //     date: new Date('2025-12-23'),
  //     author: 'Eyal Kalderon',
  //     readingTime: 1,
  //     tags: ['showcase', 'markdown', 'katex'],
  //     excerpt: 'Learn how to render beautiful mathematical formulas on your site with KaTeX.',
  //     content: `# Math Typesetting

  // Terminus supports KaTeX, a fast, easy-to-use JavaScript library for TeX math rendering on the Web.

  // ## Inline Math

  // You can write inline math like this: $E = mc^2$.

  // ## Display Math

  // For larger equations:

  // $$\\displaystyle f(q) = 1 + \\frac{q^2}{(1-q)} + \\frac{q^6}{(1-q)(1-q^2)} + \\cdots = \\prod_{j=0}^{\\infty} \\frac{1}{(1-q^{j+2})(1-q^{5j+3})}$$

  // for $|q| < 1$.

  // ## Code Block Example

  // \`\`\`javascript
  // // Example code block
  // const greet = (name) => {
  //   return \`Hello, \${name}!\`;
  // };
  // \`\`\`

  // ## Callouts

  // > **TODO**
  // > Will elaborate more later...`,
  //   },
  //   {
  //     id: 'terminal-design',
  //     title: 'Terminal Design Principles',
  //     date: new Date('2025-12-15'),
  //     author: 'Eyal Kalderon',
  //     readingTime: 5,
  //     tags: ['design', 'ui', 'terminal'],
  //     excerpt: 'Exploring the principles behind terminal-inspired web design and why minimalism matters.',
  //     content: `# Terminal Design Principles

  // Terminal interfaces have a timeless appeal in the developer community.

  // ## Why Terminal?

  // - **Readability**: Monospace fonts and high contrast backgrounds ensure clarity
  // - **Minimalism**: Focus on content without unnecessary visual noise
  // - **Efficiency**: Clean navigation and quick scanning of information
  // - **Authenticity**: Connects to developer values and tools

  // ## Color Palette

  // Our dark theme uses warm accents to create visual interest while maintaining readability.

  // \`\`\`css
  // --background: hsl(13 8% 8%);
  // --primary: hsl(34 89% 52%);
  // --foreground: hsl(40 100% 95%);
  // \`\`\``,
  //   },
  //   {
  //     id: 'getting-started',
  //     title: 'Getting Started with Terminus',
  //     date: new Date('2025-12-08'),
  //     author: 'Eyal Kalderon',
  //     readingTime: 3,
  //     tags: ['guide', 'tutorial'],
  //     excerpt: 'Your guide to setting up and customizing the Terminus blog theme.',
  //     content: `# Getting Started with Terminus

  // Welcome to Terminus, a minimal developer blog theme with a terminal-inspired aesthetic.

  // ## Installation

  // Clone the repository and install dependencies:

  // \`\`\`bash
  // git clone https://github.com/yourusername/terminus.git
  // cd terminus
  // pnpm install
  // \`\`\`

  // ## Customization

  // Edit your blog posts in the \`lib/blog-data.ts\` file to get started.

  // ## Features

  // - Fast, minimal design
  // - Responsive on all devices
  // - Math support with KaTeX
  // - Code highlighting
  // - Tag-based organization`,
  //   },
].sort((a, b) => b.date.getTime() - a.date.getTime())
