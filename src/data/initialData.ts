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
  platformName: "ROBOCOMPETE",
  tagline: "Plataforma Oficial de Competições de Robótica, Equipes de Engenharia e Patrocínio",
  manifestoTitle: "ROBÔS NÃO SE CONSTROEM SOZINHOS. NÃO ASSISTA DE FORA.",
  manifestoText: "Um espaço dedicado exclusivamente ao ecossistema de robótica competitiva e engenharia de alto rendimento. Acompanhe os torneios de combate em arena blindada, desafios autônomos de FRC, seguidores de linha e sumô de robôs, conheça as equipes e descubra onde sua marca pode acelerar a tecnologia nacional.",
  aboutText: "A ROBOCOMPETE é a plataforma editorial e oficial de homologação voltada exclusivamente para o universo da robótica competitiva. Conectamos arenas blindadas, torneios acadêmicos e desafios autônomos a empresas de tecnologia, componentes eletrônicos, usinagem e marcas que desejam investir no futuro da engenharia e inovação.",
  aboutMission: "Dar visibilidade técnica de alto nível às equipes de robótica, registrar resultados e súmulas auditadas e abrir canais comerciais diretos para patrocinadores em tecnologia, hardware e inovação.",
  aboutPillars: [
    { title: "Engenharia de Alta Performance", desc: "Robôs de combate, humanoides, autônomos com visão computacional, FRC, FTC, sumô e seguidores de linha." },
    { title: "Súmulas e Arenas Auditadas", desc: "Cronometragem em milissegundos, inspeção técnica de segurança (fail-safe) e chaves eliminatórias registradas." },
    { title: "Ponte Comercial & STEM", desc: "Aproximação direta entre indústrias, fabricantes de semicondutores, softwares e as bancadas de equipes de ponta." }
  ],
  officialContact: {
    email: "comercial@robocompete.com.br",
    whatsapp: "+55 (11) 98765-4321",
    instagram: "@robocompete.oficial",
    linkedin: "robocompete-brasil",
    address: "São Paulo - SP, Brasil • Hub de Inovação & Robótica"
  },
  allowPublicSubmissions: true
};

