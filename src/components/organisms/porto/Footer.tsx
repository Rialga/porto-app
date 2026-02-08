import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import SocialLink from '@/components/molecules/SocialLink'
import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border/20">
      <div className="container py-12 md:py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div>
            <Heading level={4} className="!text-primary-foreground mb-4">
              MFA
            </Heading>
            <Text size="sm" className="!text-primary-foreground/80">
              Frontend Developer passionate about creating beautiful and functional web experiences.
            </Text>
          </div>

          {/* Quick Links */}
          <div>
            <Heading level={5} className="!text-primary-foreground mb-4">
              Quick Links
            </Heading>
            <ul className="space-y-2">
              {['Home', 'Projects', 'Experience', 'Skills'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <Heading level={5} className="!text-primary-foreground mb-4">
              Connect
            </Heading>
            <div className="flex flex-col gap-3">
              <SocialLink
                type="github"
                href="https://github.com"
                label="GitHub"
              />
              <SocialLink
                type="linkedin"
                href="https://linkedin.com"
                label="LinkedIn"
              />
              <SocialLink
                type="email"
                href="mailto:hello@example.com"
                label="Email"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Text size="sm" className="!text-primary-foreground/70">
            <span className="flex items-center gap-1">
              Made with <Heart size={16} className="text-red-500" /> by Muhamad Febri Algani
            </span>
          </Text>
          <Text size="sm" className="!text-primary-foreground/70">
            © {currentYear} All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
