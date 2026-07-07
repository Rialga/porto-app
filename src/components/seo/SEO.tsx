import { useEffect } from 'react'
import { site } from '@/content/site'

interface SEOProps {
  title?: string
  description?: string
  /** Path relative to site.url — defaults to '/'. */
  path?: string
  /** Set false on the home page where the OG image is implicit. */
  ogImage?: string
  /** Optional JSON-LD object merged with the base Person schema. */
  jsonLd?: Record<string, unknown>
}

/**
 * Lightweight SEO component. Mutates <head> directly to avoid pulling
 * in a meta library. Re-runs on every navigation; safe under React 18+
 * strict mode.
 */
export const SEO = ({
  title,
  description,
  path = '/',
  ogImage,
  jsonLd,
}: SEOProps) => {
  useEffect(() => {
    const finalTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role}`
    const finalDesc =
      description ||
      'Senior Frontend Engineer building calm, fast, accessible web products with React, TypeScript and a relentless focus on craft.'
    const finalUrl = `${site.url.replace(/\/$/, '')}/${path.replace(/^\//, '')}`.replace(/\/$/, '') ||
      site.url
    const finalImage = ogImage ?? site.ogImage

    document.title = finalTitle

    setMeta('description', finalDesc)
    setMeta('og:title', finalTitle, true)
    setMeta('og:description', finalDesc, true)
    setMeta('og:url', finalUrl, true)
    setMeta('og:image', finalImage, true)
    setMeta('twitter:title', finalTitle)
    setMeta('twitter:description', finalDesc)
    setMeta('twitter:image', finalImage)

    setLink('canonical', finalUrl)

    // JSON-LD: merge Person schema with any extras.
    const baseJsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      url: site.url,
      jobTitle: site.role,
      sameAs: site.socials.map(s => s.href),
    }
    const merged = jsonLd ? { ...baseJsonLd, ...jsonLd } : baseJsonLd
    let script = document.getElementById('ld-json') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = 'ld-json'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(merged)
  }, [title, description, path, ogImage, jsonLd])

  return null
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name'
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export default SEO