export const sampleCompetitions: Competition[] = [
  {
    id: "comp-01",
    slug: "torneio-nacional-combate-de-robos-2025",
    name: "Torneio Nacional de Combate de Robôs (Arena Hardox)",
    shortName: "Ultimate Combat Bots",
    category: "Combate de Robôs (Middleweight & Featherweight)",
    season: "2025/2026",
    status: "ongoing",
    startDate: "2025-04-18",
    endDate: "2025-04-21",
    location: {
      city: "São Paulo",
      state: "SP",
      venue: "Arena Blindada Polycarbonate - Pavilhão Anhembi"
    },
    description: "A maior competição de combate de robôs da América Latina. Máquinas com armas de impacto cinético giratório a mais de 10.000 RPM duelam em arena fechada com paredes de policarbonato à prova de estilhaços.",
    detailedInfo: "Categorias homologadas: Middleweight (54,4 kg), Featherweight (13,6 kg) e Beetleweight (1,36 kg). Disputas em sistema de dupla eliminação com rounds de até 3 minutos. Critérios de pontuação: Dano Estrutural, Agressividade de Ataque e Controle de Arena.",
    bannerUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
    organizerName: "Liga Brasileira de Robótica de Combate (LBRC)",
    organizerContact: "arena@lbrc.com.br",
    teamsCount: 28,
    prizeInfo: "R$ 35.000 em premiação total + Troféus em Aço Usinado CNC e kits de motores brushless industriais.",
    registrationInfo: {
      fee: "R$ 450,00 por robô inscrito",
      deadline: "2025-04-01",
      instructions: "Submissão obrigatória do diagrama elétrico, checklist de fail-safe de rádio e teste de desconexão de bateria.",
      isOpen: false
    },
    regulationDoc: {
      title: "Regulamento Técnico de Segurança e Combate de Robôs 2025.pdf",
      url: "#",
      fileSize: "3.2 MB",
      lastUpdated: "2025-03-10"
    },
    schedule: [
      { time: "08:00", activity: "Inspeção Técnica de Segurança & Pesagem Oficial", location: "Boxes / Pits Técnicos" },
      { time: "10:30", activity: "Início dos Confrontos da Chave Principal", location: "Arena Blindada Central" },
      { time: "15:00", activity: "Repescagem e Quartas de Final", location: "Arena Blindada Central" },
      { time: "18:00", activity: "Finais e Cerimônia de Premiação", location: "Palco Principal da Arena" }
    ],
    sponsorIds: ["sp-01", "sp-02"],
    teamIds: ["team-01", "team-02"],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-03-15T10:00:00Z"
  },
  {
    id: "comp-02",
    slug: "open-brasil-first-robotics-competition-2025",
    name: "Open Brasil FIRST Robotics Competition (FRC Challenge)",
    shortName: "Open Brasil FRC",
    category: "FIRST Robotics Competition (FRC)",
    season: "2025",
    status: "open_registration",
    startDate: "2025-06-12",
    endDate: "2025-06-15",
    location: {
      city: "Campinas",
      state: "SP",
      venue: "Ginásio Poliesportivo de Tecnologia - Polo Universitário"
    },
    description: "Competição internacional de robôs de grande porte (até 55kg) projetados e construídos por equipes de jovens engenheiros. Desafios combinam período autônomo com visão computacional e operação estratégica em alianças de 3 robôs.",
    detailedInfo: "Cada partida tem duração de 2 minutos e 30 segundos, dividida em 15 segundos autônomos guiados por sensores/câmeras e 2 minutos e 15 segundos teleoperados. O evento classifica equipes para o Mundial de Robótica em Houston (EUA).",
    bannerUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    logoUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=300&auto=format&fit=crop",
    organizerName: "Comitê Nacional de Educação STEM & Robótica",
    organizerContact: "frcbrasil@stemrobotics.org",
    teamsCount: 36,
    prizeInfo: "Classificação para o Mundial de Houston (EUA) + Troféus de Engenharia, Inovação em Controle e Impacto Social.",
    registrationInfo: {
      fee: "Inscrição por equipe homologada FIRST",
      deadline: "2025-05-15",
      instructions: "Inscrição através do portal internacional com validação de mentores técnicos e CAD do robô.",
      isOpen: true
    },
    regulationDoc: {
      title: "Manual Oficial da Temporada FRC 2025 - Regras de Arena e Robótica.pdf",
      url: "#",
      fileSize: "8.7 MB",
      lastUpdated: "2025-01-08"
    },
    sponsorIds: ["sp-01"],
    teamIds: ["team-03"],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-15T12:00:00Z",
    updatedAt: "2025-03-12T14:00:00Z"
  },
  {
    id: "comp-03",
    slug: "grand-prix-seguidores-de-linha-sumo-2025",
    name: "Grand Prix Brasileiro de Seguidores de Linha & Sumô 3kg",
    shortName: "GP Linha & Sumô Pro",
    category: "Seguidor de Linha Pro & Sumô Autônomo",
    season: "2025",
    status: "upcoming",
    startDate: "2025-08-22",
    endDate: "2025-08-24",
    location: {
      city: "Curitiba",
      state: "PR",
      venue: "Centro de Convenções Tecnológicas do Paraná"
    },
    description: "Velocidade pura e força autônoma: robôs seguidores de linha atingindo mais de 4 m/s com turbinas de sucção por efeito solo e robôs de sumô blindados com até 150 kgf de força de atrito magnético.",
    detailedInfo: "Cronometragem por sensores a laser de barreira ótica com precisão de milissegundos. Pista oficial com curvas fechadas, cruzamentos e troca de tonalidade. Ringue de sumô em aço carbono com borda de detecção infravermelha.",
    bannerUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop",
    organizerName: "Associação Brasileira de Robótica Autônoma (ABRA)",
    organizerContact: "contato@abrobotica.org.br",
    teamsCount: 40,
    prizeInfo: "R$ 18.000 em instrumentos de bancada (Osciloscópios, Placas de Prototipagem) + Medalhas Oficiais.",
    registrationInfo: {
      fee: "R$ 120,00 por robô / categoria",
      deadline: "2025-08-01",
      isOpen: false
    },
    regulationDoc: {
      title: "Especificações de Pista e Dohyo - Regulamento Oficial de Sumô e Linha 2025.pdf",
      url: "#",
      fileSize: "2.1 MB",
      lastUpdated: "2025-02-15"
    },
    sponsorIds: ["sp-03"],
    teamIds: ["team-04"],
    statusDraft: "published",
    featured: false,
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-03-10T10:00:00Z"
  }
];

