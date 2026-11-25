/**
 * ============================================================
 *  EMILY NAILS — CONFIGURAÇÃO DO SITE
 * ============================================================
 *  Todo o conteúdo da marca fica neste arquivo.
 *  Edite os valores abaixo e o site é atualizado automaticamente.
 *
 *  Regras gerais:
 *  - Campos vazios ('') ou null não aparecem no site (ou mostram
 *    um aviso discreto de "a definir" enquanto draftMode = true).
 *  - Fotos: coloque os arquivos em /public/images/ e informe o
 *    caminho, por exemplo: '/images/galeria-01.webp'.
 *    Recomendado: WebP, ~1600px no lado maior, até ~300 KB.
 *    Enquanto `src` estiver vazio, o site mostra uma arte
 *    provisória identificada como "Imagem ilustrativa".
 * ============================================================
 */

export type Photo = {
  /** Caminho da imagem (ex.: '/images/hero.webp'). Vazio = arte provisória. */
  src: string
  /** Descrição da imagem para acessibilidade e SEO. */
  alt: string
  /** Tom da arte provisória (0–5). Ignorado quando há foto real. */
  tone?: number
}

export type Service = {
  id: string
  name: string
  description: string
  /** Ex.: 'R$ 150' ou 'A partir de R$ 120'. null = mostra "Consulte valores". */
  price: string | null
  /** Ex.: '2h30'. null = não exibe. */
  duration: string | null
  photo: Photo
  /** false = esconde o serviço do site. */
  active: boolean
  /** false = serviço ainda não confirmado pela Emily (marcado em draftMode). */
  confirmed: boolean
}

export type Testimonial = {
  name: string
  text: string
  service?: string
  /** true = depoimento de exemplo. Sempre identificado no site. */
  demo: boolean
}

