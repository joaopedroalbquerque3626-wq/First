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
  ExternalLink
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
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <EmptyState
          title="Competição não encontrada"
          message="A competição solicitada não existe ou ainda não foi homologada e publicada no circuito oficial."
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
    <div className="min-h-screen pb-20">
      {/* Top Breadcrumb / Back Bar */}
      <div className="border-b border-[#77746E]/20 bg-[#121212] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate('competitions')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#77746E] hover:text-[#F1EDE4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Competições</span>
          </button>
          <div className="text-xs uppercase font-bold text-[#B9D531]">
            {competition.category} • Temporada {competition.season}
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative border-b border-[#77746E]/20 bg-[#151515] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={competition.status} />
                <span className="px-2.5 py-0.5 text-xs uppercase font-bold tracking-wider bg-[#252422] text-[#F1EDE4] border border-[#77746E]/30">
                  {competition.category}
                </span>
                <span className="text-xs text-[#77746E] font-semibold">
                  Temporada {competition.season}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase text-[#F1EDE4] leading-tight">
                {competition.name}
              </h1>

              {competition.description && (
                <p className="text-base sm:text-lg text-[#F1EDE4]/80 leading-relaxed max-w-3xl">
                  {competition.description}
                </p>
              )}

              {/* Key metadata chips */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#77746E]">
                <div className="flex items-center gap-1.5 text-[#F1EDE4]">
                  <MapPin className="w-4 h-4 text-[#E95D2A]" />
                  <span>
                    {competition.location.city}, {competition.location.state}
                    {competition.location.venue ? ` • ${competition.location.venue}` : ''}
                  </span>
                </div>

                {competition.startDate && (
                  <div className="flex items-center gap-1.5 text-[#F1EDE4]">
                    <Calendar className="w-4 h-4 text-[#B9D531]" />
                    <span>
                      {new Date(competition.startDate).toLocaleDateString('pt-BR')}
                      {competition.endDate
                        ? ` até ${new Date(competition.endDate).toLocaleDateString('pt-BR')}`
                        : ''}
                    </span>
                  </div>
                )}

                {competition.organizerName && (
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#77746E]" />
                    <span>Org: {competition.organizerName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Banner Cover if present */}
            {competition.bannerUrl && (
              <div className="lg:col-span-4">
                <div className="border border-[#77746E]/30 overflow-hidden bg-[#181716] shadow-xl">
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
      <div className="sticky top-20 z-30 bg-[#151515] border-b border-[#77746E]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto space-x-2 py-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            Visão Geral & Formato
          </button>

          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${
              activeTab === 'teams'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            Equipes ({participatingTeams.length})
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${
              activeTab === 'results'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            Resultados & Classificação ({competitionResults.length})
          </button>

          {competition.regulationDoc && (
            <button
              onClick={() => setActiveTab('regulation')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${
                activeTab === 'regulation'
                  ? 'bg-[#E95D2A] text-[#F1EDE4]'
                  : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
              }`}
            >
              Regulamento Oficial
            </button>
          )}

          <button
            onClick={() => setActiveTab('sponsorship')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors ${
              activeTab === 'sponsorship'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            Patrocínio ({competitionOpportunities.length})
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
                <div className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-display font-bold uppercase text-[#F1EDE4] border-b border-[#77746E]/20 pb-2">
                    Formato de Disputa & Diretrizes
                  </h2>
                  <p className="text-sm text-[#F1EDE4]/80 leading-relaxed whitespace-pre-line">
                    {competition.detailedInfo}
                  </p>
                </div>
              )}

              {/* Official Schedule */}
              {competition.schedule && competition.schedule.length > 0 && (
                <div className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-display font-bold uppercase text-[#F1EDE4] border-b border-[#77746E]/20 pb-2">
                    Programação Oficial
                  </h2>
                  <div className="divide-y divide-[#77746E]/20">
                    {competition.schedule.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-start gap-4 text-xs sm:text-sm">
                        <span className="font-display font-bold text-base text-[#B9D531] w-16 shrink-0">
                          {item.time}
                        </span>
                        <div>
                          <span className="text-[#F1EDE4] font-medium block">{item.activity}</span>
                          {item.location && (
                            <span className="text-[#77746E] text-xs">Local: {item.location}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsors attached to this competition */}
              {competitionSponsors.length > 0 && (
                <div className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-display font-bold uppercase text-[#F1EDE4] border-b border-[#77746E]/20 pb-2">
                    Apoiado Por
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {competitionSponsors.map((sp) => (
                      <div
                        key={sp.id}
                        className="p-4 border border-[#77746E]/20 bg-[#141312] flex items-center gap-3"
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
                          <span className="text-xs font-bold uppercase text-[#F1EDE4] block">
                            {sp.name}
                          </span>
                          <span className="text-[10px] uppercase text-[#B9D531]">
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
              <div className="border border-[#77746E]/30 bg-[#1a1918] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#77746E]">
                    INSCRIÇÕES
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 ${
                      competition.registrationInfo?.isOpen
                        ? 'bg-[#B9D531] text-[#151515]'
                        : 'bg-[#252422] text-[#77746E]'
                    }`}
                  >
                    {competition.registrationInfo?.isOpen ? 'ABERTAS' : 'ENCERRADAS'}
                  </span>
                </div>

                {competition.registrationInfo?.fee && (
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#77746E]">Taxa</div>
                    <div className="text-xl font-display font-bold text-[#F1EDE4]">
                      {competition.registrationInfo.fee}
                    </div>
                  </div>
                )}

                {competition.registrationInfo?.deadline && (
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#77746E]">
                      Prazo Final
                    </div>
                    <div className="text-sm font-semibold text-[#F1EDE4]">
                      {new Date(competition.registrationInfo.deadline).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                )}

                {competition.registrationInfo?.instructions && (
                  <p className="text-xs text-[#77746E] leading-relaxed">
                    {competition.registrationInfo.instructions}
                  </p>
                )}

                {competition.registrationInfo?.isOpen && (
                  <button
                    onClick={() => navigate('contact')}
                    className="w-full py-3 bg-[#B9D531] hover:bg-[#a6bf2a] text-[#151515] text-xs uppercase tracking-widest font-bold transition-colors cut-corner text-center"
                  >
                    SOLICITAR FICHA DE INSCRIÇÃO
                  </button>
                )}
              </div>

              {/* Prize Box */}
              {competition.prizeInfo && (
                <div className="border border-[#77746E]/30 bg-[#1a1918] p-6 space-y-2">
                  <div className="flex items-center gap-2 text-[#E95D2A]">
                    <Trophy className="w-4 h-4" />
                    <span className="text-xs uppercase font-bold tracking-widest">
                      Premiação Homologada
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#F1EDE4] leading-relaxed">
                    {competition.prizeInfo}
                  </p>
                </div>
              )}

              {/* Regulation Shortcut */}
              {competition.regulationDoc && (
                <div className="border border-[#77746E]/30 bg-[#1a1918] p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#B9D531]">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs uppercase font-bold tracking-widest">
                      Documento Oficial
                    </span>
                  </div>
                  <div className="text-xs text-[#F1EDE4] font-medium truncate">
                    {competition.regulationDoc.title}
                  </div>
                  <div className="text-[11px] text-[#77746E]">
                    {competition.regulationDoc.fileSize && `Tamanho: ${competition.regulationDoc.fileSize}`}
                    {competition.regulationDoc.lastUpdated && ` • Atualizado em: ${competition.regulationDoc.lastUpdated}`}
                  </div>
                  <button
                    onClick={() => setActiveTab('regulation')}
                    className="w-full py-2.5 bg-[#252422] hover:bg-[#E95D2A] text-[#F1EDE4] text-xs uppercase tracking-widest font-bold transition-colors"
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
              <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                Equipes na Disputa ({participatingTeams.length})
              </h2>
            </div>

            {participatingTeams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {participatingTeams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => navigate('team-detail', team.slug)}
                    className="border border-[#77746E]/30 bg-[#181716] hover:border-[#E95D2A] p-6 space-y-3 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#252422] border border-[#77746E]/30 overflow-hidden flex items-center justify-center cut-corner">
                        {team.badgeUrl ? (
                          <img
                            src={team.badgeUrl}
                            alt={team.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <Users className="w-5 h-5 text-[#77746E]" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B9D531]">
                          {team.city}/{team.state}
                        </span>
                        <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4] group-hover:text-[#E95D2A] transition-colors leading-tight">
                          {team.name}
                        </h3>
                      </div>
                    </div>

                    {team.bio && (
                      <p className="text-xs text-[#77746E] line-clamp-2 leading-relaxed">
                        {team.bio}
                      </p>
                    )}

                    <div className="pt-2 border-t border-[#77746E]/20 flex items-center justify-between text-xs font-bold text-[#F1EDE4]">
                      <span>VER PERFIL</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Lista de equipes em fase de homologação"
                message="As equipes inscritas estão passando pela validação de súmula e documentação pela mesa técnica."
              />
            )}
          </div>
        )}

        {/* Tab 3: Results */}
        {activeTab === 'results' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                Resultados e Súmulas Oficiais
              </h2>
            </div>

            {competitionResults.length > 0 ? (
              <div className="space-y-6">
                {competitionResults.map((res) => (
                  <div key={res.id} className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#77746E]/20 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase text-[#E95D2A]">
                          {res.stageName}
                        </span>
                        <span className="text-xs text-[#77746E]">
                          Data: {new Date(res.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <span className="text-[11px] uppercase font-bold text-[#B9D531] bg-[#B9D531]/10 px-2 py-0.5 border border-[#B9D531]/30">
                        Resultado Oficial Homologado
                      </span>
                    </div>

                    {/* If matches */}
                    {res.type === 'match' && res.matches && (
                      <div className="divide-y divide-[#77746E]/20">
                        {res.matches.map((m, i) => (
                          <div
                            key={i}
                            className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                          >
                            <div className="flex items-center justify-end flex-1 text-right font-display font-bold text-lg sm:text-xl text-[#F1EDE4]">
                              <span>{m.teamAName}</span>
                            </div>
                            <div className="px-4 py-1.5 bg-[#252422] border border-[#77746E]/40 font-display font-black text-2xl tracking-widest text-[#B9D531]">
                              {m.scoreA} : {m.scoreB}
                            </div>
                            <div className="flex items-center justify-start flex-1 text-left font-display font-bold text-lg sm:text-xl text-[#F1EDE4]">
                              <span>{m.teamBName}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* If ranking table */}
                    {res.type === 'ranking' && res.ranking && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-[#77746E]/30 text-[#77746E] uppercase text-[11px]">
                              <th className="py-2.5 px-3">Pos</th>
                              <th className="py-2.5 px-3">Equipe / Competidor</th>
                              <th className="py-2.5 px-3 text-center">PTS</th>
                              <th className="py-2.5 px-3 text-center">J</th>
                              <th className="py-2.5 px-3 text-center">V</th>
                              <th className="py-2.5 px-3 text-center">D</th>
                              <th className="py-2.5 px-3 text-center">Saldo</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#77746E]/20 text-[#F1EDE4]">
                            {res.ranking.map((row) => (
                              <tr key={row.rank} className="hover:bg-[#1f1e1c]">
                                <td className="py-3 px-3 font-display font-bold text-base text-[#B9D531]">
                                  #{row.rank}
                                </td>
                                <td className="py-3 px-3 font-semibold uppercase">
                                  {row.teamOrParticipantName}
                                </td>
                                <td className="py-3 px-3 text-center font-bold text-[#E95D2A]">
                                  {row.points ?? '-'}
                                </td>
                                <td className="py-3 px-3 text-center text-[#77746E]">
                                  {row.matchesPlayed ?? '-'}
                                </td>
                                <td className="py-3 px-3 text-center text-[#77746E]">
                                  {row.wins ?? '-'}
                                </td>
                                <td className="py-3 px-3 text-center text-[#77746E]">
                                  {row.losses ?? '-'}
                                </td>
                                <td className="py-3 px-3 text-center text-[#77746E]">
                                  {row.scoreDifference ?? '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {res.notes && (
                      <p className="text-xs text-[#77746E] pt-2 border-t border-[#77746E]/20">
                        Observações Técnicas: {res.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Resultados ainda não homologados"
                message="Os confrontos desta etapa estão programados ou em fase de apuração pela mesa de arbitragem."
              />
            )}
          </div>
        )}

        {/* Tab 4: Regulation */}
        {activeTab === 'regulation' && competition.regulationDoc && (
          <div className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#77746E]/20 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#B9D531] block">
                  DOCUMENTO TÉCNICO OFICIAL
                </span>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  {competition.regulationDoc.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert('Download do regulamento oficial homologado iniciado.')}
                  className="px-5 py-2.5 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-2 cut-corner"
                >
                  <Download className="w-4 h-4" />
                  <span>BAIXAR REGULAMENTO</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#77746E] leading-relaxed">
              <p>
                Este regulamento contém todas as normas técnicas, critérios de elegibilidade, penalidades, regras de arbitragem e procedimentos disciplinares aplicáveis à {competition.name}.
              </p>
              <div className="p-4 bg-[#141312] border border-[#77746E]/20 space-y-2 text-xs">
                <div className="text-[#F1EDE4] font-bold uppercase">
                  Informações de Registro do Documento:
                </div>
                <div>• Código de Homologação: REG-{competition.id.toUpperCase()}-2025</div>
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
            <div className="border border-[#77746E]/30 bg-[#1a1918] p-6 sm:p-8 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#E95D2A]">
                OPORTUNIDADES COMERCIAIS
              </span>
              <h2 className="text-3xl font-display font-bold uppercase text-[#F1EDE4]">
                Patrocine a {competition.name}
              </h2>
              <p className="text-sm text-[#77746E] max-w-2xl leading-relaxed">
                Associe sua marca a este campeonato oficial com visibilidade direta na quadra/arena, materiais impressos, transmissões e premiações.
              </p>
              <button
                onClick={() => navigate('sponsorship')}
                className="px-6 py-3 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-2 cut-corner"
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
                    className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#E95D2A] uppercase font-bold">
                          {opp.type.replace('_', ' ')}
                        </span>
                        {opp.estimatedInvestmentRange && (
                          <span className="text-[#B9D531] font-semibold">
                            {opp.estimatedInvestmentRange}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                        {opp.title}
                      </h3>
                      <p className="text-xs text-[#77746E] leading-relaxed">
                        {opp.description}
                      </p>
                      {opp.benefitsList.length > 0 && (
                        <div className="space-y-1 pt-2">
                          <span className="text-[11px] uppercase font-bold text-[#F1EDE4] block">
                            Entregas Inclusas:
                          </span>
                          <ul className="space-y-1">
                            {opp.benefitsList.map((b, bi) => (
                              <li key={bi} className="text-xs text-[#77746E] flex items-start gap-1.5">
                                <span className="text-[#B9D531] mt-0.5">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate('sponsorship')}
                      className="w-full mt-4 py-2.5 bg-[#252422] hover:bg-[#E95D2A] text-[#F1EDE4] text-xs uppercase tracking-widest font-bold transition-colors text-center"
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
