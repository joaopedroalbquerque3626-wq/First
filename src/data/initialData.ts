import {
  Competition,
  Team,
  OfficialResult,
  Sponsor,
  SponsorshipOpportunity,
  Story,
  ImpactMetric,
  PlatformSettings,
  SponsorshipLead,
  ContactMessage
} from '../types';

export const initialPlatformSettings: PlatformSettings = {
  platformName: "COMPETE",
  tagline: "Plataforma Oficial de Competições, Equipes e Patrocínio",
  manifestoTitle: "NÃO ASSISTA DE FORA.",
  manifestoText: "Um espaço para descobrir competições, conhecer as equipes que estão fazendo acontecer e aproximar marcas de quem merece ser visto.\n\nAcompanhe os campeonatos, conheça as histórias e descubra onde sua marca pode entrar em jogo.",
  aboutText: "A COMPETE nasceu para preencher a lacuna entre o talento em campo e as marcas no mercado. Estruturamos a visibilidade de competições reais, dando palco para equipes dedicadas e canais transparentes de investimento para patrocinadores.",
  aboutMission: "Conectar o ecossistema competitivo a oportunidades comerciais sustentáveis e de alto impacto cultural e esportivo.",
  aboutPillars: [
    { title: "Transparência Factual", desc: "Apenas dados, resultados e regulamentos oficiais homologados." },
    { title: "Protagonismo às Equipes", desc: "Espaço dedicado para valorizar a identidade e conquistas dos atletas." },
    { title: "Ponte Comercial Direta", desc: "Aproximação ágil entre tomadores de decisão em marcas e organizadores." }
  ],
  officialContact: {
    email: "contato@compete.com.br",
    whatsapp: "+55 (11) 98765-4321",
    instagram: "@compete.oficial",
    linkedin: "compete-brasil",
    address: "São Paulo - SP, Brasil"
  },
  allowPublicSubmissions: true
};

