'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const navItems = [
    { href: '/', label: 'blog' },
    { href: '/archive', label: 'archive' },
    { href: '/tags', label: 'tags' },
    { href: '/projects', label: 'projects' },
    { href: 'https://github.com', label: 'github', external: true },
  ]

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Logo and decorative bars as flex-grow filler */}
        <div className="flex items-center gap-3 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="logo bg-primary text-primary-foreground font-bold font-mono text-base sm:text-lg px-4 py-2 leading-none">
              Terminus
            </span>
          </Link>

          {/* Decorative bars - flex-grow filler (desktop only) */}
          <div className="hidden sm:flex items-center flex-1 overflow-hidden whitespace-nowrap leading-none gap-px">
            <span
              className="font-mono text-base sm:text-lg text-primary flex-1"
              style={{
                letterSpacing: '0.1em',
                overflow: 'hidden',
                textOverflow: 'clip',
              }}
            >
              {'|'.repeat(100)}
            </span>
          </div>

          {/* Mobile: Decorative bars and dropdown */}
          {isMobile && (
            <>
              <div className="flex items-center flex-1 overflow-hidden whitespace-nowrap leading-none gap-px">
                <span
                  className="font-mono text-base text-primary flex-1"
                  style={{
                    letterSpacing: '0.1em',
                    overflow: 'hidden',
                    textOverflow: 'clip',
                  }}
                >
                  {'|'.repeat(100)}
                </span>
              </div>

              {/* Dropdown menu for mobile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-muted rounded transition-colors">
                    <Menu className="w-5 h-5 text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={`w-full cursor-pointer ${
                          pathname === item.href && !item.external
                            ? 'bg-primary text-primary-foreground'
                            : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Navigation row (desktop only) */}
        {!isMobile && (
          <nav className="flex gap-4 sm:gap-6 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`text-sm underline transition-colors ${
                  pathname === item.href && !item.external
                    ? 'text-primary font-semibold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
