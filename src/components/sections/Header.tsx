import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { site } from '../../config/site'
import { instagramHandle, instagramLink, whatsappLink } from '../../lib/links'
import { InstagramIcon, WhatsAppIcon } from '../ui/Icons'

export const NAV = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#localizacao', label: 'Localização' },
]

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className={`flex items-baseline gap-2 leading-none ${tone === 'light' ? 'text-ivory' : 'text-espresso'}`}>
      <span className="font-display text-[1.7rem] italic font-light">Emily</span>
      <span className="eyebrow !text-[0.625rem] !tracking-[0.42em]">Nails</span>
    </span>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled && !open
  const handle = instagramHandle()

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
          solid
            ? 'bg-ivory/90 text-espresso shadow-[0_1px_0_rgb(41_35_33/0.08)] backdrop-blur-md'
            : open
              ? 'text-ivory'
              : 'text-ivory lg:text-espresso'
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
          <a href="#inicio" aria-label={`${site.brand.name} — início`} onClick={() => setOpen(false)}>
            <span className={solid ? '' : 'lg:hidden'}>
              <Logo tone={solid ? 'dark' : 'light'} />
            </span>
            {!solid && (
              <span className="hidden lg:block">
                <Logo tone="dark" />
              </span>
            )}
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-line eyebrow pb-1 !tracking-[0.22em]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark hidden !min-h-11 !px-5 lg:inline-flex"
            >
              Agendar
            </a>
            <button
              type="button"
              className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} strokeWidth={1.2} /> : <Menu size={24} strokeWidth={1.2} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col bg-espresso px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 text-ivory transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Menu mobile" className="flex-1">
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className="transition-[opacity,transform] duration-700 ease-[var(--ease-luxe)]"
                style={{
                  transitionDelay: open ? `${120 + i * 60}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(16px)',
                }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-ivory/10 py-4 font-display text-[2.25rem] font-light leading-none"
                >
                  <span className="eyebrow w-6 text-gold">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="space-y-6 transition-opacity delay-300 duration-700"
          style={{ opacity: open ? 1 : 0 }}
        >
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light w-full"
            onClick={() => setOpen(false)}
          >
            Agendar meu horário <ArrowRight size={16} strokeWidth={1.4} />
          </a>
          <div className="flex items-center justify-between text-ivory/70">
            <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm">
              <InstagramIcon size={18} /> {handle || 'Instagram'}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm">
              <WhatsAppIcon size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