export const sampleCompetitions: Competition[] = [
  {
    id: "comp-01",
    slug: "liga-metropolitana-3x3-2025",
    name: "Liga Metropolitana de Basquete 3x3",
    shortName: "Liga 3x3 Metro",
    category: "Basquete 3x3",
    season: "2025",
    status: "ongoing",
    startDate: "2025-03-15",
    endDate: "2025-05-20",
    location: {
      city: "São Paulo",
      state: "SP",
      venue: "Parque da Juventude - Quadras Oficiais"
    },
    description: "Competição oficial de basquete 3x3 reunindo as principais equipes da região metropolitana em etapas classificatórias e playoff final.",
    detailedInfo: "Formato de disputa com fase de grupos em 4 fins de semana seguidos de mata-mata de eliminação simples. Pontuação oficial computada para ranking estadual.",
    bannerUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    logoUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=300&auto=format&fit=crop",
    organizerName: "Federação Urbana de Desportos Coletivos",
    organizerContact: "competicoes@fudc.com.br",
    teamsCount: 16,
    prizeInfo: "R$ 15.000 em premiação total + Troféus Oficiais e medalhas para os 3 primeiros colocados.",
    registrationInfo: {
      fee: "R$ 350,00 por equipe",
      deadline: "2025-03-01",
      instructions: "Envio de súmula com até 4 atletas e documento oficial com foto via painel oficial.",
      isOpen: false
    },
    regulationDoc: {
      title: "Regulamento Geral Oficial 2025 - Liga Metropolitana 3x3.pdf",
      url: "#",
      fileSize: "1.8 MB",
      lastUpdated: "2025-02-10"
    },
    schedule: [
      { time: "09:00", activity: "Credenciamento e Aquecimento Oficial", location: "Quadra Central" },
      { time: "10:00", activity: "Início dos Confrontos da Fase de Grupos", location: "Quadras 1 e 2" },
      { time: "16:30", activity: "Semifinais e Final", location: "Quadra Central" }
    ],
    sponsorIds: ["sp-01", "sp-02"],
    teamIds: ["team-01", "team-02", "team-03"],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-02-15T10:00:00Z"
  },
  {
    id: "comp-02",
    slug: "circuito-paulista-street-dance-2025",
    name: "Circuito Estadual de Breaking & Street Dance",
    shortName: "Circuito Breaking SP",
    category: "Street Dance",
    season: "2025",
    status: "open_registration",
    startDate: "2025-06-10",
    endDate: "2025-06-12",
    location: {
      city: "Campinas",
      state: "SP",
      venue: "Centro Cultural Estação das Artes"
    },
    description: "Batalhas oficiais de Breaking 1v1 e Crew vs Crew com jurados credenciados nacionalmente e pontuação para o circuito brasileiro.",
    detailedInfo: "Categorias: Breaking B-Boy 1v1, Breaking B-Girl 1v1 e All-Style Crew. Premiação em dinheiro e vagas para o campeonato nacional.",
    bannerUrl: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=1200&auto=format&fit=crop",
    logoUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300&auto=format&fit=crop",
    organizerName: "Coletivo Urbano Dança & Cultura",
    organizerContact: "circuito@dancaurbana.org",
    teamsCount: 24,
    prizeInfo: "R$ 10.000 em premiação total + bolsa incentivo para os campeões.",
    registrationInfo: {
      fee: "Gratuito (Incentivo Cultural)",
      deadline: "2025-05-25",
      instructions: "Inscrição online com envio de vídeo de pré-seleção ou histórico de batalhas.",
      isOpen: true
    },
    regulationDoc: {
      title: "Caderno Técnico e Critérios de Julgamento 2025.pdf",
      url: "#",
      fileSize: "2.4 MB",
      lastUpdated: "2025-01-20"
    },
    sponsorIds: ["sp-01"],
    teamIds: ["team-04"],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-15T12:00:00Z",
    updatedAt: "2025-02-12T14:00:00Z"
  },
  {
    id: "comp-03",
    slug: "copa-brasil-skate-street-amador-2025",
    name: "Copa Brasil de Skate Street Amador",
    shortName: "Copa Skate Street",
    category: "Skate Street",
    season: "2025",
    status: "upcoming",
    startDate: "2025-08-02",
    endDate: "2025-08-03",
    location: {
      city: "Santos",
      state: "SP",
      venue: "Skatepark Municipal Chorão"
    },
    description: "Competição amadora oficial homologada, reunindo atletas de diversas regiões em busca de visibilidade e ranqueamento na CBSk.",
    detailedInfo: "Formato de baterias com 2 voltas de 45 segundos + 4 tentativas de Best Trick. Julgamento por critérios de linha, velocidade, uso da pista e consistência.",
    bannerUrl: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=1200&auto=format&fit=crop",
    organizerName: "Associação Litorânea de Skateboarding",
    organizerContact: "contato@skatelitoral.com.br",
    teamsCount: 32,
    prizeInfo: "Materiais esportivos profissionais + R$ 8.000 em dinheiro para as categorias masculinas e femininas.",
    registrationInfo: {
      fee: "R$ 80,00 por competidor",
      deadline: "2025-07-20",
      isOpen: false
    },
    regulationDoc: {
      title: "Diretrizes Oficiais de Competição e Pista - Skate Street 2025.pdf",
      url: "#",
      fileSize: "1.2 MB",
      lastUpdated: "2025-02-01"
    },
    sponsorIds: ["sp-03"],
    teamIds: [],
    statusDraft: "published",
    featured: false,
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-02-18T10:00:00Z"
  }
];

