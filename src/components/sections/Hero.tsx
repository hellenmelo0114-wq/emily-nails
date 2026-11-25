import type { CSSProperties } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { site } from '../../config/site'
import { whatsappLink } from '../../lib/links'
import { ImageSlot } from '../ui/ImageSlot'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export function Hero() {
  const { hero } = site
  const placeholder = !hero.photo.src

  return (
    <section
      id="inicio"
      aria-label="Início"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-16 lg:pt-28 xl:max-w-[1400px] xl:mx-auto"
    >
      {/* Fotografia principal: tela cheia no celular, arco editorial no desktop */}
      <div className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-0 lg:order-2 lg:col-span-7 lg:flex lg:items-stretch lg:justify-end">
        <div className="anim-unveil relative h-full w-full lg:h-[min(80vh,780px)] lg:w-[84%] lg:self-center" style={d(150)}>
          <ImageSlot
            photo={hero.photo}
            priority
            showLabel={false}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-full w-full lg:rounded-t-full"
            imgClassName="anim-zoom"
          />
        </div>

        {/* Foto de detalhe sobreposta (desktop) */}
        <div className="anim-rise absolute bottom-[-1rem] left-0 hidden w-[34%] lg:block" style={d(700)}>
          <div className="border-[10px] border-ivory bg-ivory">
            <ImageSlot photo={hero.detailPhoto} showLabel={false} className="aspect-[3/4]" sizes="20vw" />
          </div>
        </div>

        {/* Selo circular giratório */}
        <div className="anim-rise absolute left-[6%] top-[8%] hidden lg:block" style={d(900)} aria-hidden>
          <svg viewBox="0 0 120 120" className="anim-spin h-28 w-28 text-espresso">
            <defs>
              <path id="circle-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text className="fill-current" style={{ fontSize: 9.5, letterSpacing: '0.32em', fontFamily: 'DM Sans' }}>
              <textPath href="#circle-path">EMILY NAILS · NAIL DESIGNER · </textPath>
            </text>
          </svg>
          <span className="absolute inset-0 m-auto h-1.5 w-1.5 rotate-45 bg-gold" />
        </div>

        {placeholder && (
          <span className="eyebrow absolute right-5 top-24 !text-[0.5625rem] text-ivory/70 lg:bottom-6 lg:right-[2%] lg:top-auto lg:text-espresso/50">
            Imagem ilustrativa
          </span>
        )}

        {/* Véu escuro para leitura no celular */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(41_35_33/0.6)_0%,rgb(41_35_33/0.2)_22%,rgb(41_35_33/0.4)_48%,rgb(41_35_33/0.97)_100%)] lg:hidden" />
      </div>

      {/* Texto */}
      <div className="relative mt-auto px-6 pb-10 pt-32 text-ivory sm:px-10 lg:order-1 lg:col-span-5 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:px-0 lg:pb-0 lg:pt-0 lg:text-espresso">
        <p className="eyebrow anim-rise flex items-center gap-3 text-nude lg:text-rose-deep" style={d(300)}>
          <span className="h-px w-10 bg-current" /> {hero.eyebrow}
        </p>

        <h1 className="mt-6 text-[3.4rem] leading-[0.95] sm:text-7xl lg:text-[5.4rem] xl:text-[6.4rem]">
          <span className="anim-rise block" style={d(400)}>
            {hero.title}
          </span>
          <em className="anim-rise block font-light text-nude lg:text-rose" style={d(550)}>
            {hero.titleAccent}
          </em>
        </h1>

        <p className="anim-rise mt-6 max-w-md text-[0.975rem] leading-relaxed text-ivory/85 lg:mt-8 lg:text-[1.05rem] lg:text-muted" style={d(700)}>
          {hero.description}
        </p>

        <div className="anim-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10" style={d(850)}>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-light lg:btn-dark w-full sm:w-auto">
            {hero.cta} <ArrowRight size={16} strokeWidth={1.4} />
          </a>
          <a href="#servicos" className="btn group justify-center !px-2 text-ivory/90 lg:justify-start lg:text-espresso">
            <span className="link-line pb-1">Ver serviços</span>
          </a>
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        className="anim-rise absolute bottom-6 left-12 hidden items-center gap-3 text-muted lg:flex"
        style={d(1100)}
      >
        <ArrowDown size={14} strokeWidth={1.2} className="animate-bounce" />
        <span className="eyebrow !text-[0.625rem]">Role para descobrir</span>
      </a>
    </section>
  )
}

export function Marquee() {
  const items = site.services.filter((s) => s.active).map((s) => s.name)
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-espresso bg-espresso py-5 text-ivory" aria-hidden>
      <div className="anim-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((name, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-light italic text-ivory/85 sm:text-3xl">
            {name}
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  )
}