export const site = {
  /**
   * Modo rascunho: exibe selos discretos de "conteúdo provisório"
   * em tudo que ainda precisa ser substituído.
   * Mude para `false` quando todo o conteúdo real estiver preenchido.
   */
  draftMode: true,

  brand: {
    name: 'Emily Nails',
    role: 'Nail Designer',
    /** Endereço final do site (usado em SEO e compartilhamento). */
    url: '',
  },

  whatsapp: {
    /**
     * Número com código do país e DDD, só dígitos.
     * Ex.: '5511999998888'
     */
    number: '',
    defaultMessage: 'Olá, Emily! Gostaria de agendar um horário.',
    /** {servico} é substituído pelo nome do serviço escolhido. */
    serviceMessage: 'Olá, Emily! Gostaria de agendar um horário para {servico}.',
  },

  instagram: {
    /** Sem o @. Ex.: 'emilynails' */
    handle: '',
    /**
     * Fotos exibidas na seção Instagram (arquivos locais).
     * Não há integração com a API do Instagram: atualize manualmente.
     */
    posts: [
      { src: '', alt: 'Publicação do Instagram da Emily Nails', tone: 1 },
      { src: '', alt: 'Publicação do Instagram da Emily Nails', tone: 3 },
      { src: '', alt: 'Publicação do Instagram da Emily Nails', tone: 0 },
      { src: '', alt: 'Publicação do Instagram da Emily Nails', tone: 4 },
      { src: '', alt: 'Publicação do Instagram da Emily Nails', tone: 2 },
      { src: '', alt: 'Publicação do Instagram da Emily Nails', tone: 5 },
    ] as Photo[],
  },

  location: {
    street: '', // Ex.: 'Rua das Flores, 123 — Sala 4'
    neighborhood: '', // Ex.: 'Jardins'
    city: '', // Ex.: 'São Paulo'
    state: '', // Ex.: 'SP'
    zip: '', // Ex.: '01000-000'
    /** Observação opcional. Ex.: 'Atendimento somente com hora marcada.' */
    note: '',
    /**
     * Texto usado para buscar no Google Maps.
     * Se vazio, o endereço acima é usado automaticamente.
     */
    mapsQuery: '',
  },

  /** Horários de funcionamento. Deixe `hours: ''` para não exibir a linha. */
  hours: [
    { days: 'Segunda a sexta', hours: '' },
    { days: 'Sábado', hours: '' },
    { days: 'Domingo', hours: '' },
  ],

  hero: {
    eyebrow: 'Nail Designer',
    title: 'A beleza está nos',
    titleAccent: 'detalhes.',
    description:
      'Unhas feitas para valorizar sua beleza, expressar sua personalidade e elevar sua autoestima.',
    cta: 'Agendar meu horário',
    photo: { src: '', alt: 'Mãos com unhas em tom nude, acabamento impecável', tone: 0 } as Photo,
    detailPhoto: { src: '', alt: 'Detalhe de unhas com acabamento em gel', tone: 3 } as Photo,
  },

  about: {
    title: 'Beleza, cuidado e dedicação em cada detalhe.',
    photo: { src: '', alt: 'Retrato da nail designer Emily', tone: 2 } as Photo,
    /**
     * Parágrafos da apresentação. Os textos entre [colchetes]
     * são provisórios — substitua pelos textos reais.
     */
    paragraphs: [
      '[Texto provisório — Apresentação: escreva aqui quem é a Emily, em primeira ou terceira pessoa, com um tom acolhedor.]',
      '[Texto provisório — História profissional: conte como começou na área, o que a inspira e como seu trabalho evoluiu.]',
      '[Texto provisório — Experiência e especialidades: cite cursos, técnicas em que é especialista e tempo de atuação, se desejar.]',
    ],
    signature: 'Emily',
    /** Diferenciais do atendimento — substitua pelos reais. */
    highlights: [
      { title: '[Diferencial 1]', text: '[Ex.: cuidado com biossegurança e esterilização dos materiais.]' },
      { title: '[Diferencial 2]', text: '[Ex.: atendimento individual e com hora marcada.]' },
      { title: '[Diferencial 3]', text: '[Ex.: produtos e marcas utilizados.]' },
      { title: '[Diferencial 4]', text: '[Ex.: atenção ao formato ideal para cada mão.]' },
    ],
    /** true enquanto os textos acima forem provisórios. */
    provisional: true,
  },

  /**
   * Serviços. Opções iniciais editáveis — confirme quais são oferecidos.
   * Preço e duração ficam null até serem informados.
   */
  services: [
    {
      id: 'alongamento',
      name: 'Alongamento de unhas',
      description: 'Extensão do comprimento natural com formato personalizado e acabamento refinado.',
      price: null,
      duration: null,
      photo: { src: '', alt: 'Unhas alongadas em formato amendoado', tone: 0 },
      active: true,
      confirmed: false,
    },
    {
      id: 'banho-de-gel',
      name: 'Banho de gel',
      description: 'Camada de gel sobre a unha natural para mais resistência, brilho e uniformidade.',
      price: null,
      duration: null,
      photo: { src: '', alt: 'Unhas naturais com banho de gel', tone: 3 },
      active: true,
      confirmed: false,
    },
    {
      id: 'esmaltacao-em-gel',
      name: 'Esmaltação em gel',
      description: 'Cor intensa e brilho duradouro, com secagem imediata e acabamento espelhado.',
      price: null,
      duration: null,
      photo: { src: '', alt: 'Esmaltação em gel em tom rosé', tone: 1 },
      active: true,
      confirmed: false,
    },
    {
      id: 'manutencao',
      name: 'Manutenção',
      description: 'Cuidado periódico para preservar o alinhamento, a estrutura e a beleza das unhas.',
      price: null,
      duration: null,
      photo: { src: '', alt: 'Manutenção de unhas em gel', tone: 4 },
      active: true,
      confirmed: false,
    },
    {
      id: 'blindagem',
      name: 'Blindagem',
      description: 'Proteção para unhas naturais, ajudando a evitar que quebrem ou descasquem.',
      price: null,
      duration: null,
      photo: { src: '', alt: 'Unhas naturais com blindagem', tone: 5 },
      active: true,
      confirmed: false,
    },
    {
      id: 'fibra-de-vidro',
      name: 'Fibra de vidro',
      description: 'Técnica de alongamento leve e natural, com fios de fibra aplicados sob o gel.',
      price: null,
      duration: null,
      photo: { src: '', alt: 'Alongamento em fibra de vidro', tone: 2 },
      active: true,
      confirmed: false,
    },
    {
      id: 'nail-art',
      name: 'Nail art',
      description: 'Desenhos e detalhes artísticos criados para expressar o seu estilo.',
      price: null,
      duration: null,
      photo: { src: '', alt: 'Nail art minimalista com detalhes dourados', tone: 4 },
      active: true,
      confirmed: false,
    },
    {
      id: 'manicure-tradicional',
      name: 'Manicure tradicional',
      description: 'Cutilagem, lixamento e esmaltação clássica para unhas bem cuidadas.',
      price: null,
      duration: null,
      photo: { src: '', alt: 'Manicure tradicional com esmalte clássico', tone: 1 },
      active: true,
      confirmed: false,
    },
  ] as Service[],

  /**
   * Galeria / Portfólio. Priorize fotos reais dos trabalhos da Emily.
   * `ratio` define o formato do quadro: 'portrait' | 'square' | 'tall' | 'landscape'.
   */
  gallery: [
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 0, ratio: 'tall' },
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 3, ratio: 'square' },
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 1, ratio: 'portrait' },
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 4, ratio: 'landscape' },
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 2, ratio: 'portrait' },
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 5, ratio: 'tall' },
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 0, ratio: 'square' },
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 3, ratio: 'portrait' },
    { src: '', alt: 'Trabalho de unhas — imagem ilustrativa', tone: 1, ratio: 'landscape' },
  ] as (Photo & { ratio: 'portrait' | 'square' | 'tall' | 'landscape' })[],

  /** Depoimentos. Os de exemplo (demo: true) são sempre identificados. */
  testimonials: [
    {
      name: '[Nome da cliente]',
      text: 'Espaço reservado para um depoimento real. Substitua este texto pela avaliação de uma cliente.',
      service: '[Serviço realizado]',
      demo: true,
    },
    {
      name: '[Nome da cliente]',
      text: 'Espaço reservado para um depoimento real. Prints de mensagens ou avaliações do Google são ótimas fontes.',
      service: '[Serviço realizado]',
      demo: true,
    },
    {
      name: '[Nome da cliente]',
      text: 'Espaço reservado para um depoimento real. Peça autorização à cliente antes de publicar o nome dela.',
      service: '[Serviço realizado]',
      demo: true,
    },
  ] as Testimonial[],

  seo: {
    title: 'Emily Nails — Nail Designer',
    description:
      'Emily Nails: nail designer. Alongamento, esmaltação em gel, nail art e cuidado com cada detalhe. Agende seu horário pelo WhatsApp.',
  },
}

export type SiteConfig = typeof site
