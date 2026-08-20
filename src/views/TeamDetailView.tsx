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
  Globe
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
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <EmptyState
          title="Equipe não encontrada"
          message="A equipe solicitada não existe ou ainda não foi publicada no diretório oficial."
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
    <div className="min-h-screen pb-20">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#77746E]/20 bg-[#121212] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate('teams')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#77746E] hover:text-[#F1EDE4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Equipes</span>
          </button>
          <div className="text-xs uppercase font-bold text-[#E95D2A]">
            {team.category} • {team.city}/{team.state}
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative border-b border-[#77746E]/20 bg-[#151515] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-xs uppercase font-bold tracking-wider bg-[#252422] text-[#B9D531] border border-[#77746E]/30">
                  {team.category}
                </span>
                {team.season && (
                  <span className="text-xs text-[#77746E] font-semibold">
                    Temporada {team.season}
                  </span>
                )}
                {team.foundedYear && (
                  <span className="text-xs text-[#77746E]">
                    Fundada em {team.foundedYear}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#252422] border border-[#77746E]/30 overflow-hidden flex items-center justify-center cut-corner shrink-0">
                  {team.badgeUrl ? (
                    <img
                      src={team.badgeUrl}
                      alt={team.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Users className="w-10 h-10 text-[#77746E]" />
                  )}
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase text-[#F1EDE4] leading-tight">
                  {team.name}
                </h1>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#77746E]">
                <MapPin className="w-4 h-4 text-[#E95D2A]" />
                <span>
                  {team.city}, {team.state}
                </span>
              </div>

              {team.bio && (
                <p className="text-sm sm:text-base text-[#F1EDE4]/80 leading-relaxed max-w-3xl pt-2">
                  {team.bio}
                </p>
              )}
            </div>

            {/* Banner or Cover Photo if provided */}
            {team.bannerUrl && (
              <div className="lg:col-span-4">
                <div className="border border-[#77746E]/30 overflow-hidden bg-[#181716]">
                  <img
                    src={team.bannerUrl}
                    alt={`Foto da equipe ${team.name}`}
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
          <section className="border-2 border-[#E95D2A] bg-[#1a1715] p-8 sm:p-10 space-y-4 relative cut-corner">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#B9D531]">
              <Sparkles className="w-4 h-4" />
              <span>OPORTUNIDADE COMERCIAL DIRETA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-[#F1EDE4] leading-tight">
              ESTE TIME ESTÁ PROCURANDO <br />
              <span className="text-[#E95D2A]">QUEM ACREDITE NELE.</span>
            </h2>

            {team.sponsorshipProposal ? (
              <p className="text-sm sm:text-base text-[#F1EDE4]/80 max-w-2xl leading-relaxed">
                {team.sponsorshipProposal}
              </p>
            ) : (
              <p className="text-sm sm:text-base text-[#77746E] max-w-2xl leading-relaxed">
                A equipe está com cotas de apoio abertas para uniforme, transporte, inscrições em etapas e materiais esportivos para esta temporada.
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={() => navigate('sponsorship')}
                className="px-8 py-4 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] font-display font-bold text-lg uppercase tracking-wider transition-all cut-corner inline-flex items-center gap-2"
              >
                <span>PATROCINAR ESTA EQUIPE</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Members & Competitions */}
          <div className="lg:col-span-8 space-y-10">
            {/* Team Members / Athletes */}
            {team.members && team.members.length > 0 && (
              <section className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#77746E]/20 pb-3">
                  <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                    Integrantes & Atletas Homologados ({team.members.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 border border-[#77746E]/20 bg-[#141312] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-lg text-[#F1EDE4] uppercase">
                          {member.name}
                        </span>
                        {member.numberOrNick && (
                          <span className="text-xs font-bold text-[#E95D2A]">
                            {member.numberOrNick}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#B9D531] uppercase font-semibold">
                        {member.role}
                      </div>
                      {member.bio && (
                        <p className="text-xs text-[#77746E] pt-1 leading-relaxed">
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
              <section className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#77746E]/20 pb-3">
                  <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                    Conquistas & Histórico Oficial
                  </h3>
                </div>

                <div className="space-y-3">
                  {team.achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="p-4 border border-[#77746E]/20 bg-[#141312] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-[#B9D531]" />
                          <span className="font-display font-bold text-lg uppercase text-[#F1EDE4]">
                            {ach.title}
                          </span>
                        </div>
                        <div className="text-xs text-[#77746E]">
                          Torneio: {ach.competitionName} • Ano: {ach.year}
                        </div>
                        {ach.description && (
                          <p className="text-xs text-[#77746E]">{ach.description}</p>
                        )}
                      </div>
                      <span className="px-3 py-1 bg-[#252422] border border-[#77746E]/40 font-display font-bold text-sm text-[#E95D2A] uppercase shrink-0">
                        {ach.placement}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Competitions Participated */}
            {teamCompetitions.length > 0 && (
              <section className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#77746E]/20 pb-3">
                  <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                    Competições no Circuito
                  </h3>
                </div>

                <div className="space-y-3">
                  {teamCompetitions.map((comp) => (
                    <div
                      key={comp.id}
                      onClick={() => navigate('competition-detail', comp.slug)}
                      className="p-4 border border-[#77746E]/20 bg-[#141312] hover:border-[#E95D2A] cursor-pointer transition-all flex items-center justify-between gap-4 group"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B9D531]">
                          {comp.category} • Temporada {comp.season}
                        </span>
                        <h4 className="text-lg font-display font-bold uppercase text-[#F1EDE4] group-hover:text-[#E95D2A] transition-colors">
                          {comp.name}
                        </h4>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#77746E] group-hover:text-[#E95D2A]" />
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
              <div className="border border-[#77746E]/30 bg-[#1a1918] p-6 space-y-4">
                <span className="text-xs uppercase font-bold tracking-widest text-[#B9D531]">
                  APOIADO POR
                </span>
                <div className="space-y-3">
                  {teamSponsors.map((sp) => (
                    <div
                      key={sp.id}
                      className="p-3 border border-[#77746E]/20 bg-[#141312] flex items-center gap-3"
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
                        <span className="text-xs font-bold text-[#F1EDE4] uppercase block">
                          {sp.name}
                        </span>
                        <span className="text-[10px] uppercase text-[#77746E]">
                          {sp.tierName || 'Patrocinador'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Links & Contact */}
            {team.officialLinks && Object.values(team.officialLinks).some(Boolean) && (
              <div className="border border-[#77746E]/30 bg-[#1a1918] p-6 space-y-4">
                <span className="text-xs uppercase font-bold tracking-widest text-[#77746E]">
                  CANAIS OFICIAIS DA EQUIPE
                </span>
                <div className="space-y-2 text-xs">
                  {team.officialLinks.contactEmail && (
                    <div className="flex items-center gap-2 text-[#F1EDE4]">
                      <Mail className="w-3.5 h-3.5 text-[#E95D2A]" />
                      <a
                        href={`mailto:${team.officialLinks.contactEmail}`}
                        className="hover:underline break-all"
                      >
                        {team.officialLinks.contactEmail}
                      </a>
                    </div>
                  )}

                  {team.officialLinks.contactPhone && (
                    <div className="flex items-center gap-2 text-[#F1EDE4]">
                      <Phone className="w-3.5 h-3.5 text-[#B9D531]" />
                      <span>{team.officialLinks.contactPhone}</span>
                    </div>
                  )}

                  {team.officialLinks.instagram && (
                    <div className="flex items-center gap-2 text-[#F1EDE4]">
                      <Instagram className="w-3.5 h-3.5 text-[#E95D2A]" />
                      <span>{team.officialLinks.instagram}</span>
                    </div>
                  )}

                  {team.officialLinks.youtube && (
                    <div className="flex items-center gap-2 text-[#F1EDE4]">
                      <Youtube className="w-3.5 h-3.5 text-[#E95D2A]" />
                      <span>{team.officialLinks.youtube}</span>
                    </div>
                  )}

                  {team.officialLinks.website && (
                    <div className="flex items-center gap-2 text-[#F1EDE4]">
                      <Globe className="w-3.5 h-3.5 text-[#B9D531]" />
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
