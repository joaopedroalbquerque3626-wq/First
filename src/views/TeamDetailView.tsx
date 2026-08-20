import React from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { EmptyState } from '../components/common/EmptyState';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Trophy,
  Award,
  Sparkles,
  ArrowUpRight,
  Mail,
  Phone,
  Instagram,
  Youtube,
  Globe,
  Bot,
  Cpu,
  Wrench
} from 'lucide-react';

export const TeamDetailView: React.FC = () => {
  const { currentSlug, navigate } = useNavigation();
  const {
    getPublishedTeamList,
    getPublishedCompetitions,
    getActiveSponsors,
  } = useData();

  const teams = getPublishedTeamList();
  const team = teams.find((t) => t.slug === currentSlug || t.id === currentSlug);

  if (!team) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FDFCF8]">
        <EmptyState
          title="Equipe de robótica não encontrada"
          message="A equipe solicitada não existe ou ainda não foi publicada no diretório oficial de robótica."
          actionLabel="Voltar para todas as equipes"
          onAction={() => navigate('teams')}
        />
      </div>
    );
  }

  // Related competitions
  const allCompetitions = getPublishedCompetitions();
  const teamCompetitions = allCompetitions.filter((c) =>
    team.currentCompetitionIds?.includes(c.id) || c.teamIds?.includes(team.id)
  );

  // Team sponsors
  const allSponsors = getActiveSponsors();
  const teamSponsors = allSponsors.filter((s) =>
    team.sponsorIds?.includes(s.id) || s.targetTeamIds?.includes(team.id)
  );

  return (
    <div className="min-h-screen pb-20 bg-[#FDFCF8] text-[#1A1A1A]">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#1A1A1A]/10 bg-[#F6F4EE] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate('teams')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Equipes</span>
          </button>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#B44D2E] font-sans">
            {team.category} • {team.city}/{team.state}
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative border-b border-[#1A1A1A]/10 bg-[#FFFFFF] py-12 lg:py-16 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider bg-[#F6F4EE] text-[#B44D2E] border border-[#1A1A1A]/10 font-sans">
                  {team.category}
                </span>
                {team.season && (
                  <span className="text-xs text-[#1A1A1A]/60 font-serif font-semibold">
                    Temporada {team.season}
                  </span>
                )}
                {team.foundedYear && (
                  <span className="text-xs text-[#1A1A1A]/60 font-sans">
                    Fundada em {team.foundedYear}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#F6F4EE] border border-[#1A1A1A]/10 overflow-hidden flex items-center justify-center shrink-0">
                  {team.badgeUrl ? (
                    <img
                      src={team.badgeUrl}
                      alt={team.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Bot className="w-10 h-10 text-[#1A1A1A]/40" />
                  )}
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase text-[#1A1A1A] leading-tight">
                  {team.name}
                </h1>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1A1A1A]/60 font-sans">
                <MapPin className="w-4 h-4 text-[#B44D2E]" />
                <span>
                  {team.city}, {team.state}
                </span>
              </div>

              {team.bio && (
                <p className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed max-w-3xl pt-2 font-sans">
                  {team.bio}
                </p>
              )}
            </div>

            {/* Banner or Cover Photo if provided */}
            {team.bannerUrl && (
              <div className="lg:col-span-4">
                <div className="border border-[#1A1A1A]/10 overflow-hidden bg-[#F6F4EE] shadow-sm">
                  <img
                    src={team.bannerUrl}
                    alt={`Foto da bancada/robô ${team.name}`}
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* SPONSORSHIP CALLOUT (If Team is seeking sponsorship) */}
        {team.isSeekingSponsorship && (
          <section className="border border-[#B44D2E] bg-[#1A1A1A] text-[#FDFCF8] p-8 sm:p-10 space-y-4 relative shadow-lg">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#B44D2E] font-sans">
              <Sparkles className="w-4 h-4" />
              <span>OPORTUNIDADE DE PATROCÍNIO TÉCNICO / MASTER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#FDFCF8] leading-tight">
              ESTA EQUIPE ESTÁ BUSCANDO <br />
              <span className="font-serif italic font-normal text-[#B44D2E]">PATROCÍNIO PARA SUA TEMPORADA.</span>
            </h2>

            {team.sponsorshipProposal ? (
              <p className="text-sm sm:text-base text-[#FDFCF8]/80 max-w-2xl leading-relaxed font-sans">
                {team.sponsorshipProposal}
              </p>
            ) : (
              <p className="text-sm sm:text-base text-[#FDFCF8]/70 max-w-2xl leading-relaxed font-sans">
                A equipe está com cotas de apoio abertas para usinagem de blindagens, baterias LiPo de alta descarga, motores brushless, uniformes de box e transporte para os campeonatos nacionais.
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={() => navigate('sponsorship')}
                className="px-8 py-4 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all inline-flex items-center gap-2"
              >
                <span>PATROCINAR ESTA EQUIPE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Members & Competitions */}
          <div className="lg:col-span-8 space-y-10">
            {/* Team Members / Athletes */}
            {team.members && team.members.length > 0 && (
              <section className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
                  <h3 className="text-xl font-display font-bold uppercase text-[#1A1A1A]">
                    Pilotos, Projetistas & Engenheiros ({team.members.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 border border-[#1A1A1A]/10 bg-[#F6F4EE] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-base text-[#1A1A1A] uppercase">
                          {member.name}
                        </span>
                        {member.numberOrNick && (
                          <span className="text-xs font-serif font-bold text-[#B44D2E]">
                            {member.numberOrNick}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#B44D2E] uppercase font-bold tracking-wider font-sans">
                        {member.role}
                      </div>
                      {member.bio && (
                        <p className="text-xs text-[#1A1A1A]/70 pt-1 leading-relaxed font-sans">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements / Conquistas */}
            {team.achievements && team.achievements.length > 0 && (
              <section className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
                  <h3 className="text-xl font-display font-bold uppercase text-[#1A1A1A]">
                    Títulos & Histórico de Arena
                  </h3>
                </div>

                <div className="space-y-3">
                  {team.achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="p-4 border border-[#1A1A1A]/10 bg-[#F6F4EE] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-[#B44D2E]" />
                          <span className="font-display font-bold text-lg uppercase text-[#1A1A1A]">
                            {ach.title}
                          </span>
                        </div>
                        <div className="text-xs text-[#1A1A1A]/60 font-sans">
                          Torneio: {ach.competitionName} • Ano: {ach.year}
                        </div>
                        {ach.description && (
                          <p className="text-xs text-[#1A1A1A]/70 font-sans">{ach.description}</p>
                        )}
                      </div>
                      <span className="px-3 py-1 bg-[#1A1A1A] font-serif font-bold text-xs text-[#FDFCF8] uppercase shrink-0">
                        {ach.placement}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Competitions Participated */}
            {teamCompetitions.length > 0 && (
              <section className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
                  <h3 className="text-xl font-display font-bold uppercase text-[#1A1A1A]">
                    Competições no Circuito
                  </h3>
                </div>

                <div className="space-y-3">
                  {teamCompetitions.map((comp) => (
                    <div
                      key={comp.id}
                      onClick={() => navigate('competition-detail', comp.slug)}
                      className="p-4 border border-[#1A1A1A]/10 bg-[#F6F4EE] hover:border-[#B44D2E] cursor-pointer transition-all flex items-center justify-between gap-4 group"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B44D2E] font-sans tracking-wider">
                          {comp.category} • Temporada {comp.season}
                        </span>
                        <h4 className="text-lg font-display font-bold uppercase text-[#1A1A1A] group-hover:text-[#B44D2E] transition-colors">
                          {comp.name}
                        </h4>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]/40 group-hover:text-[#B44D2E]" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sponsors & Official Contacts */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sponsors of the Team (Apoiado Por) */}
            {teamSponsors.length > 0 && (
              <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B44D2E] font-sans">
                  PATROCINADORES DA EQUIPE
                </span>
                <div className="space-y-3">
                  {teamSponsors.map((sp) => (
                    <div
                      key={sp.id}
                      className="p-3 border border-[#1A1A1A]/10 bg-[#F6F4EE] flex items-center gap-3"
                    >
                      {sp.logoUrl && (
                        <img
                          src={sp.logoUrl}
                          alt={sp.name}
                          className="h-6 w-auto object-contain"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div>
                        <span className="text-xs font-bold text-[#1A1A1A] uppercase block font-sans">
                          {sp.name}
                        </span>
                        <span className="text-[10px] uppercase text-[#1A1A1A]/60 font-sans">
                          {sp.tierName || 'Patrocinador Técnico'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Links & Contact */}
            {team.officialLinks && Object.values(team.officialLinks).some(Boolean) && (
              <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 font-sans">
                  CANAIS OFICIAIS DA BANCADA
                </span>
                <div className="space-y-2 text-xs font-sans">
                  {team.officialLinks.contactEmail && (
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Mail className="w-3.5 h-3.5 text-[#B44D2E]" />
                      <a
                        href={`mailto:${team.officialLinks.contactEmail}`}
                        className="hover:underline break-all"
                      >
                        {team.officialLinks.contactEmail}
                      </a>
                    </div>
                  )}

                  {team.officialLinks.contactPhone && (
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Phone className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      <span>{team.officialLinks.contactPhone}</span>
                    </div>
                  )}

                  {team.officialLinks.instagram && (
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Instagram className="w-3.5 h-3.5 text-[#B44D2E]" />
                      <span>{team.officialLinks.instagram}</span>
                    </div>
                  )}

                  {team.officialLinks.youtube && (
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Youtube className="w-3.5 h-3.5 text-[#B44D2E]" />
                      <span>{team.officialLinks.youtube}</span>
                    </div>
                  )}

                  {team.officialLinks.website && (
                    <div className="flex items-center gap-2 text-[#1A1A1A]">
                      <Globe className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      <a
                        href={team.officialLinks.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline break-all"
                      >
                        {team.officialLinks.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
