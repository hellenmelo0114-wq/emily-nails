import { useEffect, useState } from 'react'
import { site } from '../../config/site'
import { addressLines, instagramHandle, instagramLink, whatsappLink } from '../../lib/links'
import { InstagramIcon, WhatsAppIcon } from '../ui/Icons'
import { Logo, NAV } from './Header'

export function Footer() {
  const lines = addressLines()
  const handle = instagramHandle()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div className="grid gap-12 border-b border-ivory/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm font-display text-2xl font-light italic leading-snug text-ivory/80">
              A beleza está nos detalhes.
            </p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3">
            <p className="eyebrow text-gold">Navegação</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-ivory/75 lg:grid-cols-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-line hover:text-ivory">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow text-gold">Contato</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-ivory">
                  <WhatsAppIcon size={17} /> <span className="link-line">WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-ivory">
                  <InstagramIcon size={17} /> <span className="link-line">{handle || 'Instagram'}</span>
                </a>
              </li>
              {lines.length > 0 && (
                <li className="pt-2 leading-relaxed">
                  {lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs text-ivory/50 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.brand.name}. Todos os direitos reservados.
          </p>
          <a href="#inicio" className="link-line self-start hover:text-ivory">
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  )
}

/** Botão flutuante: surge após o hero e se esconde na seção de agendamento. */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let pastHero = false
    let inBooking = false
    const update = () => setShow(pastHero && !inBooking)
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.7
      update()
    }
    const booking = document.getElementById('agendar')
    const io = new IntersectionObserver(([e]) => {
      inBooking = e.isIntersecting
      update()
    }, { threshold: 0.25 })
    if (booking) io.observe(booking)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      tabIndex={show ? undefined : -1}
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center gap-3 rounded-full bg-espresso pl-[1.1rem] pr-[1.1rem] text-ivory shadow-[0_10px_30px_-10px_rgb(41_35_33/0.55)] ring-1 ring-gold/40 transition-all duration-700 ease-[var(--ease-luxe)] hover:bg-rose-deep sm:right-6 sm:bottom-6 lg:pr-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <WhatsAppIcon size={22} />
      <span className="eyebrow hidden !text-[0.6875rem] lg:inline">Agendar</span>
    </a>
  )
}
