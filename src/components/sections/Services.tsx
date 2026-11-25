import { ArrowUpRight, Clock } from 'lucide-react'
import { site } from '../../config/site'
import { activeServices, whatsappLink } from '../../lib/links'
import { ImageSlot } from '../ui/ImageSlot'
import { DraftBadge, Reveal, SectionHeading } from '../ui/Primitives'

export function Services() {
  const services = activeServices()
  const anyUnconfirmed = services.some((s) => !s.confirmed || s.price === null)

  return (
    <section id="servicos" className="bg-ivory-deep py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            index="02"
            eyebrow="Serviços"
            title="Procedimentos pensados"
            accent="para você."
            badge={anyUnconfirmed ? <DraftBadge>Serviços e valores a confirmar</DraftBadge> : undefined}
          />
          <Reveal delay={200} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted">
              Conheça os procedimentos e escolha o cuidado ideal para as suas mãos. Toque em “Agendar” e a mensagem já segue com o serviço escolhido.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:mt-20 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 4) * 90}>
              <article className="group grid h-full grid-cols-[6.5rem_1fr] gap-5 border-b border-espresso/10 pb-5 sm:flex sm:flex-col sm:gap-0 sm:border-0 sm:pb-0">
                <div className="relative overflow-hidden">
                  <ImageSlot
                    photo={s.photo}
                    showLabel={false}
                    className="aspect-[4/5]"
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 30vw"
                    imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
                  />
                  <span className="eyebrow absolute left-3 top-3 hidden bg-ivory/85 px-2 py-1 !text-[0.625rem] text-espresso backdrop-blur-sm sm:block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-1 flex-col sm:pt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow !text-[0.625rem] text-rose-deep sm:hidden">{String(i + 1).padStart(2, '0')}</span>
                    {!s.confirmed && <DraftBadge>A confirmar</DraftBadge>}
                  </div>
                  <h3 className="mt-1.5 text-[1.6rem] leading-tight sm:mt-3 sm:text-[1.85rem]">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:mb-6 sm:mt-3">{s.description}</p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-espresso/15 sm:mt-auto sm:border-t sm:pt-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-display text-xl">{s.price ?? <span className="text-base italic text-muted">Consulte valores</span>}</span>
                      {s.duration && (
                        <span className="flex items-center gap-1.5 text-xs text-muted">
                          <Clock size={13} strokeWidth={1.4} aria-hidden /> {s.duration}
                        </span>
                      )}
                    </div>
                    <a
                      href={whatsappLink(s.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow flex items-center gap-1.5 py-2 !text-[0.6875rem] text-espresso"
                      aria-label={`Agendar ${s.name} pelo WhatsApp`}
                    >
                      <span className="link-line pb-0.5">Agendar</span>
                      <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {site.draftMode && (
          <p className="mt-12 text-xs text-muted">
            Lista inicial editável: confirme os procedimentos oferecidos, preços e durações em <code>src/config/site.ts</code>.
          </p>
        )}
      </div>
    </section>
  )
}
