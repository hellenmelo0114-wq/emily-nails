import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
})

/** Ícone do Instagram em traço fino, consistente com o Lucide. */
export function InstagramIcon({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Ícone do WhatsApp em traço fino. */
export function WhatsAppIcon({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9.2 8.2c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.4-1.4.6-2.2.4-2.6-.7-4.6-2.7-5.3-5.3-.2-.8 0-1.6.4-2.2z" />
    </svg>
  )
}

/** Pequeno losango decorativo (separador). */
export function Diamond({ className = '' }: { className?: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className={className} aria-hidden>
      <path d="M4 0L8 4L4 8L0 4Z" fill="currentColor" />
    </svg>
  )
}
