import { motion } from 'framer-motion'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import SocialLink from '@/components/molecules/SocialLink'
import { EASE_OUT_EXPO } from '@/lib/scrollytelling'

const CTA_WORDS = ['LET\'S', 'TALK']

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border/20">
      {/* CTA */}
      <div className="container py-16 md:py-20 text-center">
        <p className="text-[16vw] md:text-[12vw] lg:text-[10rem] font-bold leading-none tracking-tight mb-8">
          {CTA_WORDS.map((word, wi) => (
            <span key={`${word}-${wi}`} className="inline-block overflow-hidden align-bottom mr-4">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.8,
                  ease: EASE_OUT_EXPO,
                  delay: wi * 0.15,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        <motion.a
          href="mailto:febrialganios@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.4 }}
          className="inline-block px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold hover:scale-105 transition-transform duration-300"
        >
          febrialganios@gmail.com →
        </motion.a>
      </div>

      {/* Footer content */}
      <div className="container pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          <div>
            <Heading level={4} className="!text-primary-foreground mb-3">
              Muhamad Febri Algani
            </Heading>
            <Text size="sm" className="!text-primary-foreground/80">
              Frontend Developer passionate about creating beautiful and functional web experiences.
            </Text>
          </div>

          <div>
            <Heading level={5} className="!text-primary-foreground mb-3">
              Quick Links
            </Heading>
            <ul className="space-y-2">
              {['Home', 'Projects', 'Experience', 'Skills'].map(link => (
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

          <div>
            <Heading level={5} className="!text-primary-foreground mb-3">
              Connect
            </Heading>
            <div className="flex flex-col gap-3">
              <SocialLink type="github" href="https://github.com/Rialga/" label="GitHub" />
              <SocialLink
                type="linkedin"
                href="https://www.linkedin.com/in/muhamad-febri-algani-311533205/"
                label="LinkedIn"
              />
              <SocialLink type="email" href="mailto:febrialganios@gmail.com" label="Email" />
            </div>
          </div>
        </motion.div>

        <div className="h-px bg-primary-foreground/10 mb-6" />
        <Text size="sm" className="text-primary-foreground/70 text-center md:text-left">
          © {currentYear} All rights reserved.
        </Text>
      </div>
    </footer>
  )
}