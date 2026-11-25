import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import { site } from '../../config/site'
import { instagramLink, whatsappLink } from '../../lib/links'
import { ImageSlot } from '../ui/ImageSlot'
import { DraftBadge, Reveal, SectionHeading } from '../ui/Primitives'

const RATIO = {
  tall: 'aspect-[3/5]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[5/4]',
} as const

type Item = (typeof site.gallery)[number]

export function Gallery() {
  const items = site.gallery
  const [index, setIndex] = useState<number | null>(null)
  const hasPlaceholders = items.some((g) => !g.src)

  return (
    <section id="portfolio" className="bg-espresso py-24 text-ivory sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-12">
        <div className="grid gap-8 px-2 sm:px-0 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            tone="dark"
            index="03"
            eyebrow="Portfólio"
            title="Cada mão,"
            accent="uma assinatura."
            badge={hasPlaceholders ? <DraftBadge tone="dark">Imagens ilustrativas</DraftBadge> : undefined}
          />
          <Reveal delay={200} className="lg:col-span-4 lg:col-start-9">
            <p className="text-ivory/70">
              Uma seleção de trabalhos para inspirar o seu próximo momento de cuidado. Toque em uma foto para ver em detalhes.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 columns-2 gap-3 sm:gap-5 lg:mt-20 lg:columns-3 lg:gap-6">
          {items.map((g, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 100} className="mb-3 break-inside-avoid sm:mb-5 lg:mb-6">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden text-left"
                aria-label={`Ampliar foto ${i + 1}: ${g.alt}`}
              >
                <ImageSlot
                  photo={g}
                  className={RATIO[g.ratio]}
                  sizes="(min-width: 1024px) 31vw, 48vw"
                  imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-espresso/0 transition-colors duration-700 group-hover:bg-espresso/25" />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ivory/90 text-espresso opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0">
                  <Plus size={16} strokeWidth={1.4} />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-light w-full sm:w-auto">
            Quero um resultado assim
          </a>
          <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light w-full sm:w-auto">
            Ver mais no Instagram
          </a>
        </Reveal>
      </div>

      {index !== null && <Lightbox items={items} index={index} onChange={setIndex} onClose={() => setIndex(null)} />}
    </section>
  )
}

function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: {
  items: Item[]
  index: number
  onChange: (i: number) => void
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const item = items[index]
  const go = useCallback((dir: number) => onChange((index + dir + items.length) % items.length), [index, items.length, onChange])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      previous?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada da galeria"
      className="anim-rise fixed inset-0 z-[70] flex flex-col bg-espresso/[0.97] text-ivory backdrop-blur-sm"
      style={{ animationDuration: '0.5s' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="eyebrow text-ivory/60" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span className="text-gold">/</span> {String(items.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} className="-mr-2 grid h-11 w-11 place-items-center" aria-label="Fechar">
          <X size={24} strokeWidth={1.2} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <figure key={index} className="anim-rise flex max-h-full max-w-full flex-col items-center" style={{ animationDuration: '0.7s' }}>
          {item.src ? (
            <img src={item.src} alt={item.alt} className="max-h-[78svh] max-w-full object-contain" />
          ) : (
            <ImageSlot photo={item} className={`${RATIO[item.ratio]} h-auto max-h-[78svh] w-[min(88vw,calc(78svh*0.8))]`} />
          )}
          <figcaption className="mt-4 text-center text-sm text-ivory/60">{item.alt}</figcaption>
        </figure>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-espresso sm:grid lg:left-8"
        >
          <ChevronLeft size={20} strokeWidth={1.2} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próxima foto"
          className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-espresso sm:grid lg:right-8"
        >
          <ChevronRight size={20} strokeWidth={1.2} />
        </button>
      </div>

      <div className="flex justify-center gap-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:hidden">
        <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25">
          <ChevronLeft size={20} strokeWidth={1.2} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="grid h-12 w-12 place-items-center rounded-full border border-ivory/25">
          <ChevronRight size={20} strokeWidth={1.2} />
        </button>
      </div>
    </div>
  )
}