export const sampleTeams: Team[] = [
  {
    id: "team-01",
    slug: "valkyrie-combat-robotics",
    name: "Valkyrie Combat Robotics",
    shortName: "Valkyrie",
    badgeUrl: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=300&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    category: "Combate de Robôs (Middleweight 54kg)",
    city: "São Carlos",
    state: "SP",
    foundedYear: "2018",
    season: "2025/2026",
    bio: "Equipe de engenharia mecatrônica focada em robôs de combate de alta energia de impacto. Atual campeã brasileira na categoria Middleweight com o robô 'Ragnarök', equipado com tambor vertical em aço Hardox 500 girando a 11.500 RPM.",
    currentCompetitionIds: ["comp-01"],
    isSeekingSponsorship: true,
    sponsorshipProposal: "Buscamos empresas de usinagem CNC, corte a laser/plasma, fornecedores de baterias LiPo de alta taxa de descarga (C-rate) e patrocinadores master para aplicação na carenagem e macacões de box.",
    members: [
      { id: "m-01", name: "Eng. Lucas 'Torque' Alencar", role: "Piloto Principal & Mecânica Chefe", numberOrNick: "#01", bio: "Especialista em dinâmica de impacto e ligas de aço aeroespacial." },
      { id: "m-02", name: "Beatriz Nogueira", role: "Capitã de Eletrônica & Telemetria", numberOrNick: "#07", bio: "Desenvolvedora dos ESCs de alta potência e sistemas de telemetria sem fio." },
      { id: "m-03", name: "Gabriel Siqueira", role: "Engenheiro de Armas Cinéticas", numberOrNick: "#44", bio: "Responsável pelo balanceamento dinâmico dos tambores de corte." },
      { id: "m-04", name: "Marina Costa", role: "Estrategista de Box & Pit Crew", numberOrNick: "#12" }
    ],
    achievements: [
      { id: "ach-01", title: "Campeão Nacional Middleweight (Ragnarök)", year: "2024", competitionName: "Torneio Nacional de Robôs", placement: "1º Lugar" },
      { id: "ach-02", title: "Prêmio de Maior Nocaute da Temporada (KO em 22s)", year: "2024", competitionName: "Arena de Ferro SP", placement: "Troféu Destaque" },
      { id: "ach-03", title: "Vice-Campeão Featherweight (Valkyrie Mini)", year: "2023", competitionName: "Winter Challenge", placement: "2º Lugar" }
    ],
    officialLinks: {
      instagram: "@valkyrie.robotics",
      contactEmail: "patrocinio@valkyrierobotics.com.br",
      contactPhone: "+55 (16) 99876-5432"
    },
    sponsorIds: ["sp-02"],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-03-14T10:00:00Z"
  },
  {
    id: "team-02",
    slug: "titan-destroyers-robotics",
    name: "Titan Destroyers Combat Team",
    shortName: "Titan Destroyers",
    badgeUrl: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=300&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    category: "Combate de Robôs (Featherweight 13,6kg)",
    city: "São Paulo",
    state: "SP",
    foundedYear: "2020",
    season: "2025",
    bio: "Pioneiros em robôs de combate do tipo Wedge e Flipper pneumático, capazes de arremessar oponentes a mais de 3 metros de altura com pistões de alta pressão a 250 PSI.",
    currentCompetitionIds: ["comp-01"],
    isSeekingSponsorship: true,
    sponsorshipProposal: "Cota para apoio no suprimento de cilindros pneumáticos leves de fibra de carbono e componentes de usinagem rápida.",
    members: [
      { id: "m-05", name: "Felipe 'Pneumático' Ramos", role: "Capitão & Projetista CAD", numberOrNick: "#88" },
      { id: "m-06", name: "Carlos Daniel", role: "Piloto de Arena", numberOrNick: "#10" },
      { id: "m-07", name: "Juliana Prado", role: "Programadora de Rádio & Fail-Safe", numberOrNick: "#03" }
    ],
    achievements: [
      { id: "ach-04", title: "3º Colocado Featherweight", year: "2024", competitionName: "Torneio Nacional de Robôs", placement: "3º Lugar" }
    ],
    officialLinks: {
      instagram: "@titandestroyers",
      contactEmail: "contato@titandestroyers.com"
    },
    sponsorIds: [],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-12T10:00:00Z",
    updatedAt: "2025-03-08T10:00:00Z"
  },
  {
    id: "team-03",
    slug: "titanium-robotics-frc-8920",
    name: "Titanium Robotics (FRC Team #8920)",
    shortName: "Titanium FRC",
    badgeUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=300&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    category: "FIRST Robotics Competition (FRC)",
    city: "Campinas",
    state: "SP",
    foundedYear: "2022",
    season: "2025",
    bio: "Equipe de robótica industrial autônoma de alta complexidade formada por 35 estudantes e mentores da indústria automobilística e aeroespacial. Robô com tração Swerve Drive e visão por IA com AprilTags.",
    currentCompetitionIds: ["comp-02"],
    isSeekingSponsorship: true,
    sponsorshipProposal: "Oportunidades de patrocínio Master e Diamante com inserção de logotipo no chassi do robô para competições no Brasil e no Mundial de Houston (EUA).",
    members: [
      { id: "m-08", name: "Sofia Meirelles", role: "Capitã de Engenharia de Software", numberOrNick: "#24", bio: "Líder da arquitetura de navegação autônoma e odometria." },
      { id: "m-09", name: "Pedro Henrique", role: "Piloto Chefe do Drive Team", numberOrNick: "#77" },
      { id: "m-10", name: "Eng. Roberto Sato", role: "Mentor Técnico Industrial", numberOrNick: "#99" }
    ],
    achievements: [
      { id: "ach-05", title: "Prêmio de Excelência em Engenharia Industrial", year: "2024", competitionName: "Regional de Brasília FRC", placement: "Prêmio Oficial" },
      { id: "ach-06", title: "Aliança Finalista Regional", year: "2024", competitionName: "Open Brasil FRC", placement: "Finalista" }
    ],
    officialLinks: {
      instagram: "@titaniumfrc8920",
      youtube: "titaniumrobotics8920",
      contactEmail: "comercial@titanium8920.org"
    },
    sponsorIds: ["sp-01"],
    statusDraft: "published",
    featured: true,
    createdAt: "2025-01-18T10:00:00Z",
    updatedAt: "2025-03-12T10:00:00Z"
  },
  {
    id: "team-04",
    slug: "cyberpulse-autonomous-trackers",
    name: "CyberPulse Autonomous Line Trackers",
    shortName: "CyberPulse",
    badgeUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=300&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    category: "Seguidor de Linha Pro & Sumô Autônomo",
    city: "Curitiba",
    state: "PR",
    foundedYear: "2019",
    season: "2025",
    bio: "Especialistas em robôs de ultra-alta velocidade para percursos sinuosos. Desenvolvem controladores PID adaptativos em microcontroladores STM32 com turbina de sucção de 85.000 RPM para aderência extrema.",
    currentCompetitionIds: ["comp-03"],
    isSeekingSponsorship: false,
    members: [
      { id: "m-11", name: "Thiago Yamashita", role: "Arquiteto de Controle & Hardware", numberOrNick: "#05" },
      { id: "m-12", name: "Renato Diniz", role: "Especialista em Aerodinâmica e Sensores", numberOrNick: "#11" }
    ],
    achievements: [
      { id: "ach-07", title: "Recorde Brasileiro de Volta (8.94s)", year: "2024", competitionName: "Grand Prix de Robótica", placement: "Recorde Oficial" }
    ],
    officialLinks: {
      instagram: "@cyberpulse.trackers"
    },
    sponsorIds: ["sp-03"],
    statusDraft: "published",
    featured: false,
    createdAt: "2025-01-20T10:00:00Z",
    updatedAt: "2025-03-01T10:00:00Z"
  }
];

