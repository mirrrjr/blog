'use client'

import { useMemo, useEffect } from 'react'
import Image from 'next/image'
import { CodeBlock } from './code-block'

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>
    }
  }
}

interface MarkdownRendererProps {
  content: string
}

interface ParsedContent {
  html: string
  codeBlocks: Array<{ code: string; language: string }>
  images: Array<{ src: string; alt: string }>
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parsed = useMemo<ParsedContent>(() => {
    let result = content
    const codeBlocks: Array<{ code: string; language: string }> = []
    const images: Array<{ src: string; alt: string }> = []

    // -------------------------
    // 1️⃣ Code blocks (extract first)
    // -------------------------
    result = result.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const trimmedCode = code.trim()
      codeBlocks.push({
        code: trimmedCode,
        language: lang || 'code',
      })
      return `__CODE_${codeBlocks.length - 1}__`
    })

    // -------------------------
    // 2️⃣ Images (before links)
    // -------------------------
    result = result.replace(/!\[(.*?)\]\((.*?)\)/g, (_, alt, src) => {
      images.push({ alt, src })
      return `__IMAGE_${images.length - 1}__`
    })

    // -------------------------
    // 3️⃣ Headers
    // -------------------------
    result = result.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold font-mono text-primary mt-6 mb-3">$1</h3>')
    result = result.replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-semibold font-mono text-primary mt-8 mb-4">$1</h2>')
    result = result.replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-semibold font-mono text-primary mt-8 mb-4">$1</h1>')

    // -------------------------
    // 4️⃣ Lists
    // -------------------------
    result = result.replace(/^\s*-\s+(.*)$/gm, '<li>$1</li>')
    result = result.replace(/(<li>.*<\/li>)/g, '<ul class="list-disc ml-6 my-4">$1</ul>')

    result = result.replace(/^\s*\d+\.\s+(.*)$/gm, '<li>$1</li>')
    result = result.replace(/(<li>.*<\/li>)/g, '<ol class="list-decimal ml-6 my-4">$1</ol>')

    // -------------------------
    // 5️⃣ Bold / Italic
    // -------------------------
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
    result = result.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

    // -------------------------
    // 6️⃣ Inline code
    // -------------------------
    result = result.replace(/`([^`]+)`/g, '<code class="bg-secondary px-2 py-1 rounded text-sm font-mono text-primary">$1</code>')

    // -------------------------
    // 7️⃣ Blockquotes
    // -------------------------
    result = result.replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>')

    // -------------------------
    // 8️⃣ Links
    // -------------------------
    result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:text-accent underline">$1</a>')

    // -------------------------
    // 9️⃣ Paragraph handling
    // -------------------------
    result = result.replace(/\n{2,}/g, '</p><p class="my-4">')
    result = `<p class="my-4">${result}</p>`

    // cleanup
    result = result.replace(/<p class="my-4"><\/p>/g, '')
    result = result.replace(/<p class="my-4">(<h[1-3]|<ul|<ol|<blockquote)/g, '$1')
    result = result.replace(/(<\/h[1-3]>|<\/ul>|<\/ol>|<\/blockquote>)<\/p>/g, '$1')
    result = result.replace(/<p class="my-4">(__CODE_|__IMAGE_)/g, '$1')
    result = result.replace(/(__CODE_\d+__|__IMAGE_\d+__)<\/p>/g, '$1')

    return { html: result, codeBlocks, images }
  }, [content])

  useEffect(() => {
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise().catch(() => { })
    }
  }, [parsed])

  return (
    <div className="prose prose-invert max-w-none">
      {parsed.html.split(/__(CODE|IMAGE)_(\d+)__/).map((segment, index, arr) => {
        if (index % 3 === 0) {
          return segment ? (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: segment }}
            />
          ) : null
        }

        const type = segment
        const itemIndex = parseInt(arr[index + 1])

        if (type === 'CODE') {
          const block = parsed.codeBlocks[itemIndex]
          return block ? (
            <CodeBlock
              key={`code-${itemIndex}`}
              code={block.code}
              language={block.language}
            />
          ) : null
        }

        if (type === 'IMAGE') {
          const img = parsed.images[itemIndex]
          return img ? (
            <div key={`img-${itemIndex}`} className="my-6">
              <Image
                src={img.src}
                alt={img.alt}
                width={900}
                height={500}
                className="rounded-xl"
              />
            </div>
          ) : null
        }

        return null
      })}
    </div>
  )
}