import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { site } from '../../config/site'
import { activeServices, whatsappLink } from '../../lib/links'
import { WhatsAppIcon } from '../ui/Icons'
import { Reveal } from '../ui/Primitives'

const STEPS = [
  { n: '01', t: 'Escolha', d: 'Selecione o procedimento desejado.' },
  { n: '02', t: 'Envie', d: 'A mensagem abre pronta no WhatsApp.' },
  { n: '03', t: 'Confirme', d: 'Combine o melhor dia e horário.' },
]

export function Booking() {
  const services = activeServices()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section id="agendar" className="relative overflow-hidden bg-espresso py-24 text-ivory sm:py-32 lg:py-40">
      {/* Arco decorativo */}
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[420px] rounded-t-full border border-gold/20 lg:right-[-6rem]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-28 top-24 h-[560px] w-[340px] rounded-t-full border border-ivory/10 lg:right-[-2rem]" aria-hidden />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="eyebrow text-gold">
              05 <span className="mx-2 inline-block h-px w-8 translate-y-[-3px] bg-current align-middle opacity-60" /> Agendamento
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.5rem]">
              Seu próximo momento de cuidado <em className="font-light text-nude">começa aqui.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-md text-ivory/75">Escolha seu procedimento e entre em contato para reservar seu horário.</p>
          </Reveal>

          <ol className="mt-12 hidden gap-6 sm:grid sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={250 + i * 100} className="border-t border-ivory/15 pt-4">
                <span className="font-display text-lg italic text-gold">{s.n}</span>
                <p className="mt-1 text-sm font-medium">{s.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-ivory/60">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <fieldset>
            <legend className="eyebrow text-ivory/60">Qual procedimento você deseja?</legend>
            <div className="mt-5 flex flex-wrap gap-2">
              {services.map((s) => {
                const active = selected === s.name
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(active ? null : s.name)}
                    className={`min-h-11 rounded-[2px] border px-4 text-sm transition-all duration-300 ${
                      active
                        ? 'border-nude bg-nude text-espresso'
                        : 'border-ivory/20 text-ivory/85 hover:border-ivory/60 hover:text-ivory'
                    }`}
                  >
                    {s.name}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <a
            href={whatsappLink(selected ?? undefined)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light mt-10 w-full !min-h-[4.25rem] !gap-3 !px-4 !text-[0.75rem] !tracking-[0.16em] sm:!px-7 sm:!text-[0.8125rem] sm:!tracking-[0.22em]"
          >
            <WhatsAppIcon size={20} /> Agendar pelo WhatsApp <ArrowRight size={16} strokeWidth={1.4} className="hidden sm:block" />
          </a>
          <p className="mt-4 text-center text-xs text-ivory/55" aria-live="polite">
            {selected ? (
              <>Mensagem: “{site.whatsapp.serviceMessage.replace('{servico}', selected.toLowerCase())}”</>
            ) : (
              'Selecione um procedimento para incluí-lo na mensagem, ou envie direto.'
            )}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
