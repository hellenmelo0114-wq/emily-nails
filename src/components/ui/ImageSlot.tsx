import { useId } from 'react'
import type { Photo } from '../../config/site'

/**
 * Exibe a fotografia configurada. Se não houver `src`,
 * mostra uma arte provisória elegante, claramente identificada.
 */
type Props = {
  photo: Photo
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  showLabel?: boolean
  width?: number
  height?: number
}

export function ImageSlot({
  photo,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
  showLabel = true,
  width = 1200,
  height = 1500,
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-nude ${className}`}>
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <>
          <NailArt tone={photo.tone ?? 0} label={photo.alt} className={imgClassName} />
          {showLabel && (
            <span
              className={`eyebrow pointer-events-none absolute bottom-3 left-3 !text-[0.5625rem] !tracking-[0.22em] ${
                isDark(photo.tone ?? 0) ? 'text-ivory/70' : 'text-espresso/55'
              }`}
            >
              Imagem ilustrativa
            </span>
          )}
        </>
      )}
    </div>
  )
}

const TONES = [
  { bg: ['#efe5db', '#dcc6b8'], nails: ['#e7cfc2', '#d8b7a6', '#efdcd2', '#caa595', '#e2c4b5'], ring: '#c2a477' },
  { bg: ['#d8c2b5', '#a88775'], nails: ['#b48473', '#c99a88', '#9e7262', '#d6b0a0', '#a97b6a'], ring: '#f4ede5' },
  { bg: ['#3a322f', '#292321'], nails: ['#d8c2b5', '#c9a99a', '#e8d6cb', '#b89282', '#dcc3b6'], ring: '#c2a477' },
  { bg: ['#f2e9e0', '#e3d2c6'], nails: ['#f1ddd3', '#ead2c6', '#f4e4db', '#e5c9bc', '#efd8cd'], ring: '#c2a477', french: true },
  { bg: ['#a88775', '#7e6252'], nails: ['#3b2f2b', '#4a3a35', '#2f2623', '#54423c', '#3f322e'], ring: '#c2a477', gold: true },
  { bg: ['#ebe0d6', '#d8c2b5'], nails: ['#f7efe9', '#f2e6dd', '#faf4ef', '#eedfd5', '#f5ebe3'], ring: '#a88775' },
]

const isDark = (t: number) => t === 2 || t === 4

function NailArt({ tone, label, className = '' }: { tone: number; label: string; className?: string }) {
  const id = useId().replace(/:/g, '')
  const t = TONES[((tone % TONES.length) + TONES.length) % TONES.length]
  // Cinco unhas amendoadas, alturas e inclinações variadas
  const nails = [
    { x: 92, y: 380, h: 1.0, r: -9 },
    { x: 152, y: 336, h: 1.12, r: -4 },
    { x: 212, y: 316, h: 1.2, r: 0 },
    { x: 272, y: 334, h: 1.12, r: 4 },
    { x: 330, y: 382, h: 0.92, r: 9 },
  ]
  const almond = 'M-24 0 L-24 -88 C-24 -120 -10 -140 0 -140 C10 -140 24 -120 24 -88 L24 0 Z'

  return (
    <svg
      viewBox="0 0 420 520"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${label} (imagem ilustrativa provisória)`}
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={t.bg[0]} />
          <stop offset="1" stopColor={t.bg[1]} />
        </linearGradient>
        <radialGradient id={`glow${id}`} cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity={isDark(tone) ? 0.08 : 0.35} />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gloss${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`shade${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <clipPath id={`nail${id}`}>
          <path d={almond} />
        </clipPath>
      </defs>

      <rect width="420" height="520" fill={`url(#bg${id})`} />
      <circle cx="210" cy="230" r="210" fill={`url(#glow${id})`} />
      <circle cx="210" cy="250" r="150" fill="none" stroke={t.ring} strokeOpacity="0.45" strokeWidth="0.75" />

      {nails.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y}) rotate(${n.r}) scale(${n.h})`}>
          <path d={almond} transform="translate(3 6)" fill="#000" opacity="0.07" />
          <g clipPath={`url(#nail${id})`}>
            <rect x="-30" y="-150" width="60" height="160" fill={t.nails[i]} />
            {t.french && <path d="M-30 -96 Q0 -78 30 -96 L30 -150 L-30 -150 Z" fill="#fbf7f3" />}
            {t.gold && i % 2 === 0 && (
              <line x1="-24" y1="-60" x2="24" y2="-60" stroke="#c2a477" strokeWidth="1.4" />
            )}
            <rect x="-30" y="-150" width="60" height="160" fill={`url(#shade${id})`} />
            <rect x="-15" y="-128" width="12" height="104" rx="6" fill={`url(#gloss${id})`} opacity="0.8" />
          </g>
        </g>
      ))}
    </svg>
  )
}
