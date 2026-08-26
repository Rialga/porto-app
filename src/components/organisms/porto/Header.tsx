'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Heading from '@/components/atoms/Heading'
import Icon from '../../../../public/code-icon-png-0.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="container flex items-center justify-between h-16">
        <Heading level={3} className="text-xl! md:text-2xl!">
          <img src={Icon} alt="Logo" className="w-8 h-8 inline-block mr-2 -mt-1" />
        </Heading>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-accent transition-colors duration-200 text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        {/* <div className="hidden md:block">
          <Button variant="primary" size="sm">
            Get in Touch
          </Button>
        </div> */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* <Button variant="primary" size="md" className="w-full">
              Get in Touch
            </Button> */}
          </div>
        </div>
      )}
    </header>
  )
}
