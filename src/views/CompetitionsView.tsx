import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { CompetitionStatus } from '../types';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ArrowUpRight,
  Bot,
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
    <div className="min-h-screen py-12 sm:py-16 bg-[#FDFCF8] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title Section */}
        <div className="border-b border-[#1A1A1A]/10 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/5 text-[#B44D2E] text-[10px] uppercase font-bold tracking-[0.3em] border border-[#1A1A1A]/10 font-sans">
            CIRCUITO OFICIAL HOMOLOGADO DE ROBÓTICA
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tight">
            COMPETIÇÕES.
          </h1>
          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-2xl font-sans">
            Consulte arenas blindadas, torneios de combate de robôs, desafios de FIRST Robotics (FRC/FTC), seguidores de linha e sumô com regulamentos de segurança e súmulas técnicas.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-4 sm:p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label htmlFor="search-competitions" className="sr-only">
                Buscar competição
              </label>
              <Search className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="search-competitions"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, modalidade ou cidade..."
                className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] pl-9 pr-3 py-2.5 placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-[#B44D2E] font-sans"
              />
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="filter-category" className="sr-only">
                Modalidade de Robótica
              </label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
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
                className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
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
                className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
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
            <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/60 font-sans">
              <span>Mostrando {filteredCompetitions.length} de {competitions.length} competições</span>
              <button
                onClick={resetFilters}
                className="text-[#B44D2E] hover:underline flex items-center gap-1 font-bold"
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
                className="border border-[#1A1A1A]/10 bg-[#FFFFFF] hover:border-[#1A1A1A] transition-all p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                {/* Photo / Visual badge if available */}
                <div className="lg:col-span-3 space-y-3">
                  {comp.bannerUrl ? (
                    <div className="w-full h-36 overflow-hidden border border-[#1A1A1A]/10 bg-[#F6F4EE]">
                      <img
                        src={comp.bannerUrl}
                        alt={`Capa oficial ${comp.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-36 border border-[#1A1A1A]/10 bg-[#F6F4EE] flex items-center justify-center text-[#1A1A1A]/40">
                      <Bot className="w-10 h-10" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/50 font-sans">
                      {(idx + 1).toString().padStart(2, '0')} • {comp.category}
                    </span>
                    <span className="text-xs font-semibold text-[#B44D2E] font-serif">
                      {comp.season}
                    </span>
                  </div>
                </div>

                {/* Details info */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={comp.status} size="sm" />
                    {comp.organizerName && (
                      <span className="text-[10px] text-[#1A1A1A]/50 uppercase font-semibold tracking-wider font-sans">
                        Org: {comp.organizerName}
                      </span>
                    )}
                  </div>

                  <h2
                    onClick={() => navigate('competition-detail', comp.slug)}
                    className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#1A1A1A] group-hover:text-[#B44D2E] cursor-pointer transition-colors leading-tight"
                  >
                    {comp.name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#1A1A1A]/60 font-sans">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B44D2E]" />
                      <span>
                        {comp.location.city}, {comp.location.state}
                        {comp.location.venue ? ` (${comp.location.venue})` : ''}
                      </span>
                    </div>

                    {comp.startDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
                        <span>
                          {new Date(comp.startDate).toLocaleDateString('pt-BR')}
                          {comp.endDate ? ` a ${new Date(comp.endDate).toLocaleDateString('pt-BR')}` : ''}
                        </span>
                      </div>
                    )}

                    {comp.teamsCount !== undefined && comp.teamsCount > 0 && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#1A1A1A]/40" />
                        <span>{comp.teamsCount} equipes de robôs</span>
                      </div>
                    )}
                  </div>

                  {comp.description && (
                    <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed line-clamp-2 font-sans">
                      {comp.description}
                    </p>
                  )}
                </div>

                {/* Right Call-to-action */}
                <div className="lg:col-span-3 flex flex-col justify-center space-y-3 lg:border-l lg:border-[#1A1A1A]/10 lg:pl-6">
                  {comp.prizeInfo && (
                    <div className="text-[11px] text-[#1A1A1A]/60 font-sans">
                      <span className="block font-bold text-[#1A1A1A] uppercase">Premiação Oficial:</span>
                      <span className="text-[#B44D2E] line-clamp-2 font-medium">{comp.prizeInfo}</span>
                    </div>
                  )}

                  <button
                    id={`btn-view-comp-${comp.id}`}
                    onClick={() => navigate('competition-detail', comp.slug)}
                    className="w-full py-3 bg-[#1A1A1A] group-hover:bg-[#B44D2E] text-[#FDFCF8] text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-colors flex items-center justify-center gap-2"
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
            title="Nenhuma competição de robótica encontrada com os filtros selecionados"
            message="Tente ajustar os critérios de modalidade, status ou busca para visualizar outros torneios de robótica homologados."
            actionLabel="Limpar todos os filtros"
            onAction={resetFilters}
          />
        )}
      </div>
    </div>
  );
};