export const sampleResults: OfficialResult[] = [
  {
    id: "res-01",
    competitionId: "comp-01",
    stageName: "Chave Eliminatória Principal - Combates Middleweight",
    date: "2025-04-19",
    type: "match",
    matches: [
      {
        teamAId: "team-01",
        teamAName: "Valkyrie Combat Robotics (Ragnarök)",
        teamBId: "team-02",
        teamBName: "Titan Destroyers (Goliath)",
        scoreA: 45,
        scoreB: 12,
        status: "finished",
        timeOrDate: "11:30",
        courtOrLocation: "Arena Blindada Polycarbonate",
        winnerTeamId: "team-01",
        notes: "Nocaute Técnico (KO) aos 1m48s. O tambor de impacto do Ragnarök danificou a esteira de tração esquerda do adversário."
      },
      {
        teamAId: "team-02",
        teamAName: "Titan Destroyers",
        teamBId: "team-01",
        teamBName: "Valkyrie Combat Robotics",
        scoreA: 28,
        scoreB: 33,
        status: "finished",
        timeOrDate: "16:00",
        courtOrLocation: "Arena Blindada Polycarbonate",
        winnerTeamId: "team-01",
        notes: "Decisão por pontos unânime dos juízes técnicos (Dano: 18x7 | Agressividade: 9x11 | Controle: 6x10)."
      }
    ],
    statusDraft: "published",
    createdAt: "2025-04-19T18:00:00Z"
  },
  {
    id: "res-02",
    competitionId: "comp-01",
    stageName: "Ranking Oficial Auditado da Temporada",
    date: "2025-04-20",
    type: "ranking",
    ranking: [
      { rank: 1, teamId: "team-01", teamOrParticipantName: "Valkyrie Combat Robotics", points: 120, matchesPlayed: 4, wins: 4, losses: 0, scoreDifference: "+82 pts (4 KOs)", notes: "Classificado para a SuperFinal" },
      { rank: 2, teamId: "team-02", teamOrParticipantName: "Titan Destroyers Combat Team", points: 85, matchesPlayed: 4, wins: 3, losses: 1, scoreDifference: "+34 pts", notes: "Finalista Chave B" },
      { rank: 3, teamId: "team-04", teamOrParticipantName: "CyberPulse Hardware", points: 40, matchesPlayed: 3, wins: 1, losses: 2, scoreDifference: "-15 pts" }
    ],
    notes: "Pontuações homologadas pela Comissão de Arbitragem Técnica da LBRC com laudos de telemetria e inspeção pós-combate.",
    statusDraft: "published",
    createdAt: "2025-04-20T20:00:00Z"
  }
];

