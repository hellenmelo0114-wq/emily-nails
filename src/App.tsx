import { useEffect } from 'react'
import { Header } from './components/sections/Header'
import { Hero, Marquee } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Services } from './components/sections/Services'
import { Gallery } from './components/sections/Gallery'
import { Testimonials } from './components/sections/Testimonials'
import { Booking } from './components/sections/Booking'
import { Instagram } from './components/sections/Instagram'
import { Location } from './components/sections/Location'
import { FloatingWhatsApp, Footer } from './components/sections/Footer'

/** Ativa a revelação suave dos elementos marcados com [data-reveal]. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-espresso focus:px-4 focus:py-2 focus:text-ivory">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Booking />
        <Instagram />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
