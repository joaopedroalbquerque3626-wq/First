import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Trophy,
  FileText,
  Download,
  Building,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Bot,
  Cpu,
  ShieldCheck
} from 'lucide-react';

export const CompetitionDetailView: React.FC = () => {
  const { currentSlug, navigate } = useNavigation();
  const {
    getPublishedCompetitions,
    getPublishedTeamList,
    getPublishedResults,
    getActiveSponsors,
    getActiveOpportunities,
  } = useData();

  const competitions = getPublishedCompetitions();
  const competition = competitions.find((c) => c.slug === currentSlug || c.id === currentSlug);

  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'results' | 'regulation' | 'sponsorship'>('overview');

  if (!competition) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FDFCF8]">
        <EmptyState
          title="Competição não encontrada"
          message="O torneio de robótica solicitado não existe ou ainda não foi homologado no circuito oficial."
          actionLabel="Voltar para todas as competições"
          onAction={() => navigate('competitions')}
        />
      </div>
    );
  }

  // Related data
  const allTeams = getPublishedTeamList();
  const participatingTeams = allTeams.filter((t) =>
    competition.teamIds?.includes(t.id) || t.currentCompetitionIds?.includes(competition.id)
  );

  const competitionResults = getPublishedResults(competition.id);
  const allSponsors = getActiveSponsors();
  const competitionSponsors = allSponsors.filter((s) =>
    competition.sponsorIds?.includes(s.id) || s.targetCompetitionIds?.includes(competition.id)
  );

  const allOpportunities = getActiveOpportunities();
  const competitionOpportunities = allOpportunities.filter(
    (o) => o.targetEntityId === competition.id || o.targetEntityName === competition.name
  );

  return (
    <div className="min-h-screen pb-20 bg-[#FDFCF8] text-[#1A1A1A]">
      {/* Top Breadcrumb / Back Bar */}
      <div className="border-b border-[#1A1A1A]/10 bg-[#F6F4EE] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate('competitions')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Competições</span>
          </button>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#B44D2E] font-sans">
            {competition.category} • Temporada {competition.season}
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative border-b border-[#1A1A1A]/10 bg-[#FFFFFF] py-12 lg:py-16 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={competition.status} />
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#F6F4EE] text-[#B44D2E] border border-[#1A1A1A]/10 font-sans">
                  {competition.category}
                </span>
                <span className="text-xs text-[#1A1A1A]/60 font-serif">
                  Temporada {competition.season}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tight leading-tight">
                {competition.name}
              </h1>

              {competition.description && (
                <p className="text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed max-w-3xl font-sans">
                  {competition.description}
                </p>
              )}

              {/* Key metadata chips */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#1A1A1A]/70 font-sans">
                <div className="flex items-center gap-1.5 text-[#1A1A1A]">
                  <MapPin className="w-4 h-4 text-[#B44D2E]" />
                  <span>
                    {competition.location.city}, {competition.location.state}
                    {competition.location.venue ? ` • ${competition.location.venue}` : ''}
                  </span>
                </div>

                {competition.startDate && (
                  <div className="flex items-center gap-1.5 text-[#1A1A1A]">
                    <Calendar className="w-4 h-4 text-[#1A1A1A]" />
                    <span>
                      {new Date(competition.startDate).toLocaleDateString('pt-BR')}
                      {competition.endDate
                        ? ` até ${new Date(competition.endDate).toLocaleDateString('pt-BR')}`
                        : ''}
                    </span>
                  </div>
                )}

                {competition.organizerName && (
                  <div className="flex items-center gap-1.5 text-[#1A1A1A]/60">
                    <Building className="w-4 h-4" />
                    <span>Org: {competition.organizerName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Banner Cover if present */}
            {competition.bannerUrl && (
              <div className="lg:col-span-4">
                <div className="border border-[#1A1A1A]/10 overflow-hidden bg-[#F6F4EE] shadow-sm">
                  <img
                    src={competition.bannerUrl}
                    alt={`Capa ${competition.name}`}
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-30 bg-[#FDFCF8] border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto space-x-2 py-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors font-sans ${
              activeTab === 'overview'
                ? 'bg-[#1A1A1A] text-[#FDFCF8]'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] bg-[#F6F4EE]'
            }`}
          >
            Visão Geral & Arena
          </button>

          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors font-sans ${
              activeTab === 'teams'
                ? 'bg-[#1A1A1A] text-[#FDFCF8]'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] bg-[#F6F4EE]'
            }`}
          >
            Robôs & Equipes ({participatingTeams.length})
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors font-sans ${
              activeTab === 'results'
                ? 'bg-[#1A1A1A] text-[#FDFCF8]'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] bg-[#F6F4EE]'
            }`}
          >
            Súmulas & Placares ({competitionResults.length})
          </button>

          {competition.regulationDoc && (
            <button
              onClick={() => setActiveTab('regulation')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors font-sans ${
                activeTab === 'regulation'
                  ? 'bg-[#1A1A1A] text-[#FDFCF8]'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] bg-[#F6F4EE]'
              }`}
            >
              Regulamento Oficial
            </button>
          )}

          <button
            onClick={() => setActiveTab('sponsorship')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors font-sans ${
              activeTab === 'sponsorship'
                ? 'bg-[#1A1A1A] text-[#FDFCF8]'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] bg-[#F6F4EE]'
            }`}
          >
            Patrocínio de Arena ({competitionOpportunities.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {competition.detailedInfo && (
                <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <h2 className="text-xl font-display font-bold uppercase text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
                    Formato de Arena & Normas de Segurança
                  </h2>
                  <p className="text-sm text-[#1A1A1A]/80 leading-relaxed whitespace-pre-line font-sans">
                    {competition.detailedInfo}
                  </p>
                </div>
              )}

              {/* Official Schedule */}
              {competition.schedule && competition.schedule.length > 0 && (
                <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <h2 className="text-xl font-display font-bold uppercase text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
                    Programação de Boxes & Combates
                  </h2>
                  <div className="divide-y divide-[#1A1A1A]/10">
                    {competition.schedule.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-start gap-4 text-xs sm:text-sm font-sans">
                        <span className="font-serif font-bold text-base text-[#B44D2E] w-16 shrink-0">
                          {item.time}
                        </span>
                        <div>
                          <span className="text-[#1A1A1A] font-medium block">{item.activity}</span>
                          {item.location && (
                            <span className="text-[#1A1A1A]/60 text-xs">Local: {item.location}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsors attached to this competition */}
              {competitionSponsors.length > 0 && (
                <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <h2 className="text-xl font-display font-bold uppercase text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2">
                    Apoiado Por
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {competitionSponsors.map((sp) => (
                      <div
                        key={sp.id}
                        className="p-4 border border-[#1A1A1A]/10 bg-[#F6F4EE] flex items-center gap-3"
                      >
                        {sp.logoUrl && (
                          <img
                            src={sp.logoUrl}
                            alt={sp.name}
                            className="h-7 w-auto object-contain"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div>
                          <span className="text-xs font-bold uppercase text-[#1A1A1A] block font-sans">
                            {sp.name}
                          </span>
                          <span className="text-[10px] uppercase text-[#B44D2E] font-sans font-bold">
                            {sp.tierName || sp.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column: Registration / Prize info */}
            <div className="lg:col-span-4 space-y-6">
              {/* Registration box */}
              <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/60 font-sans">
                    INSCRIÇÕES DE BOX
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 font-sans ${
                      competition.registrationInfo?.isOpen
                        ? 'bg-[#B44D2E]/10 text-[#B44D2E] border border-[#B44D2E]/30'
                        : 'bg-[#F6F4EE] text-[#1A1A1A]/50'
                    }`}
                  >
                    {competition.registrationInfo?.isOpen ? 'ABERTAS' : 'ENCERRADAS'}
                  </span>
                </div>

                {competition.registrationInfo?.fee && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-sans">Taxa de Box / Robô</div>
                    <div className="text-xl font-serif font-bold text-[#1A1A1A]">
                      {competition.registrationInfo.fee}
                    </div>
                  </div>
                )}

                {competition.registrationInfo?.deadline && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-sans">
                      Prazo Limite de Inspeção
                    </div>
                    <div className="text-sm font-semibold text-[#1A1A1A] font-sans">
                      {new Date(competition.registrationInfo.deadline).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                )}

                {competition.registrationInfo?.instructions && (
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                    {competition.registrationInfo.instructions}
                  </p>
                )}

                {competition.registrationInfo?.isOpen && (
                  <button
                    onClick={() => navigate('contact')}
                    className="w-full py-3 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] text-[11px] uppercase tracking-widest font-bold font-sans transition-colors text-center"
                  >
                    SOLICITAR FICHA DE INSCRIÇÃO
                  </button>
                )}
              </div>

              {/* Prize Box */}
              {competition.prizeInfo && (
                <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-2 text-[#B44D2E]">
                    <Trophy className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-widest font-sans">
                      Premiação Homologada
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#1A1A1A] leading-relaxed font-serif">
                    {competition.prizeInfo}
                  </p>
                </div>
              )}

              {/* Regulation Shortcut */}
              {competition.regulationDoc && (
                <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-2 text-[#B44D2E]">
                    <FileText className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-widest font-sans">
                      Laudo & Regulamento de Arena
                    </span>
                  </div>
                  <div className="text-xs text-[#1A1A1A] font-medium truncate font-sans">
                    {competition.regulationDoc.title}
                  </div>
                  <div className="text-[10px] text-[#1A1A1A]/50 font-sans">
                    {competition.regulationDoc.fileSize && `Tamanho: ${competition.regulationDoc.fileSize}`}
                    {competition.regulationDoc.lastUpdated && ` • Revisão: ${competition.regulationDoc.lastUpdated}`}
                  </div>
                  <button
                    onClick={() => setActiveTab('regulation')}
                    className="w-full py-2.5 bg-[#F6F4EE] hover:bg-[#1A1A1A] hover:text-[#FDFCF8] text-[#1A1A1A] text-[11px] uppercase tracking-widest font-bold font-sans transition-colors"
                  >
                    CONSULTAR REGULAMENTO
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Teams */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold uppercase text-[#1A1A1A]">
                Robôs & Equipes na Disputa ({participatingTeams.length})
              </h2>
            </div>

            {participatingTeams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {participatingTeams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => navigate('team-detail', team.slug)}
                    className="border border-[#1A1A1A]/10 bg-[#FFFFFF] hover:border-[#1A1A1A] p-6 space-y-3 cursor-pointer group transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F6F4EE] border border-[#1A1A1A]/10 overflow-hidden flex items-center justify-center">
                        {team.badgeUrl ? (
                          <img
                            src={team.badgeUrl}
                            alt={team.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <Bot className="w-5 h-5 text-[#1A1A1A]/40" />
                        )}
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#B44D2E] tracking-wider font-sans">
                          {team.city}/{team.state}
                        </span>
                        <h3 className="text-xl font-display font-bold uppercase text-[#1A1A1A] group-hover:text-[#B44D2E] transition-colors leading-tight">
                          {team.name}
                        </h3>
                      </div>
                    </div>

                    {team.bio && (
                      <p className="text-xs text-[#1A1A1A]/70 line-clamp-2 leading-relaxed font-sans">
                        {team.bio}
                      </p>
                    )}

                    <div className="pt-2 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-bold text-[#1A1A1A] font-sans">
                      <span>VER ROBÔS & BOX</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Lista de equipes em fase de homologação"
                message="As equipes de robótica inscritas estão passando pela validação de pesagem e failsafe pela mesa técnica."
              />
            )}
          </div>
        )}

        {/* Tab 3: Results */}
        {activeTab === 'results' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold uppercase text-[#1A1A1A]">
                Súmulas e Laudos Oficiais de Combate
              </h2>
            </div>

            {competitionResults.length > 0 ? (
              <div className="space-y-6">
                {competitionResults.map((res) => (
                  <div key={res.id} className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A1A1A]/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase text-[#B44D2E] font-sans">
                          {res.stageName}
                        </span>
                        <span className="text-xs text-[#1A1A1A]/60 font-sans">
                          Data: {new Date(res.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#B44D2E] bg-[#B44D2E]/10 px-2 py-0.5 border border-[#B44D2E]/30 font-sans">
                        Laudo Homologado
                      </span>
                    </div>

                    {/* If matches */}
                    {res.type === 'match' && res.matches && (
                      <div className="divide-y divide-[#1A1A1A]/10">
                        {res.matches.map((m, i) => (
                          <div
                            key={i}
                            className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                          >
                            <div className="flex items-center justify-end flex-1 text-right font-display font-bold text-lg sm:text-xl text-[#1A1A1A]">
                              <span>{m.teamAName}</span>
                            </div>
                            <div className="px-5 py-1.5 bg-[#F6F4EE] border border-[#1A1A1A]/20 font-serif font-bold text-2xl tracking-widest text-[#B44D2E]">
                              {m.scoreA} : {m.scoreB}
                            </div>
                            <div className="flex items-center justify-start flex-1 text-left font-display font-bold text-lg sm:text-xl text-[#1A1A1A]">
                              <span>{m.teamBName}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* If ranking table */}
                    {res.type === 'ranking' && res.ranking && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm font-sans">
                          <thead>
                            <tr className="border-b border-[#1A1A1A]/10 text-[#1A1A1A]/60 uppercase text-[10px] tracking-widest">
                              <th className="py-2.5 px-3">Pos</th>
                              <th className="py-2.5 px-3">Robô / Equipe</th>
                              <th className="py-2.5 px-3 text-center">Pontos</th>
                              <th className="py-2.5 px-3 text-center">Combates</th>
                              <th className="py-2.5 px-3 text-center">Vitórias</th>
                              <th className="py-2.5 px-3 text-center">Derrotas</th>
                              <th className="py-2.5 px-3 text-center">Dano / Saldo</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1A1A1A]/10 text-[#1A1A1A]">
                            {res.ranking.map((row) => (
                              <tr key={row.rank} className="hover:bg-[#F6F4EE]/50">
                                <td className="py-3 px-3 font-serif font-bold text-base text-[#B44D2E]">
                                  #{row.rank}
                                </td>
                                <td className="py-3 px-3 font-semibold uppercase">
                                  {row.teamOrParticipantName}
                                </td>
                                <td className="py-3 px-3 text-center font-bold text-[#1A1A1A]">
                                  {row.points ?? '-'}
                                </td>
                                <td className="py-3 px-3 text-center text-[#1A1A1A]/60">
                                  {row.matchesPlayed ?? '-'}
                                </td>
                                <td className="py-3 px-3 text-center text-[#B44D2E] font-bold">
                                  {row.wins ?? '-'}
                                </td>
                                <td className="py-3 px-3 text-center text-[#1A1A1A]/50">
                                  {row.losses ?? '-'}
                                </td>
                                <td className="py-3 px-3 text-center text-[#1A1A1A]/70 font-mono">
                                  {row.scoreDifference ?? '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {res.notes && (
                      <p className="text-xs text-[#1A1A1A]/70 pt-2 border-t border-[#1A1A1A]/10 font-serif italic">
                        Observações Técnicas de Arena: {res.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Súmulas de arena ainda não homologadas"
                message="Os combates desta etapa estão programados ou em fase de apuração pelos juízes de arena."
              />
            )}
          </div>
        )}

        {/* Tab 4: Regulation */}
        {activeTab === 'regulation' && competition.regulationDoc && (
          <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-10 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B44D2E] block font-sans tracking-widest">
                  DOCUMENTO TÉCNICO DE ARENA & SEGURANÇA
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-[#1A1A1A]">
                  {competition.regulationDoc.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert('Download do regulamento oficial homologado iniciado.')}
                  className="px-5 py-2.5 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] text-[11px] uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-2 font-sans"
                >
                  <Download className="w-4 h-4" />
                  <span>BAIXAR REGULAMENTO</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
              <p>
                Este regulamento contém as normas de segurança elétrica (chaves gerais, fusíveis, failsafe), limites de peso por categoria (Featherweight, Beetleweight, Antweight, FRC), regras de blindagem e procedimentos disciplinares aplicáveis à {competition.name}.
              </p>
              <div className="p-4 bg-[#F6F4EE] border border-[#1A1A1A]/10 space-y-2 text-xs">
                <div className="text-[#1A1A1A] font-bold uppercase">
                  Informações de Registro do Laudo:
                </div>
                <div>• Código de Homologação: REG-ROBO-{competition.id.toUpperCase()}-2026</div>
                {competition.regulationDoc.fileSize && (
                  <div>• Tamanho do Arquivo: {competition.regulationDoc.fileSize}</div>
                )}
                {competition.regulationDoc.lastUpdated && (
                  <div>• Última Revisão Técnica: {competition.regulationDoc.lastUpdated}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Sponsorship */}
        {activeTab === 'sponsorship' && (
          <div className="space-y-8">
            <div className="border border-[#1A1A1A]/10 bg-[#1A1A1A] text-[#FDFCF8] p-6 sm:p-8 space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B44D2E] font-sans">
                OPORTUNIDADES COMERCIAIS DE ARENA
              </span>
              <h2 className="text-3xl font-display font-black uppercase text-[#FDFCF8]">
                Patrocine a {competition.name}
              </h2>
              <p className="text-sm text-[#FDFCF8]/70 max-w-2xl leading-relaxed font-sans">
                Associe sua marca a este torneio de robótica com visibilidade direta nos vidros blindados, backdrop de premiação, stands no paddock e transmissões oficiais.
              </p>
              <button
                onClick={() => navigate('sponsorship')}
                className="px-6 py-3 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] text-[11px] uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-2 font-sans"
              >
                <span>SOLICITAR PROPOSTA COMERCIAL</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {competitionOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competitionOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-[#B44D2E] uppercase font-bold text-[10px]">
                          {opp.type.replace('_', ' ')}
                        </span>
                        {opp.estimatedInvestmentRange && (
                          <span className="text-[#1A1A1A] font-serif font-bold italic">
                            {opp.estimatedInvestmentRange}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-serif font-bold uppercase text-[#1A1A1A]">
                        {opp.title}
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                        {opp.description}
                      </p>
                      {opp.benefitsList.length > 0 && (
                        <div className="space-y-1 pt-2 font-sans">
                          <span className="text-[10px] uppercase font-bold text-[#1A1A1A] block">
                            Contrapartidas de Arena:
                          </span>
                          <ul className="space-y-1">
                            {opp.benefitsList.map((b, bi) => (
                              <li key={bi} className="text-xs text-[#1A1A1A]/70 flex items-start gap-1.5">
                                <span className="text-[#B44D2E] mt-0.5">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate('sponsorship')}
                      className="w-full mt-4 py-2.5 bg-[#F6F4EE] hover:bg-[#B44D2E] hover:text-[#FDFCF8] text-[#1A1A1A] text-[11px] uppercase tracking-widest font-bold transition-colors text-center font-sans"
                    >
                      QUERO ESTA COTA
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
};