export const sampleTeams: Team[] = [
  {
    id: "team-01",
    slug: "radicais-da-leste-3x3",
    name: "Radicais da Leste Basquete 3x3",
    shortName: "Radicais da Leste",
    badgeUrl: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=300&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200&auto=format&fit=crop",
    category: "Basquete 3x3",
    city: "São Paulo",
    state: "SP",
    foundedYear: "2019",
    season: "2025",
    bio: "Equipe fundada na Zona Leste de São Paulo com foco em basquete urbano de alta performance. Atual bicampeã da Copa Metropolitana e participante frequente do circuito nacional.",
    currentCompetitionIds: ["comp-01"],
    isSeekingSponsorship: true,
    sponsorshipProposal: "A equipe busca patrocinadores para cobrir custos de transporte, taxa de torneios interestaduais e fornecimento de uniformes oficiais para a temporada 2025.",
    members: [
      { id: "m-01", name: "Lucas 'Monstro' Andrade", role: "Pivô / Capitão", numberOrNick: "#15", bio: "Melhor reboteiro da temporada 2024." },
      { id: "m-02", name: "Gabriel Sampaio", role: "Armador", numberOrNick: "#7", bio: "Especialista em arremessos de 2 pontos." },
      { id: "m-03", name: "Thiago Rocha", role: "Ala", numberOrNick: "#23", bio: "Atleta com histórico no basquete universitário." },
      { id: "m-04", name: "Matheus Lima", role: "Ala-Armador", numberOrNick: "#3" }
    ],
    achievements: [
      { id: "ach-01", title: "Campeão da Copa Metropolitana", year: "2024", competitionName: "Copa Metropolitana 3x3", placement: "1º Lugar" },
      { id: "ach-02", title: "Vice-Campeão Estadual", year: "2023", competitionName: "Torneio Open SP", placement: "2º Lugar" }
    ],
    officialLinks: {
      instagram: "@radicaisdaleste3x3",
      contactEmail: "comercial@radicais3x3.com.br",
      contactPhone: "+55 (11) 97123-4567"
    },
    sponsorIds: ["sp-02"],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-02-14T10:00:00Z"
  },
  {
    id: "team-02",
    slug: "uniao-norte-ballers",
    name: "União Norte Ballers",
    shortName: "União Norte",
    badgeUrl: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=300&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    category: "Basquete 3x3",
    city: "São Paulo",
    state: "SP",
    foundedYear: "2021",
    season: "2025",
    bio: "Coletivo de atletas da Zona Norte da capital com forte trabalho de base e transição rápida de quadra.",
    currentCompetitionIds: ["comp-01"],
    isSeekingSponsorship: true,
    sponsorshipProposal: "Disponibilidade de espaço master na camisa e presença em conteúdos de treino para marcas de nutrição e vestuário esportivo.",
    members: [
      { id: "m-05", name: "Felipe 'Flash' Silva", role: "Armador", numberOrNick: "#10" },
      { id: "m-06", name: "Carlos Eduardo", role: "Pivô", numberOrNick: "#44" },
      { id: "m-07", name: "Rodrigo Mendes", role: "Ala", numberOrNick: "#8" }
    ],
    achievements: [
      { id: "ach-03", title: "3º Colocado Torneio da Juventude", year: "2024", competitionName: "Torneio Aberto SP", placement: "3º Lugar" }
    ],
    officialLinks: {
      instagram: "@uniaonorteballers",
      contactEmail: "contato@uniaonorte3x3.com"
    },
    sponsorIds: [],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-12T10:00:00Z",
    updatedAt: "2025-02-10T10:00:00Z"
  },
  {
    id: "team-03",
    slug: "south-side-hoops",
    name: "South Side Hoops Club",
    shortName: "South Side",
    badgeUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=300&auto=format&fit=crop",
    category: "Basquete 3x3",
    city: "Santo André",
    state: "SP",
    foundedYear: "2020",
    season: "2025",
    bio: "Equipe do ABC Paulista com foco em defesa agressiva e transição física.",
    currentCompetitionIds: ["comp-01"],
    isSeekingSponsorship: false,
    members: [
      { id: "m-08", name: "Danilo Ferraz", role: "Ala/Pivô", numberOrNick: "#33" },
      { id: "m-09", name: "André Santos", role: "Armador", numberOrNick: "#5" }
    ],
    officialLinks: {
      instagram: "@southsidehoops"
    },
    sponsorIds: ["sp-01"],
    statusDraft: "published",
    featured: false,
    createdAt: "2025-01-20T10:00:00Z",
    updatedAt: "2025-02-01T10:00:00Z"
  },
  {
    id: "team-04",
    slug: "urban-rhythm-crew",
    name: "Urban Rhythm Breaking Crew",
    shortName: "Urban Rhythm",
    badgeUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=300&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop",
    category: "Street Dance",
    city: "Campinas",
    state: "SP",
    foundedYear: "2018",
    season: "2025",
    bio: "Grupo de danças urbanas e b-boys pioneiro em competições de breaking no interior paulista com participação em festivais internacionais.",
    currentCompetitionIds: ["comp-02"],
    isSeekingSponsorship: true,
    sponsorshipProposal: "Oportunidade para ativações de marca em batalhas, jaquetas de aquecimento e workshops sociais em comunidades.",
    members: [
      { id: "m-10", name: "B-Boy Kadu", role: "Fundador / Dançarino", bio: "Top 8 no Red Bull BC One Cypher Brasil 2023." },
      { id: "m-11", name: "B-Girl Tay", role: "Dançarina", bio: "Campeã do Duelo de Titãs 2024." }
    ],
    achievements: [
      { id: "ach-04", title: "Campeões do Duelo Estadual Crew", year: "2024", competitionName: "Festival Dança Urbana", placement: "1º Lugar" }
    ],
    officialLinks: {
      instagram: "@urbanrhythmcrew",
      youtube: "urbanrhythmbreaking"
    },
    sponsorIds: [],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-18T10:00:00Z",
    updatedAt: "2025-02-15T10:00:00Z"
  }
];

