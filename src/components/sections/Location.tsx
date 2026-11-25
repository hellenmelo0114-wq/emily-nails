import { Clock, MapPin, Navigation } from 'lucide-react'
import { site } from '../../config/site'
import { addressLines, hasAddress, mapsEmbed, mapsLink, whatsappLink } from '../../lib/links'
import { DraftBadge, Pending, Reveal, SectionHeading } from '../ui/Primitives'

export function Location() {
  const lines = addressLines()
  const withAddress = hasAddress()
  const hours = site.hours
  const missingHours = hours.some((h) => !h.hours)

  return (
    <section id="localizacao" className="bg-nude/45 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index="07"
            eyebrow="Localização"
            title="Um espaço pensado"
            accent="para você."
            badge={!withAddress || missingHours ? <DraftBadge>Dados a definir</DraftBadge> : undefined}
          />

          <dl className="mt-12 space-y-10">
            <Reveal delay={100}>
              <dt className="eyebrow flex items-center gap-2 text-rose-deep">
                <MapPin size={14} strokeWidth={1.4} aria-hidden /> Endereço
              </dt>
              <dd className="mt-3 font-display text-2xl leading-snug">
                {lines.length ? lines.map((l) => <span key={l} className="block">{l}</span>) : <Pending label="Endereço a definir" />}
                {site.location.note && <span className="mt-2 block font-sans text-sm text-muted">{site.location.note}</span>}
              </dd>
            </Reveal>

            <Reveal delay={180}>
              <dt className="eyebrow flex items-center gap-2 text-rose-deep">
                <Clock size={14} strokeWidth={1.4} aria-hidden /> Funcionamento
              </dt>
              <dd className="mt-3">
                <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
                  {hours
                    .filter((h) => h.hours || site.draftMode)
                    .map((h) => (
                      <li key={h.days} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                        <span>{h.days}</span>
                        <span className="text-right font-medium">{h.hours || <Pending />}</span>
                      </li>
                    ))}
                </ul>
              </dd>
            </Reveal>
          </dl>

          <Reveal delay={260} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={mapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-dark w-full sm:w-auto ${withAddress ? '' : 'pointer-events-none opacity-40'}`}
              aria-disabled={!withAddress}
              tabIndex={withAddress ? undefined : -1}
            >
              <Navigation size={15} strokeWidth={1.4} /> Abrir no Google Maps
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full sm:w-auto">
              Agendar visita
            </a>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={150} className="lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            {withAddress ? (
              <iframe
                title={`Mapa — ${site.brand.name}`}
                src={mapsEmbed()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.7] sepia-[0.15] contrast-[0.95]"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center p-8 text-center">
                <MapPlaceholderArt />
                <div className="relative">
                  <MapPin size={28} strokeWidth={1} className="mx-auto text-rose" aria-hidden />
                  <p className="mt-4 font-display text-2xl italic">O mapa aparecerá aqui</p>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-muted">Preencha o endereço em <code>site.location</code> para exibir o mapa incorporado.</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MapPlaceholderArt() {
  return (
    <svg className="absolute inset-0 h-full w-full text-espresso/10" aria-hidden preserveAspectRatio="none" viewBox="0 0 400 400">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1="0" x2="400" y1={i * 50} y2={i * 50 + 20} stroke="currentColor" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} y1="0" y2="400" x1={i * 50} x2={i * 50 - 30} stroke="currentColor" />
      ))}
      <circle cx="200" cy="200" r="70" fill="none" stroke="#c2a477" strokeOpacity="0.5" />
    </svg>
  )
}
