import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Trophy,
  Award,
  CheckCircle2,
  FileText,
  Building2,
  Sparkles
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigate } = useNavigation();
  const {
    getPublishedCompetitions,
    getPublishedTeamList,
    getPublishedStories,
    getActiveSponsors,
    getVisibleMetrics,
    getActiveOpportunities,
    settings,
  } = useData();

  const competitions = getPublishedCompetitions();
  const teams = getPublishedTeamList();
  const stories = getPublishedStories();
  const sponsors = getActiveSponsors();
  const metrics = getVisibleMetrics();
  const opportunities = getActiveOpportunities();

  const featuredCompetitions = competitions.slice(0, 3);
  const featuredTeams = teams.slice(0, 4);

  return (
    <div className="w-full bg-[#FDFCF8] text-[#1A1A1A] overflow-hidden">
      {/* 01 - EDITORIAL HERO (2-COLUMN MAGAZINE COVER) */}
      <section
        id="hero-section"
        className="relative border-b border-[#1A1A1A]/10 bg-[#FDFCF8] min-h-[580px] lg:min-h-[640px] flex flex-col justify-between"
      >
        {/* Background Watermark Numerals */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
          <div className="text-[220px] font-black tracking-tighter opacity-[0.03] text-[#1A1A1A] leading-none">
            2026
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#1A1A1A]/10">
          {/* Left Column (5 cols) - Editorial Manifesto & Action */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]/10 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-[#B44D2E]">
                  Edição &bull; Volume 2026
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B44D2E]" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#1A1A1A]/50">
                  Documento Homologado
                </span>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-[80px] leading-[0.88] font-black tracking-tight text-[#1A1A1A] uppercase">
                NÃO <br />
                ASSISTA <br />
                <span className="font-serif italic font-normal text-[#B44D2E] tracking-normal">DE FORA.</span>
              </h1>

              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#1A1A1A]/70 max-w-[380px]">
                {settings.manifestoText ||
                  'Um espaço para descobrir competições oficiais, conhecer as equipes que estão fazendo acontecer e aproximar marcas de quem merece ser visto.'}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  id="hero-explore-btn"
                  onClick={() => navigate('competitions')}
                  className="px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#B44D2E] text-[#FDFCF8] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all inline-flex items-center gap-2 group shadow-sm"
                >
                  <span>Explorar Torneios</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  id="hero-sponsor-btn"
                  onClick={() => navigate('sponsorship')}
                  className="px-6 py-3.5 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF8] text-[#1A1A1A] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all inline-flex items-center gap-2"
                >
                  <span>Quero Patrocinar</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B44D2E]" />
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2 text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/50 font-sans">
                <span>Auditoria Factual</span>
                <span>&bull;</span>
                <span>Súmulas Oficiais</span>
                <span>&bull;</span>
                <span>Cotas Homologadas</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols) - Editorial Stage & Visual Impact */}
          <div className="lg:col-span-7 bg-[#1A1A1A] text-[#FDFCF8] relative overflow-hidden flex flex-col justify-between min-h-[440px] lg:min-h-[580px] p-8 sm:p-12 lg:p-14">
            {/* Gradient Overlay Accent */}
            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-[#B44D2E] via-transparent to-transparent pointer-events-none" />

            {/* Vertical Issue Stamp */}
            <div className="absolute top-0 right-0 h-full w-14 border-l border-[#FDFCF8]/10 hidden sm:flex items-center justify-center pointer-events-none select-none">
              <span className="rotate-90 whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.4em] text-[#FDFCF8]/40">
                Plataforma Oficial &bull; Temporada 2026
              </span>
            </div>

            {/* Top Row: Key Indicator Callout */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#B44D2E] block mb-1 font-bold">
                  Painel de Controle
                </span>
                <span className="text-xl sm:text-2xl font-serif italic text-[#FDFCF8]">
                  Ecossistema Esportivo Ativo
                </span>
              </div>
              <div className="px-3 py-1 bg-[#FDFCF8]/10 border border-[#FDFCF8]/20 text-[10px] uppercase tracking-widest text-[#FDFCF8] font-sans font-bold">
                100% Homologado
              </div>
            </div>

            {/* Middle Stats Matrix in Editorial Card */}
            <div className="relative z-10 my-8 sm:my-10 border border-[#FDFCF8]/20 bg-[#1A1A1A]/80 backdrop-blur-sm p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="border-b sm:border-b-0 sm:border-r border-[#FDFCF8]/15 pb-4 sm:pb-0 sm:pr-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] block text-[#FDFCF8]/60 mb-2">
                    Competições
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-light text-[#FDFCF8]">
                    {competitions.length.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[11px] text-[#FDFCF8]/50 mt-1 block">Torneios auditados</span>
                </div>

                <div className="border-b sm:border-b-0 sm:border-r border-[#FDFCF8]/15 pb-4 sm:pb-0 sm:pr-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] block text-[#FDFCF8]/60 mb-2">
                    Equipes
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-light text-[#FDFCF8]">
                    {teams.length.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[11px] text-[#FDFCF8]/50 mt-1 block">Clubes homologados</span>
                </div>

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] block text-[#B44D2E] mb-2 font-semibold">
                    Cotas Abertas
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-light text-[#B44D2E]">
                    {opportunities.length.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[11px] text-[#FDFCF8]/50 mt-1 block">Oportunidades diretas</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Direct Link */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#FDFCF8]/15">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] italic text-[#FDFCF8]/60">
                Acesso direto a organizadores &bull; Sem intermediários opacos
              </span>
              <button
                onClick={() => navigate('sponsorship')}
                className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#FDFCF8] hover:text-[#B44D2E] flex items-center gap-1.5 transition-colors"
              >
                <span>Ver Dossiê Comercial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Footer Bar */}
        <div className="h-16 grid grid-cols-1 sm:grid-cols-12 border-t border-[#1A1A1A]/10 bg-[#F6F4EE]">
          <div className="sm:col-span-4 border-r border-[#1A1A1A]/10 flex items-center px-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#1A1A1A]">
              Destaque &rarr; {competitions[0]?.name || 'Campeonatos Oficiais'}
            </span>
          </div>
          <div className="sm:col-span-5 border-r border-[#1A1A1A]/10 hidden sm:flex items-center justify-center gap-10">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-serif text-[#1A1A1A]">01</span>
              <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">Competições</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-serif text-[#1A1A1A]">02</span>
              <span className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">Equipes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-serif text-[#B44D2E]">03</span>
              <span className="text-[10px] uppercase tracking-wider text-[#B44D2E] font-bold">Patrocínio</span>
            </div>
          </div>
          <div className="sm:col-span-3 flex items-center justify-end px-8">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] italic text-[#1A1A1A]/60">
              Cobertura 100% Homologada
            </span>
          </div>
        </div>
      </section>

      {/* 02 - PILARES EDITORIAIS (3 COLUMNS COM HAIRLINE DIVIDERS) */}
      <section id="explanation-section" className="py-16 sm:py-20 border-b border-[#1A1A1A]/10 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10">
            <div className="p-6 sm:p-8 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#B44D2E] font-sans block">
                01 &bull; O QUE É
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                Palco e Registro Factual
              </h3>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
                Plataforma editorial oficial dedicada a documentar torneios reais, atletas em atividade contínua e resultados auditados.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#1A1A1A] font-sans block">
                02 &bull; POR QUE EXISTE
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                Valorização e Identidade
              </h3>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
                Competições e times autênticos precisam de canais de prestígio para demonstrar seu valor esportivo, cultural e de público.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#B44D2E] font-sans block">
                03 &bull; COMO PARTICIPAR
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                Patrocínio Direto
              </h3>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
                Marcas encontram propostas transparentes de naming rights, camisas e ativações de arena sem intermediários opacos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 - COMPETIÇÕES HOMOLOGADAS (EDITORIAL CARDS & INDEX) */}
      {competitions.length > 0 && (
        <section id="competitions-preview-section" className="py-16 sm:py-24 border-b border-[#1A1A1A]/10 bg-[#F6F4EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1A1A1A]/10 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#B44D2E] font-sans block mb-2">
                  Dossiê Oficial de Competições
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#1A1A1A] tracking-tight">
                  TORNEIOS HOMOLOGADOS
                </h2>
              </div>
              <button
                onClick={() => navigate('competitions')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#1A1A1A] hover:text-[#B44D2E] transition-colors self-start md:self-auto"
              >
                <span>Ver todas as competições ({competitions.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Editorial List */}
            <div className="space-y-4">
              {featuredCompetitions.map((comp, idx) => (
                <div
                  key={comp.id}
                  className="bg-[#FFFFFF] border border-[#1A1A1A]/10 hover:border-[#1A1A1A] transition-all p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  {/* Left: Index & Category */}
                  <div className="lg:col-span-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-3xl text-[#1A1A1A]/30 group-hover:text-[#B44D2E] transition-colors">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[#F6F4EE] text-[#1A1A1A] border border-[#1A1A1A]/10 font-sans">
                        {comp.category}
                      </span>
                    </div>
                    <StatusBadge status={comp.status} size="sm" />
                  </div>

                  {/* Center: Title & Location */}
                  <div className="lg:col-span-6 space-y-2">
                    <h3
                      onClick={() => navigate('competition-detail', comp.slug)}
                      className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#1A1A1A] group-hover:text-[#B44D2E] cursor-pointer transition-colors"
                    >
                      {comp.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#1A1A1A]/60 font-sans">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#B44D2E]" />
                        <span>
                          {comp.location.city}, {comp.location.state}
                        </span>
                      </div>
                      {comp.startDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
                          <span>
                            {new Date(comp.startDate).toLocaleDateString('pt-BR')}
                            {comp.endDate ? ` até ${new Date(comp.endDate).toLocaleDateString('pt-BR')}` : ''}
                          </span>
                        </div>
                      )}
                      {comp.teamsCount !== undefined && comp.teamsCount > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#1A1A1A]/50" />
                          <span>{comp.teamsCount} equipes</span>
                        </div>
                      )}
                    </div>
                    {comp.description && (
                      <p className="text-xs sm:text-sm text-[#1A1A1A]/70 line-clamp-2 leading-relaxed font-sans">
                        {comp.description}
                      </p>
                    )}
                  </div>

                  {/* Right: Action */}
                  <div className="lg:col-span-3 flex lg:justify-end">
                    <button
                      onClick={() => navigate('competition-detail', comp.slug)}
                      className="w-full lg:w-auto px-5 py-3 bg-[#1A1A1A] group-hover:bg-[#B44D2E] text-[#FDFCF8] text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Conhecer Competição</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 04 - EQUIPES HOMOLOGADAS */}
      {teams.length > 0 && (
        <section id="teams-preview-section" className="py-16 sm:py-24 border-b border-[#1A1A1A]/10 bg-[#FDFCF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1A1A1A]/10 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#B44D2E] font-sans block mb-2">
                  Diretório de Clubes & Atletas
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#1A1A1A] tracking-tight">
                  QUEM ESTÁ NA DISPUTA.
                </h2>
              </div>
              <button
                onClick={() => navigate('teams')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#1A1A1A] hover:text-[#B44D2E] transition-colors self-start md:self-auto"
              >
                <span>Ver todas as equipes ({teams.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTeams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => navigate('team-detail', team.slug)}
                  className="bg-[#FFFFFF] border border-[#1A1A1A]/10 hover:border-[#1A1A1A] transition-all p-6 space-y-4 cursor-pointer group flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <div className="space-y-4">
                    {/* Badge or Image */}
                    <div className="w-14 h-14 bg-[#F6F4EE] border border-[#1A1A1A]/10 overflow-hidden flex items-center justify-center group-hover:border-[#B44D2E] transition-colors">
                      {team.badgeUrl ? (
                        <img
                          src={team.badgeUrl}
                          alt={`Escudo oficial ${team.name}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Users className="w-6 h-6 text-[#1A1A1A]/40" />
                      )}
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#B44D2E] font-sans block">
                        {team.category} &bull; {team.city}/{team.state}
                      </span>
                      <h3 className="text-2xl font-display font-bold uppercase text-[#1A1A1A] group-hover:text-[#B44D2E] transition-colors mt-1">
                        {team.name}
                      </h3>
                    </div>

                    {team.bio && (
                      <p className="text-xs text-[#1A1A1A]/70 line-clamp-3 leading-relaxed font-sans">
                        {team.bio}
                      </p>
                    )}
                  </div>

                  {/* Sponsorship seeking callout */}
                  <div className="pt-4 border-t border-[#1A1A1A]/10 space-y-2">
                    {team.isSeekingSponsorship ? (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B44D2E] font-sans">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Aberto a Patrocínio</span>
                      </div>
                    ) : (
                      <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-sans">
                        Equipe Homologada
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] group-hover:text-[#B44D2E] font-sans">
                      <span>Ver Perfil</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 05 - INDICADORES OFICIAIS VERIFICADOS */}
      {metrics.length > 0 && (
        <section id="metrics-section" className="py-16 border-b border-[#1A1A1A]/10 bg-[#F6F4EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#1A1A1A]/60 font-sans block mb-8">
              Indicadores Oficiais Verificados
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {metrics.map((met) => (
                <div key={met.id} className="border-l border-[#1A1A1A] pl-6 space-y-2">
                  <div className="font-serif text-5xl sm:text-6xl text-[#1A1A1A] tracking-tight">
                    {met.value}
                    {met.unit && <span className="text-[#B44D2E] ml-1">{met.unit}</span>}
                  </div>
                  <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#1A1A1A] font-sans">
                    {met.label}
                  </div>
                  {met.description && (
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">{met.description}</p>
                  )}
                  {met.verifiedSource && (
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 pt-1 font-sans">
                      Fonte: {met.verifiedSource}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 06 - HISTÓRIAS & BASTIDORES ("EDITORIAL DOSSIER") */}
      {stories.length > 0 && (
        <section id="stories-section" className="py-16 sm:py-24 border-b border-[#1A1A1A]/10 bg-[#FDFCF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 pb-6 border-b border-[#1A1A1A]/10">
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#B44D2E] font-sans block mb-2">
                Memória & Documento
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#1A1A1A] tracking-tight">
                POR TRÁS DA COMPETIÇÃO.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {stories.slice(0, 2).map((story, i) => (
                <div
                  key={story.id}
                  className={`border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                    i === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                  }`}
                >
                  {story.coverUrl && (
                    <div className="w-full h-64 overflow-hidden mb-4 border border-[#1A1A1A]/10">
                      <img
                        src={story.coverUrl}
                        alt={story.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#B44D2E] font-sans">
                    {story.date} {story.author ? `&bull; Por ${story.author}` : ''}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] leading-tight">
                    {story.title}
                  </h3>
                  {story.subtitle && (
                    <p className="text-sm font-serif italic text-[#1A1A1A]/80">{story.subtitle}</p>
                  )}
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed whitespace-pre-line font-sans">
                    {story.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 07 - PATROCÍNIO: MANIFESTO COMERCIAL (DARK EDITORIAL SECTION) */}
      <section
        id="sponsorship-callout-section"
        className="py-16 sm:py-24 border-b border-[#1A1A1A] bg-[#1A1A1A] text-[#FDFCF8] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#B44D2E] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDFCF8]/10 text-[#FDFCF8] text-[10px] uppercase font-bold tracking-[0.3em] border border-[#FDFCF8]/20 font-sans">
                Oportunidades Comerciais Homologadas
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#FDFCF8] leading-[0.9] tracking-tight">
                NÃO COLOQUE <br />
                APENAS SUA LOGO. <br />
                <span className="font-serif italic font-normal text-[#B44D2E]">COLOQUE SUA MARCA DENTRO DA HISTÓRIA.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#FDFCF8]/70 max-w-xl leading-relaxed font-sans">
                Tem gente competindo. Tem gente torcendo. Falta a sua marca. Conecte seu negócio a propriedades oficiais com cotas homologadas e contato direto com a organização.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => navigate('sponsorship')}
                  className="px-8 py-4 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all inline-flex items-center gap-2"
                >
                  <span>Quero Patrocinar</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('contact')}
                  className="px-6 py-4 border border-[#FDFCF8]/30 hover:border-[#FDFCF8] text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#FDFCF8] transition-colors"
                >
                  Falar com a Diretoria
                </button>
              </div>
            </div>

            {/* Opportunities List Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#B44D2E] mb-2 font-sans">
                Cotas Homologadas Recentes
              </div>
              {opportunities.length > 0 ? (
                opportunities.slice(0, 3).map((opp) => (
                  <div
                    key={opp.id}
                    onClick={() => navigate('sponsorship')}
                    className="border border-[#FDFCF8]/15 bg-[#FDFCF8]/5 p-5 hover:border-[#B44D2E] cursor-pointer transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="font-bold text-[#B44D2E] uppercase tracking-wider text-[10px]">
                        {opp.type.replace('_', ' ')}
                      </span>
                      {opp.estimatedInvestmentRange && (
                        <span className="text-[#FDFCF8] font-semibold text-xs font-serif italic">
                          {opp.estimatedInvestmentRange}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-serif font-bold text-[#FDFCF8] uppercase leading-snug">
                      {opp.title}
                    </h4>
                    {opp.targetEntityName && (
                      <div className="text-xs text-[#FDFCF8]/60 font-sans">Entidade: {opp.targetEntityName}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="border border-[#FDFCF8]/10 p-6 text-center text-xs text-[#FDFCF8]/60 font-sans">
                  Novas cotas de patrocínio estão em fase de homologação comercial.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 08 - PATROCINADORES OFICIAIS */}
      {sponsors.length > 0 && (
        <section id="sponsors-section" className="py-16 border-b border-[#1A1A1A]/10 bg-[#F6F4EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#1A1A1A]/50 mb-6 text-center block font-sans">
              Parceiros & Patrocinadores Oficiais
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {sponsors.map((sp) => (
                <div
                  key={sp.id}
                  className="px-6 py-4 border border-[#1A1A1A]/10 bg-[#FFFFFF] flex items-center gap-3 text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
                >
                  {sp.logoUrl && (
                    <img
                      src={sp.logoUrl}
                      alt={`Logo oficial ${sp.name}`}
                      className="h-8 w-auto object-contain max-w-[120px]"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div>
                    <span className="font-display font-bold text-sm uppercase text-[#1A1A1A]">
                      {sp.name}
                    </span>
                    {sp.tierName && (
                      <span className="block text-[9px] uppercase tracking-widest text-[#B44D2E] font-sans">
                        {sp.tierName}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 09 - CTA FINAL */}
      <section id="final-cta-section" className="py-20 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#B44D2E] font-sans block">
            Chamada Oficial &bull; Temporada 2026
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tight">
            NÃO ASSISTA <span className="font-serif italic font-normal text-[#B44D2E]">DE FORA.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-xl mx-auto leading-relaxed font-sans">
            Acompanhe campeonatos oficiais, conheça equipes de alta dedicação ou insira sua marca nas maiores disputas do circuito.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('competitions')}
              className="px-6 py-3.5 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF8] text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#1A1A1A] transition-colors"
            >
              Ver Competições &rarr;
            </button>
            <button
              onClick={() => navigate('teams')}
              className="px-6 py-3.5 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF8] text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#1A1A1A] transition-colors"
            >
              Conhecer Equipes &rarr;
            </button>
            <button
              onClick={() => navigate('sponsorship')}
              className="px-6 py-3.5 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <span>Quero Patrocinar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