export const sampleResults: OfficialResult[] = [
  {
    id: "res-01",
    competitionId: "comp-01",
    stageName: "Fase Classificatória - Etapa 1",
    date: "2025-03-15",
    type: "match",
    matches: [
      {
        teamAId: "team-01",
        teamAName: "Radicais da Leste",
        teamBId: "team-02",
        teamBName: "União Norte Ballers",
        scoreA: 21,
        scoreB: 18,
        status: "finished",
        timeOrDate: "10:30",
        courtOrLocation: "Quadra Central",
        winnerTeamId: "team-01",
        notes: "Partida decidida no último minuto com cesta de 2 pontos de Lucas Andrade."
      },
      {
        teamAId: "team-03",
        teamAName: "South Side Hoops Club",
        teamBId: "team-01",
        teamBName: "Radicais da Leste",
        scoreA: 19,
        scoreB: 21,
        status: "finished",
        timeOrDate: "14:00",
        courtOrLocation: "Quadra Central",
        winnerTeamId: "team-01"
      }
    ],
    statusDraft: "published",
    createdAt: "2025-03-15T16:00:00Z"
  },
  {
    id: "res-02",
    competitionId: "comp-01",
    stageName: "Tabela de Classificação Atualizada",
    date: "2025-03-16",
    type: "ranking",
    ranking: [
      { rank: 1, teamId: "team-01", teamOrParticipantName: "Radicais da Leste", points: 6, matchesPlayed: 2, wins: 2, losses: 0, scoreDifference: "+5" },
      { rank: 2, teamId: "team-03", teamOrParticipantName: "South Side Hoops Club", points: 3, matchesPlayed: 2, wins: 1, losses: 1, scoreDifference: "+1" },
      { rank: 3, teamId: "team-02", teamOrParticipantName: "União Norte Ballers", points: 1, matchesPlayed: 2, wins: 0, losses: 2, scoreDifference: "-6" }
    ],
    notes: "Pontuação oficial validada pela mesa de arbitragem e comitê técnico.",
    statusDraft: "published",
    createdAt: "2025-03-16T18:00:00Z"
  }
];

export const sampleSponsors: Sponsor[] = [
  {
    id: "sp-01",
    name: "Apex Energy Drink",
    category: "official",
    tierName: "Patrocinador Master Oficial",
    logoUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop",
    websiteUrl: "https://apexenergy.com.br",
    active: true,
    bio: "Marca de energéticos focada no apoio ao esporte de rua e cultura urbana.",
    targetCompetitionIds: ["comp-01", "comp-02"]
  },
  {
    id: "sp-02",
    name: "Vórtex Streetwear Co.",
    category: "partner",
    tierName: "Parceiro Oficial de Vestuário",
    logoUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop",
    websiteUrl: "https://vortexstreetwear.com.br",
    active: true,
    bio: "Fornecedora oficial dos uniformes e premiações das ligas urbanas.",
    targetTeamIds: ["team-01"]
  },
  {
    id: "sp-03",
    name: "GripTape Co. Equipamentos",
    category: "supporter",
    tierName: "Apoiador Técnico",
    active: true,
    websiteUrl: "https://griptape.com.br",
    targetCompetitionIds: ["comp-03"]
  }
];

export const sampleOpportunities: SponsorshipOpportunity[] = [
  {
    id: "opp-01",
    title: "Naming Rights & Arena Master — Liga Metropolitana 3x3",
    type: "naming_rights",
    targetEntityId: "comp-01",
    targetEntityName: "Liga Metropolitana de Basquete 3x3",
    description: "Associação direta de nome à competição oficial ('Liga [Sua Marca] de Basquete 3x3') com inserção em todo o material de comunicação, quadra oficial e troféus.",
    benefitsList: [
      "Aplicação da marca no círculo central da quadra oficial",
      "Inserção em 100% das transmissões e fotos oficiais",
      "Estande exclusivo de ativação para produtos e experiências no local",
      "Direito a entrega do troféu de campeão no palco principal"
    ],
    estimatedInvestmentRange: "Sob consulta com a diretoria comercial",
    active: true,
    statusDraft: "published",
    createdAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "opp-02",
    title: "Patrocínio de Uniforme Master — Radicais da Leste",
    type: "uniform",
    targetEntityId: "team-01",
    targetEntityName: "Radicais da Leste Basquete 3x3",
    description: "Espaço principal frontal na camisa oficial de jogo da equipe durante toda a temporada 2025 em torneios estaduais e nacionais.",
    benefitsList: [
      "Espaço master frontal nas camisas e regatas de jogo",
      "Menção em todas as postagens oficiais e resultados",
      "Presença de atletas em eventos e campanhas promocionais da marca"
    ],
    estimatedInvestmentRange: "Cotas a partir de R$ 5.000 / temporada",
    active: true,
    statusDraft: "published",
    createdAt: "2025-01-20T10:00:00Z"
  },
  {
    id: "opp-03",
    title: "Cota de Ativação Cultural — Circuito Estadual de Breaking",
    type: "activation",
    targetEntityId: "comp-02",
    targetEntityName: "Circuito Estadual de Breaking & Street Dance",
    description: "Espaço para estande de ativação, sampling de produtos e premiação de categoria especial com a marca.",
    benefitsList: [
      "Backdrop de entrevistas oficial com logotipo",
      "Direito a nomear a categoria 'Best Move [Sua Marca]'",
      "Distribuição de brindes e produtos para participantes e público"
    ],
    estimatedInvestmentRange: "Cotas a partir de R$ 3.500",
    active: true,
    statusDraft: "published",
    createdAt: "2025-02-01T10:00:00Z"
  }
];