export const sampleSponsors: Sponsor[] = [
  {
    id: "sp-01",
    name: "TechTronix Automação & Robótica",
    category: "official",
    tierName: "Patrocinador Master de Arena",
    logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&auto=format&fit=crop",
    websiteUrl: "https://techtronix.com.br",
    active: true,
    bio: "Líder no fornecimento de controladores lógicos programáveis, servomotores industriais e sensores para robótica autônoma.",
    targetCompetitionIds: ["comp-01", "comp-02"]
  },
  {
    id: "sp-02",
    name: "Hardox Aços Especiais & Usinagem CNC",
    category: "partner",
    tierName: "Fornecedor Oficial de Blindagens & Metais",
    logoUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=200&auto=format&fit=crop",
    websiteUrl: "https://hardoxmetais.com.br",
    active: true,
    bio: "Fornecimento de chapas de aço anti-desgaste de ultra-alta dureza para a construção de robôs de combate.",
    targetTeamIds: ["team-01"]
  },
  {
    id: "sp-03",
    name: "NanoVolt Baterias de Alta Descarga",
    category: "supporter",
    tierName: "Apoiador Técnico de Eletrônica",
    active: true,
    websiteUrl: "https://nanovolt.com.br",
    targetCompetitionIds: ["comp-03"]
  }
];

