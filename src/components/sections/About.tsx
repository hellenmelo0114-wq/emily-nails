import { site } from '../../config/site'
import { ImageSlot } from '../ui/ImageSlot'
import { DraftBadge, Reveal, SectionHeading } from '../ui/Primitives'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']
const isPlaceholderText = (t: string) => t.trim().startsWith('[')

export function About() {
  const { about } = site
  return (
    <section id="sobre" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-12">
        {/* Retrato */}
        <div className="relative lg:col-span-5">
          <Reveal variant="fade" className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="absolute -right-4 -top-4 bottom-12 left-8 rounded-t-full border border-gold/60 sm:-right-6 sm:-top-6" aria-hidden />
            <ImageSlot
              photo={about.photo}
              className="relative aspect-[4/5] rounded-t-full"
              sizes="(min-width: 1024px) 40vw, 90vw"
              imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-luxe)] hover:scale-[1.03]"
            />
            <p className="eyebrow mt-5 text-muted">
              {site.brand.name} <span className="mx-2 text-gold">·</span> {site.brand.role}
            </p>
          </Reveal>
        </div>

        {/* Texto */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <SectionHeading
            index="01"
            eyebrow="Sobre a Emily"
            title={about.title.replace(/ em cada detalhe\.$/, '')}
            accent={about.title.endsWith(' em cada detalhe.') ? 'em cada detalhe.' : undefined}
            badge={about.provisional ? <DraftBadge>Textos provisórios</DraftBadge> : undefined}
          />

          <div className="mt-10 space-y-5 text-[1.02rem] leading-[1.85]">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={150 + i * 80}>
                <p className={isPlaceholderText(p) ? 'border-l border-dashed border-rose/50 pl-4 italic text-muted' : 'text-espresso/85'}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <p className="mt-10 font-display text-5xl font-light italic text-rose" aria-label={`Assinatura: ${about.signature}`}>
              {about.signature}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {about.highlights.map((h, i) => (
              <Reveal as="li" key={i} delay={i * 90} className="border-t border-espresso/15 pt-5">
                <span className="font-display text-lg italic text-gold">{ROMAN[i]}.</span>
                <h3 className={`mt-2 font-sans text-[0.95rem] font-medium tracking-wide ${isPlaceholderText(h.title) ? 'text-muted' : ''}`}>
                  {h.title}
                </h3>
                <p className={`mt-1.5 text-sm leading-relaxed text-muted ${isPlaceholderText(h.text) ? 'italic' : ''}`}>{h.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
