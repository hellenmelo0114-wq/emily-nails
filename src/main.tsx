import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { site } from './config/site'
import { addressLines, instagramLink } from './lib/links'

// SEO dinâmico a partir da configuração
document.title = site.seo.title
document.querySelector('meta[name="description"]')?.setAttribute('content', site.seo.description)

// Dados estruturados (apenas com informações configuradas)
const ld: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'NailSalon',
  name: site.brand.name,
  description: site.seo.description,
}
if (site.brand.url) ld.url = site.brand.url
if (site.whatsapp.number) ld.telephone = `+${site.whatsapp.number.replace(/\D/g, '')}`
if (site.instagram.handle) ld.sameAs = [instagramLink()]
if (addressLines().length) {
  ld.address = {
    '@type': 'PostalAddress',
    streetAddress: site.location.street,
    addressLocality: site.location.city,
    addressRegion: site.location.state,
    postalCode: site.location.zip,
    addressCountry: 'BR',
  }
}
const script = document.createElement('script')
script.type = 'application/ld+json'
script.text = JSON.stringify(ld)
document.head.appendChild(script)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
