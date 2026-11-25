import type { CSSProperties, ReactNode } from 'react'
import { site } from '../../config/site'

/** Selo discreto para conteúdo provisório. Só aparece com draftMode = true. */
export function DraftBadge({ children = 'Conteúdo provisório', tone = 'light' }: { children?: ReactNode; tone?: 'light' | 'dark' }) {
  if (!site.draftMode) return null
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] border border-dashed px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.16em] ${
        tone === 'dark' ? 'border-ivory/35 text-ivory/70' : 'border-rose-deep/40 text-rose-deep'
      }`}
    >
      {children}
    </span>
  )
}

/** Valor ausente: mostra "A definir" no modo rascunho, ou nada. */
export function Pending({ label = 'A definir', tone = 'light' }: { label?: string; tone?: 'light' | 'dark' }) {
  if (!site.draftMode) return null
  return <span className={`italic ${tone === 'dark' ? 'text-ivory/50' : 'text-muted/80'}`}>{label}</span>
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'fade' | 'scale'
  as?: 'div' | 'li' | 'span' | 'figure' | 'article'
}

/** Envolve elementos que surgem suavemente ao entrar na tela. */
export function Reveal({ children, className = '', delay = 0, variant = 'up', as: Tag = 'div' }: RevealProps) {
  return (
    <Tag
      data-reveal={variant === 'up' ? '' : variant}
      className={className}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

/** Cabeçalho de seção: rótulo numerado + título editorial. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  tone = 'light',
  align = 'left',
  badge,
  className = '',
}: {
  index: string
  eyebrow: string
  title: string
  accent?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  badge?: ReactNode
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      <Reveal className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className={`eyebrow ${dark ? 'text-gold' : 'text-rose-deep'}`}>
          {index} <span className="mx-2 inline-block h-px w-8 translate-y-[-3px] bg-current align-middle opacity-60" /> {eyebrow}
        </span>
        {badge}
      </Reveal>
      <Reveal delay={100}>
        <h2 className={`mt-6 text-[2.5rem] sm:text-5xl lg:text-[4rem] ${dark ? 'text-ivory' : 'text-espresso'}`}>
          {title} {accent && <em className={`font-light ${dark ? 'text-nude' : 'text-rose'}`}>{accent}</em>}
        </h2>
      </Reveal>
    </div>
  )
}