export const sampleOpportunities: SponsorshipOpportunity[] = [
  {
    id: "opp-01",
    title: "Naming Rights da Arena Principal de Combate de Robôs",
    type: "naming_rights",
    targetEntityId: "comp-01",
    targetEntityName: "Torneio Nacional de Combate de Robôs (Arena Hardox)",
    description: "Associação direta do nome da sua marca à arena de combate mais assistida da América Latina ('Arena [Sua Marca] de Robótica'). Marca gravada no piso de combate, nas paredes blindadas de policarbonato e em 100% da transmissão ao vivo com replay em super slow-motion.",
    benefitsList: [
      "Aplicação da marca no círculo central da arena de aço e nas proteções de vidro blindado",
      "Inserção nos replays de nocaute e telemetria da transmissão ao vivo no YouTube/Twitch",
      "Estande de 36m² nos boxes/pits para demonstração de produtos e recrutamento de talentos de engenharia",
      "Direito de entregar o Troféu de Ouro de Campeão Nacional na cerimônia de encerramento"
    ],
    estimatedInvestmentRange: "R$ 40.000 - R$ 80.000 (Cota Master de Temporada)",
    active: true,
    statusDraft: "published",
    createdAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "opp-02",
    title: "Patrocínio de Blindagem Master — Robô Ragnarök (Valkyrie)",
    type: "uniform",
    targetEntityId: "team-01",
    targetEntityName: "Valkyrie Combat Robotics",
    description: "Espaço principal na blindagem frontal e superior do robô campeão nacional Middleweight, além do logo em destaque nos macacões de segurança da equipe de box durante as transmissões oficiais.",
    benefitsList: [
      "Gravação a laser da logomarca na chapa de titânio/Hardox do robô",
      "Espaço frontal e dorsal nos uniformes e coletes de segurança dos engenheiros",
      "Menção em vídeos técnicos de bancada com mais de 250 mil visualizações acumuladas",
      "Presença do robô em feiras de tecnologia e estandes institucionais da marca patrocinadora"
    ],
    estimatedInvestmentRange: "Cotas a partir de R$ 12.000 / temporada",
    active: true,
    statusDraft: "published",
    createdAt: "2025-01-20T10:00:00Z"
  },
  {
    id: "opp-03",
    title: "Cota de Inovação & Recrutamento STEM — Open Brasil FRC",
    type: "activation",
    targetEntityId: "comp-02",
    targetEntityName: "Open Brasil FIRST Robotics Competition (FRC Challenge)",
    description: "Conecte sua empresa a mais de 800 jovens prodígios em programação, CAD, mecatrônica e inteligência artificial. Espaço exclusivo de hackathon e recrutamento nos boxes do evento.",
    benefitsList: [
      "Painel de recrutamento com acesso aos currículos e projetos das equipes participantes",
      "Direito a nomear o Prêmio Oficial de Inovação em Algoritmos e Controle",
      "Espaço para ativação de produtos e distribuição de kits para estudantes e mentores"
    ],
    estimatedInvestmentRange: "Cotas a partir de R$ 8.500",
    active: true,
    statusDraft: "published",
    createdAt: "2025-02-01T10:00:00Z"
  }
];

