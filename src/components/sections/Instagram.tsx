import { ArrowUpRight } from 'lucide-react'
import { site } from '../../config/site'
import { instagramHandle, instagramLink } from '../../lib/links'
import { InstagramIcon } from '../ui/Icons'
import { ImageSlot } from '../ui/ImageSlot'
import { DraftBadge, Pending, Reveal, SectionHeading } from '../ui/Primitives'

export function Instagram() {
  const handle = instagramHandle()
  const posts = site.instagram.posts

  return (
    <section id="instagram" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="06"
            eyebrow="Instagram"
            title="Acompanhe"
            accent="mais de perto."
            badge={!handle ? <DraftBadge>@ a definir</DraftBadge> : undefined}
          />
          <Reveal delay={150} className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <span className="font-display text-3xl italic text-rose-deep">{handle || <Pending label="@perfil" />}</span>
            <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full sm:w-auto">
              <InstagramIcon size={16} /> Visitar perfil
            </a>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-1.5 sm:gap-3 lg:mt-16 lg:grid-cols-6">
          {posts.map((p, i) => (
            <Reveal as="li" key={i} delay={i * 70} variant="fade">
              <a
                href={instagramLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden"
                aria-label={`Ver no Instagram: ${p.alt}`}
              >
                <ImageSlot
                  photo={p}
                  showLabel={false}
                  className="aspect-square"
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 grid place-items-center bg-espresso/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-espresso/35 group-hover:opacity-100">
                  <ArrowUpRight size={22} strokeWidth={1.2} />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
        {posts.some((p) => !p.src) && site.draftMode && (
          <p className="mt-4 text-xs text-muted">Imagens ilustrativas. Adicione fotos do perfil em <code>site.instagram.posts</code>.</p>
        )}
      </div>
    </section>
  )
}
