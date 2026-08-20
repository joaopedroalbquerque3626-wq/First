import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { CompetitionStatus } from '../types';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  ArrowUpRight,
  Trophy,
  X
} from 'lucide-react';

export const CompetitionsView: React.FC = () => {
  const { getPublishedCompetitions } = useData();
  const { navigate } = useNavigation();
  const competitions = getPublishedCompetitions();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<CompetitionStatus | 'all'>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  // Extract unique filter categories and seasons
  const categories = useMemo(() => {
    const set = new Set(competitions.map((c) => c.category));
    return Array.from(set);
  }, [competitions]);

  const seasons = useMemo(() => {
    const set = new Set(competitions.map((c) => c.season));
    return Array.from(set);
  }, [competitions]);

  // Filtered competitions
  const filteredCompetitions = useMemo(() => {
    return competitions.filter((comp) => {
      const matchesSearch =
        !searchQuery ||
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.location.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || comp.status === selectedStatus;
      const matchesSeason = selectedSeason === 'all' || comp.season === selectedSeason;

      return matchesSearch && matchesCategory && matchesStatus && matchesSeason;
    });
  }, [competitions, searchQuery, selectedCategory, selectedStatus, selectedSeason]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedSeason('all');
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title Section */}
        <div className="border-b border-[#77746E]/20 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252422] text-[#B9D531] text-xs uppercase font-bold tracking-widest border border-[#B9D531]/30">
            CIRCUITO OFICIAL HOMOLOGADO
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase text-[#F1EDE4] leading-tight">
            COMPETIÇÕES.
          </h1>
          <p className="text-sm sm:text-base text-[#77746E] max-w-2xl">
            Acompanhe o calendário, consulte regulamentos oficiais, tabelas de classificação e veja onde as equipes estão disputando o título.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="border border-[#77746E]/30 bg-[#181716] p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label htmlFor="search-competitions" className="sr-only">
                Buscar competição
              </label>
              <Search className="w-4 h-4 text-[#77746E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="search-competitions"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, modalidade ou cidade..."
                className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] pl-9 pr-3 py-2.5 placeholder:text-[#77746E] focus:outline-none focus:border-[#E95D2A]"
              />
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="filter-category" className="sr-only">
                Modalidade
              </label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
              >
                <option value="all">Todas as Modalidades</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Select */}
            <div>
              <label htmlFor="filter-status" className="sr-only">
                Status
              </label>
              <select
                id="filter-status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
              >
                <option value="all">Todos os Status</option>
                <option value="open_registration">Inscrições Abertas</option>
                <option value="ongoing">Em Andamento</option>
                <option value="upcoming">Em Breve</option>
                <option value="completed">Finalizada</option>
              </select>
            </div>

            {/* Season Select */}
            <div>
              <label htmlFor="filter-season" className="sr-only">
                Temporada
              </label>
              <select
                id="filter-season"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
              >
                <option value="all">Todas as Temporadas</option>
                {seasons.map((s) => (
                  <option key={s} value={s}>
                    Temporada {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedSeason !== 'all') && (
            <div className="flex items-center justify-between pt-2 border-t border-[#77746E]/20 text-xs text-[#77746E]">
              <span>Mostrando {filteredCompetitions.length} de {competitions.length} competições</span>
              <button
                onClick={resetFilters}
                className="text-[#E95D2A] hover:underline flex items-center gap-1 font-bold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Limpar filtros</span>
              </button>
            </div>
          )}
        </div>

        {/* Competitions List */}
        {filteredCompetitions.length > 0 ? (
          <div className="space-y-6">
            {filteredCompetitions.map((comp, idx) => (
              <div
                key={comp.id}
                className="border border-[#77746E]/30 bg-[#181716] hover:border-[#E95D2A] transition-all p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group"
              >
                {/* Photo / Visual badge if available */}
                <div className="lg:col-span-3 space-y-3">
                  {comp.bannerUrl ? (
                    <div className="w-full h-36 overflow-hidden border border-[#77746E]/30 bg-[#121212]">
                      <img
                        src={comp.bannerUrl}
                        alt={`Capa oficial ${comp.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-36 border border-[#77746E]/20 bg-[#131312] flex items-center justify-center text-[#77746E]">
                      <Trophy className="w-10 h-10" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#77746E]">
                      {(idx + 1).toString().padStart(2, '0')} • {comp.category}
                    </span>
                    <span className="text-xs font-semibold text-[#B9D531]">
                      {comp.season}
                    </span>
                  </div>
                </div>

                {/* Details info */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={comp.status} size="sm" />
                    {comp.organizerName && (
                      <span className="text-[11px] text-[#77746E] uppercase font-semibold">
                        Org: {comp.organizerName}
                      </span>
                    )}
                  </div>

                  <h2
                    onClick={() => navigate('competition-detail', comp.slug)}
                    className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#F1EDE4] group-hover:text-[#E95D2A] cursor-pointer transition-colors leading-tight"
                  >
                    {comp.name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#77746E]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E95D2A]" />
                      <span>
                        {comp.location.city}, {comp.location.state}
                        {comp.location.venue ? ` (${comp.location.venue})` : ''}
                      </span>
                    </div>

                    {comp.startDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#B9D531]" />
                        <span>
                          {new Date(comp.startDate).toLocaleDateString('pt-BR')}
                          {comp.endDate ? ` a ${new Date(comp.endDate).toLocaleDateString('pt-BR')}` : ''}
                        </span>
                      </div>
                    )}

                    {comp.teamsCount !== undefined && comp.teamsCount > 0 && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#77746E]" />
                        <span>{comp.teamsCount} equipes participantes</span>
                      </div>
                    )}
                  </div>

                  {comp.description && (
                    <p className="text-xs sm:text-sm text-[#77746E] leading-relaxed line-clamp-2">
                      {comp.description}
                    </p>
                  )}
                </div>

                {/* Right Call-to-action */}
                <div className="lg:col-span-3 flex flex-col justify-center space-y-3 lg:border-l lg:border-[#77746E]/20 lg:pl-6">
                  {comp.prizeInfo && (
                    <div className="text-[11px] text-[#77746E]">
                      <span className="block font-bold text-[#F1EDE4] uppercase">Premiação Oficial:</span>
                      <span className="text-[#B9D531] line-clamp-2">{comp.prizeInfo}</span>
                    </div>
                  )}

                  <button
                    id={`btn-view-comp-${comp.id}`}
                    onClick={() => navigate('competition-detail', comp.slug)}
                    className="w-full py-3 bg-[#242321] group-hover:bg-[#E95D2A] text-[#F1EDE4] text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 cut-corner"
                  >
                    <span>CONHECER A COMPETIÇÃO</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhuma competição encontrada com os filtros selecionados"
            message="Tente ajustar os critérios de modalidade, status ou busca para visualizar outras competições homologadas."
            actionLabel="Limpar todos os filtros"
            onAction={resetFilters}
          />
        )}
      </div>
    </div>
  );
};
