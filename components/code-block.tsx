'use client'

import { useState, useMemo } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
}

// Universal syntax highlighter for multiple languages
const highlightCode = (code: string, language: string): JSX.Element[] => {
  const lang = language.toLowerCase()

  // Keywords for different languages
  const keywordPatterns: Record<string, RegExp> = {
    js: /\b(function|const|let|var|return|if|else|for|while|do|import|export|from|default|async|await|class|extends|interface|type|enum|switch|case|break|continue|throw|try|catch|finally|new|this|super|static|private|public|protected|readonly|as|is|of|in|typeof|instanceof|delete|void|null|undefined|true|false)\b/g,
    ts: /\b(function|const|let|var|return|if|else|for|while|do|import|export|from|default|async|await|class|extends|interface|type|enum|switch|case|break|continue|throw|try|catch|finally|new|this|super|static|private|public|protected|readonly|as|is|of|in|typeof|instanceof|delete|void|null|undefined|true|false|namespace|declare|module)\b/g,
    jsx: /\b(function|const|let|var|return|if|else|for|while|do|import|export|from|default|async|await|class|extends|interface|type|enum|switch|case|break|continue|throw|try|catch|finally|new|this|super|static|private|public|protected|readonly|as|is|of|in|typeof|instanceof|delete|void|null|undefined|true|false)\b/g,
    tsx: /\b(function|const|let|var|return|if|else|for|while|do|import|export|from|default|async|await|class|extends|interface|type|enum|switch|case|break|continue|throw|try|catch|finally|new|this|super|static|private|public|protected|readonly|as|is|of|in|typeof|instanceof|delete|void|null|undefined|true|false|namespace|declare|module)\b/g,
    php: /\b(function|const|global|static|return|if|else|elseif|for|foreach|while|do|switch|case|break|continue|throw|try|catch|finally|class|interface|trait|namespace|use|new|public|private|protected|abstract|final|var|echo|print|isset|unset|empty|array|true|false|null|extends|implements|instanceof)\b/g,
    html: /\b(<!DOCTYPE|html|head|body|div|span|p|a|button|input|form|script|style|link|meta|title|class|id|src|href|onclick|onload)\b/g,
    css: /\b(margin|padding|border|color|background|width|height|display|flex|grid|position|absolute|relative|font-size|font-weight|line-height|text-align|justify-content|align-items|transform|transition|animation)\b/g,
    rust: /\b(fn|let|mut|const|static|struct|enum|trait|impl|pub|crate|use|match|if|else|for|while|loop|return|move|async|await|unsafe|extern|type|where|impl|self|Self|super)\b/g,
    go: /\b(func|var|const|type|struct|interface|package|import|if|else|for|range|switch|case|default|defer|go|chan|select|break|continue|return|true|false|nil|iota|error|len|cap|make|new|append|copy|complex|real|imag|panic|recover)\b/g,
    py: /\b(def|class|import|from|as|return|if|elif|else|for|while|in|not|and|or|try|except|finally|with|lambda|async|await|yield|pass|break|continue|raise|assert|del|is|True|False|None|global|nonlocal)\b/g,
    md: /\b(code|pre|title|bold|italic|link|image|header|list|quote)\b/g,
  }

  // Get the correct keyword pattern
  let keywords: RegExp | null = null
  if (['js', 'javascript'].includes(lang)) keywords = keywordPatterns.js
  else if (['ts', 'typescript'].includes(lang)) keywords = keywordPatterns.ts
  else if (['jsx'].includes(lang)) keywords = keywordPatterns.jsx
  else if (['tsx'].includes(lang)) keywords = keywordPatterns.tsx
  else if (['php'].includes(lang)) keywords = keywordPatterns.php
  else if (['html'].includes(lang)) keywords = keywordPatterns.html
  else if (['css'].includes(lang)) keywords = keywordPatterns.css
  else if (['rust', 'rs'].includes(lang)) keywords = keywordPatterns.rust
  else if (['go', 'golang'].includes(lang)) keywords = keywordPatterns.go
  else if (['python', 'py'].includes(lang)) keywords = keywordPatterns.py
  else if (['markdown', 'md'].includes(lang)) keywords = keywordPatterns.md

  // Fallback: if language not supported, return plain text
  if (!keywords) {
    return [<span key="0">{code}</span>]
  }

  // Patterns for strings and comments (universal across languages)
  const strings = /(['"`])((?:(?=(\\?))\3.)*?)\1/g
  const comments =
    lang === 'html'
      ? /<!--[\s\S]*?-->/g
      : lang === 'css'
        ? /\/\*[\s\S]*?\*\//g
        : lang === 'py'
          ? /(#.*?$|'''[\s\S]*?'''|"""[\s\S]*?""")/gm
          : /(\/\/.*?$|\/\*[\s\S]*?\*\/)/gm
  const functions = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g
  const properties = /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g

  // Split by patterns and preserve positions
  const parts: Array<{ type: string; text: string }> = []
  let lastIndex = 0

  // Find all tokens with their types and positions
  const tokens: Array<{ start: number; end: number; type: string }> = []

  // Comments first (highest priority)
  let match
  comments.lastIndex = 0
  while ((match = comments.exec(code)) !== null) {
    tokens.push({ start: match.index, end: match.index + match[0].length, type: 'comment' })
  }

  // Skip comment regions when processing other patterns
  const isInComment = (index: number) => tokens.some(t => t.type === 'comment' && index >= t.start && index < t.end)

  // Strings
  strings.lastIndex = 0
  while ((match = strings.exec(code)) !== null) {
    if (!isInComment(match.index)) {
      tokens.push({ start: match.index, end: match.index + match[0].length, type: 'string' })
    }
  }

  // Keywords
  keywords.lastIndex = 0
  while ((match = keywords.exec(code)) !== null) {
    if (!isInComment(match.index) && !tokens.some(t => match.index >= t.start && match.index < t.end)) {
      tokens.push({ start: match.index, end: match.index + match[0].length, type: 'keyword' })
    }
  }

  // Functions
  functions.lastIndex = 0
  while ((match = functions.exec(code)) !== null) {
    if (!isInComment(match.index) && !tokens.some(t => match.index >= t.start && match.index < t.end)) {
      tokens.push({ start: match.index, end: match.index + match[1].length, type: 'function' })
    }
  }

  // Properties
  properties.lastIndex = 0
  while ((match = properties.exec(code)) !== null) {
    if (!isInComment(match.index) && !tokens.some(t => match.index >= t.start && match.index < t.end)) {
      tokens.push({ start: match.index + 1, end: match.index + match[0].length, type: 'property' })
    }
  }

  // Sort tokens by position
  tokens.sort((a, b) => a.start - b.start)

  // Build result
  lastIndex = 0
  const result: JSX.Element[] = []

  tokens.forEach((token, idx) => {
    // Add text before token
    if (lastIndex < token.start) {
      result.push(<span key={`text-${idx}`}>{code.substring(lastIndex, token.start)}</span>)
    }

    const tokenText = code.substring(token.start, token.end)
    const colorClass =
      token.type === 'keyword' ? 'text-orange-400' :
        token.type === 'string' ? 'text-green-400' :
          token.type === 'function' ? 'text-cyan-400' :
            token.type === 'property' ? 'text-blue-400' :
              token.type === 'comment' ? 'text-slate-500' :
                'text-slate-100'

    result.push(
      <span key={`token-${idx}`} className={colorClass}>
        {tokenText}
      </span>
    )
    lastIndex = token.end
  })

  // Add remaining text
  if (lastIndex < code.length) {
    result.push(<span key="end">{code.substring(lastIndex)}</span>)
  }

  return result.length > 0 ? result : [<span key="0">{code}</span>]
}

export function CodeBlock({ code, language = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const highlightedCode = useMemo(() => highlightCode(code, language), [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div
      className="rounded-lg overflow-hidden my-4"
      style={{ backgroundColor: '#000000' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* macOS-style Header */}
      <div
        className="flex items-center justify-between px-4 py-3 h-12"
        style={{ backgroundColor: '#000000' }}
      >
        {/* Window Control Dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Language Label and Copy Button */}
        <div className="flex items-center gap-3">
          {language && <span className="text-xs font-semibold uppercase" style={{ color: '#888888' }}>{language}</span>}

          <button
            onClick={handleCopy}
            className={`p-1.5 rounded transition-all w-8 h-8 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            style={{
              backgroundColor: copied ? '#16a34a' : '#333333',
              color: copied ? '#ffffff' : '#cccccc',
            }}
            onMouseEnter={(e) => !copied && (e.currentTarget.style.backgroundColor = '#444444')}
            onMouseLeave={(e) => !copied && (e.currentTarget.style.backgroundColor = '#333333')}
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Code */}
      <pre
        className="p-4 overflow-x-auto text-sm font-mono leading-relaxed border-none"
        style={{ backgroundColor: '#000000', color: '#ffffff' }}
      >
        <code className='bg-black'>{highlightedCode}</code>
      </pre>
    </div>
  )
}
