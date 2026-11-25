import { site } from '../config/site'

/** Link do WhatsApp com mensagem inicial (opcionalmente com o serviço escolhido). */
export function whatsappLink(serviceName?: string): string {
  const { number, defaultMessage, serviceMessage } = site.whatsapp
  const text = serviceName ? serviceMessage.replace('{servico}', serviceName.toLowerCase()) : defaultMessage
  const digits = number.replace(/\D/g, '')
  if (!digits && import.meta.env.DEV) {
    console.warn('[Emily Nails] Configure site.whatsapp.number em src/config/site.ts')
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function instagramLink(): string {
  const handle = site.instagram.handle.replace(/^@/, '')
  return handle ? `https://www.instagram.com/${handle}/` : 'https://www.instagram.com/'
}

export function instagramHandle(): string {
  const handle = site.instagram.handle.replace(/^@/, '')
  return handle ? `@${handle}` : ''
}

export function addressLines(): string[] {
  const l = site.location
  const line1 = [l.street, l.neighborhood].filter(Boolean).join(' — ')
  const line2 = [[l.city, l.state].filter(Boolean).join(' / '), l.zip].filter(Boolean).join(' · ')
  return [line1, line2].filter(Boolean)
}

function mapsQuery(): string {
  return site.location.mapsQuery || addressLines().join(', ')
}

export function hasAddress(): boolean {
  return Boolean(mapsQuery())
}

export function mapsLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery())}`
}

/** Mapa incorporado sem necessidade de chave de API. */
export function mapsEmbed(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery())}&output=embed`
}

export const activeServices = () => site.services.filter((s) => s.active)