export const sampleStories: Story[] = [
  {
    id: "story-01",
    slug: "da-usinagem-de-madrugada-ao-nocaute-perfeito",
    title: "Da bancada de solda ao nocaute perfeito: como a equipe Valkyrie projetou um tambor de 12.000 RPM",
    subtitle: "Três meses de simulações em elementos finitos, aços endurecidos e a busca incansável pela rigidez estrutural perfeita.",
    author: "Redação de Engenharia & Tecnologia",
    authorRole: "Equipe Editorial Técnica",
    date: "2025-03-18",
    coverUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    content: "No combate de robôs de 54kg, as forças em jogo são colossais. Quando dois robôs com tambores de impacto girando a 12.000 rotações por minuto colidem, a liberação de energia cinética equivale ao impacto de um projétil de artilharia pesada.\n\nPara a equipe Valkyrie, vencer o campeonato nacional não foi sorte. Foram mais de 400 horas de simulações em software CAD e análise estrutural de tensão (FEA), usinagem de precisão em blocos maciços de aço Hardox e centenas de testes de bancada nos mancais e rolamentos cerâmicos.\n\n'Muita gente olha para a arena e vê metal se chocando. Nós vemos pura física aplicada, controle de vibração harmônica e engenharia de materiais no limite absoluto', explica o projetista Lucas Alencar.",
    relatedCompetitionId: "comp-01",
    relatedTeamId: "team-01",
    featured: true,
    statusDraft: "published",
    createdAt: "2025-03-18T10:00:00Z"
  }
];

export const sampleMetrics: ImpactMetric[] = [
  {
    id: "met-01",
    label: "Robôs Homologados e Inspecionados",
    value: 94,
    unit: "+",
    description: "Robôs com laudo de segurança e fail-safe aprovados nas categorias oficiais",
    verifiedSource: "Livro de Inspeção Técnica da Liga Brasileira de Robótica 2025",
    visible: true
  },
  {
    id: "met-02",
    label: "Engenheiros, Programadores e Atletas STEM",
    value: 620,
    unit: "+",
    description: "Competidores ativos inscritos em equipes de robótica no país",
    verifiedSource: "Censo Nacional de Equipes de Robótica Homologadas",
    visible: true
  },
  {
    id: "met-03",
    label: "Torneios e Arenas Blindadas Auditadas",
    value: 24,
    unit: "",
    description: "Competições oficiais com súmulas técnicas e cronometragem homologada",
    verifiedSource: "Registro Oficial de Competições de Robótica",
    visible: true
  }
];

export const sampleLeads: SponsorshipLead[] = [
  {
    id: "lead-01",
    companyName: "CyberDyne Componentes Mecatrônicos S.A.",
    contactPerson: "Mariana Siqueira",
    email: "mariana.siqueira@cyberdyne.com.br",
    phone: "(11) 98234-5678",
    website: "https://cyberdyne.com.br",
    interestType: "competition",
    targetCompetitionId: "comp-01",
    targetCompetitionName: "Torneio Nacional de Combate de Robôs (Arena Hardox)",
    investmentRange: "R$ 25.000 - R$ 50.000",
    message: "Fabricamos mancais, redutores planetários e drivers de motor. Queremos patrocinar a Arena Principal e fornecer kits para as equipes finalistas.",
    status: "in_contact",
    internalNotes: "Enviada proposta de Naming Rights da Arena Blindada e agendada call com o comitê técnico.",
    createdAt: "2025-03-19T14:30:00Z"
  }
];

export const sampleContacts: ContactMessage[] = [
  {
    id: "cont-01",
    name: "Prof. Dr. Eduardo Camargo",
    email: "eduardo.camargo@laboratoriorobotica.edu.br",
    phone: "(19) 99123-8899",
    subject: "Credenciamento de Equipe Universitária de Combate e FRC",
    message: "Gostaríamos de cadastrar a nova equipe de robótica autônoma do laboratório para homologação e submissão nas próximas etapas.",
    status: "unread",
    createdAt: "2025-03-20T09:15:00Z"
  }
];
