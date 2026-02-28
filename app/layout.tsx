import React from "react"
import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Terminus | Developer Blog',
  description: 'A minimal developer blog with a terminal-inspired aesthetic. Thoughts on code, math, and technology.',
  generator: 'Next.js',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export const viewport: Viewport = {
  themeColor: '#d4623b',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