export const sampleStories: Story[] = [
  {
    id: "story-01",
    slug: "da-quadra-da-escola-ao-podio-metropolitano",
    title: "Da quadra pública ao pódio da Liga Metropolitana: o caminho do Radicais da Leste",
    subtitle: "Como a persistência e o treino diário construíram uma das equipes mais respeitadas do 3x3 paulista.",
    author: "Redação Oficial",
    authorRole: "Equipe Editorial",
    date: "2025-02-18",
    coverUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    content: "O basquete 3x3 não dá margem para erro. Em jogos rápidos de dez minutos e posse de doze segundos, o entrosamento do quarteto da Zona Leste de São Paulo foi forjado nos finais de semana de chuva e sol.\n\nFundado em 2019, o Radicais da Leste começou como um encontro de amigos que buscavam quadras públicas em condições de treino. Cinco anos depois, a equipe ostenta dois títulos metropolitanos e representa a força do esporte de rua autêntico.\n\n'Quando entramos em quadra, não estamos jogando só por uma medalha. Estamos representando cada garoto que passa a tarde arremessando na quadra do bairro sem saber se vai ter uma oportunidade', afirma o capitão Lucas Andrade.",
    relatedCompetitionId: "comp-01",
    relatedTeamId: "team-01",
    featured: true,
    statusDraft: "published",
    createdAt: "2025-02-18T10:00:00Z"
  }
];

export const sampleMetrics: ImpactMetric[] = [
  {
    id: "met-01",
    label: "Equipes Oficiais Registradas",
    value: 72,
    unit: "+",
    description: "Equipes federadas e homologadas ativas na plataforma",
    verifiedSource: "Censo Oficial de Equipes Homologadas 2024/2025",
    visible: true
  },
  {
    id: "met-02",
    label: "Atletas & Competidores",
    value: 480,
    unit: "",
    description: "Participantes com registro em súmulas oficiais",
    verifiedSource: "Registros de Inscrição Oficiais",
    visible: true
  },
  {
    id: "met-03",
    label: "Etapas & Campeonatos Realizados",
    value: 18,
    unit: "",
    description: "Competições concluídas com súmulas auditadas",
    verifiedSource: "Livro de Registros Técnicos",
    visible: true
  }
];

export const sampleLeads: SponsorshipLead[] = [
  {
    id: "lead-01",
    companyName: "Nexus Bebidas Funcionais Ltda",
    contactPerson: "Mariana Vasconcelos",
    email: "mariana@nexusdrinks.com.br",
    phone: "(11) 98234-5678",
    website: "https://nexusdrinks.com.br",
    interestType: "competition",
    targetCompetitionId: "comp-01",
    targetCompetitionName: "Liga Metropolitana de Basquete 3x3",
    investmentRange: "R$ 10.000 - R$ 25.000",
    message: "Temos interesse em apoiar a etapa final da Liga com distribuição de isotônicos e banner no perímetro da quadra. Gostaríamos de receber o book comercial completo.",
    status: "in_contact",
    internalNotes: "Enviado media kit e agendada reunião para terça-feira.",
    createdAt: "2025-02-19T14:30:00Z"
  }
];

export const sampleContacts: ContactMessage[] = [
  {
    id: "cont-01",
    name: "Ricardo Fonseca",
    email: "ricardo.arbitragem@gmail.com",
    phone: "(11) 99123-8899",
    subject: "Credenciamento de Arbitragem para o Circuito de Breaking",
    message: "Gostaria de submeter meu currículo técnico para compor o corpo de juízes oficiais da etapa de Campinas.",
    status: "unread",
    createdAt: "2025-02-20T09:15:00Z"
  }
];
