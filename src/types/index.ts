export type PublicationStatus = 'draft' | 'published' | 'archived';

export type CompetitionStatus = 'open_registration' | 'upcoming' | 'ongoing' | 'completed';

export type SponsorCategory = 'official' | 'sponsor' | 'partner' | 'supporter';

export interface RegulationDoc {
  title: string;
  url?: string;
  content?: string;
  fileSize?: string;
  lastUpdated?: string;
}

export interface RegistrationInfo {
  fee?: string;
  deadline?: string;
  link?: string;
  instructions?: string;
  isOpen: boolean;
}

export interface Competition {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  category: string; // e.g. "Basquete 3x3", "Street Dance", "Skate Street", "Robótica", "Futsal"
  season: string; // e.g. "2025/2026"
  status: CompetitionStatus;
  startDate?: string;
  endDate?: string;
  location: {
    city: string;
    state: string;
    venue?: string;
  };
  description?: string;
  detailedInfo?: string;
  bannerUrl?: string;
  logoUrl?: string;
  organizerName?: string;
  organizerContact?: string;
  teamsCount?: number;
  prizeInfo?: string;
  registrationInfo?: RegistrationInfo;
  regulationDoc?: RegulationDoc;
  schedule?: { time: string; activity: string; location?: string }[];
  sponsorIds?: string[];
  teamIds?: string[];
  statusDraft: PublicationStatus;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string; // e.g. "Capitão", "Armador", "Dançarino", "Técnico", "Atleta"
  numberOrNick?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  competitionName: string;
  placement: string; // e.g. "Campeão", "Vice-Campeão", "3º Lugar", "Destaque"
  description?: string;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  badgeUrl?: string;
  bannerUrl?: string;
  category: string;
  city: string;
  state: string;
  foundedYear?: string;
  season?: string;
  bio?: string;
  currentCompetitionIds?: string[];
  isSeekingSponsorship: boolean;
  sponsorshipProposal?: string;
  members?: TeamMember[];
  achievements?: Achievement[];
  officialLinks?: {
    instagram?: string;
    youtube?: string;
    website?: string;
    contactEmail?: string;
    contactPhone?: string;
  };
  sponsorIds?: string[];
  statusDraft: PublicationStatus;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MatchScore {
  teamAId: string;
  teamAName: string;
  teamBId: string;
  teamBName: string;
  scoreA: string | number;
  scoreB: string | number;
  status: 'scheduled' | 'live' | 'finished';
  timeOrDate?: string;
  courtOrLocation?: string;
  winnerTeamId?: string;
  notes?: string;
}

export interface RankingRow {
  rank: number;
  teamId?: string;
  teamOrParticipantName: string;
  points?: string | number;
  matchesPlayed?: number;
  wins?: number;
  losses?: number;
  draws?: number;
  scoreDifference?: string | number;
  notes?: string;
}

export interface OfficialResult {
  id: string;
  competitionId: string;
  stageName: string; // e.g. "Fase de Grupos - Rodada 1", "Quartas de Final", "Classificação Geral"
  date: string;
  type: 'match' | 'ranking';
  matches?: MatchScore[];
  ranking?: RankingRow[];
  notes?: string;
  statusDraft: PublicationStatus;
  createdAt: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  category: SponsorCategory;
  tierName?: string; // e.g. "Apresentador Oficial", "Fornecedor de Material", "Parceiro de Mídia"
  active: boolean;
  bio?: string;
  targetCompetitionIds?: string[];
  targetTeamIds?: string[];
}

export interface SponsorshipOpportunity {
  id: string;
  title: string;
  type: 'competition' | 'team' | 'naming_rights' | 'uniform' | 'physical_space' | 'broadcast' | 'activation' | 'institutional';
  targetEntityId?: string;
  targetEntityName?: string;
  description: string;
  benefitsList: string[];
  estimatedInvestmentRange?: string;
  active: boolean;
  statusDraft: PublicationStatus;
  createdAt: string;
}

export interface SponsorshipLead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  interestType: 'competition' | 'team' | 'institutional' | 'custom';
  targetCompetitionId?: string;
  targetCompetitionName?: string;
  targetTeamId?: string;
  targetTeamName?: string;
  targetOpportunityId?: string;
  investmentRange?: string;
  message: string;
  status: 'new' | 'in_contact' | 'negotiation' | 'approved' | 'declined';
  internalNotes?: string;
  createdAt: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author?: string;
  authorRole?: string;
  date: string;
  coverUrl?: string;
  content: string;
  relatedCompetitionId?: string;
  relatedTeamId?: string;
  featured: boolean;
  statusDraft: PublicationStatus;
  createdAt: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  verifiedSource?: string;
  visible: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface PlatformSettings {
  platformName: string;
  tagline: string;
  manifestoTitle: string;
  manifestoText: string;
  aboutText: string;
  aboutMission?: string;
  aboutPillars?: { title: string; desc: string }[];
  officialContact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  allowPublicSubmissions: boolean;
}
