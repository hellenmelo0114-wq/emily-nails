# Emily Nails — Website

Site em React + TypeScript + Vite + Tailwind CSS + Lucide.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # gera a versão final em /dist
npm run preview  # visualiza a versão final
```

A pasta `dist/` pode ser publicada em qualquer hospedagem estática (Vercel, Netlify, Cloudflare Pages, Hostinger…).

## Como editar o conteúdo

**Todo o conteúdo fica em um único arquivo: `src/config/site.ts`.**

| O quê | Onde |
|---|---|
| WhatsApp (só números, com 55 + DDD) | `whatsapp.number` |
| Mensagens automáticas | `whatsapp.defaultMessage` / `serviceMessage` |
| Instagram (sem @) | `instagram.handle` |
| Endereço e mapa | `location` |
| Horários | `hours` |
| Textos da Emily | `about` |
| Serviços, preços e duração | `services` (`price: 'R$ 150'`, `duration: '2h'`) |
| Esconder um serviço | `active: false` |
| Confirmar um serviço | `confirmed: true` |
| Galeria | `gallery` |
| Depoimentos | `testimonials` (use `demo: false` nos reais) |

### Fotografias

1. Coloque as fotos em `public/images/` (ex.: `public/images/galeria-01.webp`).
2. No `site.ts`, preencha `src: '/images/galeria-01.webp'` e um `alt` descritivo.
3. Dica: WebP, cerca de 1600 px no lado maior, até ~300 KB. Fotos verticais (4:5) ficam melhores.

Enquanto `src` estiver vazio, o site exibe uma arte provisória marcada como "Imagem ilustrativa".

### Publicar

Quando tudo estiver preenchido, mude `draftMode` para `false`. Isso remove os selos de "conteúdo provisório".
Também troque `public/og-image.jpg` (imagem de compartilhamento, 1200×630) e preencha `brand.url`.
