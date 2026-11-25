import { site } from '../../config/site'
import { DraftBadge, Reveal, SectionHeading } from '../ui/Primitives'

export function Testimonials() {
  const list = site.testimonials
  if (!list.length) return null
  const hasDemo = list.some((t) => t.demo)

  return (
    <section id="depoimentos" className="overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <SectionHeading
          align="center"
          index="04"
          eyebrow="Depoimentos"
          title="Experiências que"
          accent="encantam."
          badge={hasDemo ? <DraftBadge>Exemplos — substituir por avaliações reais</DraftBadge> : undefined}
        />
      </div>

      <ul className="no-scrollbar mx-auto mt-14 flex max-w-[1400px] snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:px-10 lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-12">
        {list.map((t, i) => (
          <Reveal
            as="li"
            key={i}
            delay={i * 120}
            className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto"
          >
            <figure
              className={`relative flex h-full flex-col border border-espresso/10 bg-ivory p-8 transition-[border-color,transform] duration-700 hover:-translate-y-1 hover:border-gold/60 sm:p-10 ${
                i === 1 ? 'lg:translate-y-10 lg:hover:translate-y-9' : ''
              }`}
            >
              {t.demo && (
                <span className="eyebrow absolute right-5 top-5 !text-[0.5625rem] text-rose-deep">Exemplo</span>
              )}
              <span className="font-display text-7xl leading-none text-gold" aria-hidden>
                “
              </span>
              <blockquote className={`-mt-4 flex-1 font-display text-[1.45rem] font-light leading-snug sm:text-[1.6rem] ${t.demo ? 'italic text-muted' : 'text-espresso'}`}>
                {t.text}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-espresso/10 pt-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-nude font-display text-lg italic" aria-hidden>
                  {t.demo ? '—' : t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium">{t.name}</span>
                  {t.service && <span className="eyebrow mt-1 block !text-[0.625rem] text-muted">{t.service}</span>}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
