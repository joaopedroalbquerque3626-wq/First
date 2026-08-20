import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { EmptyState } from '../components/common/EmptyState';
import { Search, MapPin, Users, ArrowUpRight, Sparkles, X, Bot, Cpu } from 'lucide-react';

export const TeamsView: React.FC = () => {
  const { getPublishedTeamList } = useData();
  const { navigate } = useNavigation();
  const teams = getPublishedTeamList();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlySeekingSponsorship, setOnlySeekingSponsorship] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(teams.map((t) => t.category));
    return Array.from(set);
  }, [teams]);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesSearch =
        !searchQuery ||
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || team.category === selectedCategory;
      const matchesSeeking = !onlySeekingSponsorship || team.isSeekingSponsorship;

      return matchesSearch && matchesCategory && matchesSeeking;
    });
  }, [teams, searchQuery, selectedCategory, onlySeekingSponsorship]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setOnlySeekingSponsorship(false);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-[#FDFCF8] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Section */}
        <div className="border-b border-[#1A1A1A]/10 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/5 text-[#B44D2E] text-[10px] uppercase font-bold tracking-[0.3em] border border-[#1A1A1A]/10 font-sans">
            ENGENHARIA, BANCADAS & BOXES DE ROBÓTICA
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tight">
            EQUIPES DE ROBÓTICA.
          </h1>
          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-2xl font-sans">
            Diretório de equipes de combate, escuderias de FIRST Robotics (FRC), desenvolvedores de autônomos, pilotos e mentores com propostas abertas de patrocínio técnico e institucional.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-4 sm:p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="relative sm:col-span-1">
              <Search className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por equipe, robô, categoria ou cidade..."
                className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] pl-9 pr-3 py-2.5 placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-[#B44D2E] font-sans"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
              >
                <option value="all">Todas as Modalidades de Robótica</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Seeking Sponsorship Toggle */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs uppercase font-bold text-[#1A1A1A] font-sans">
                <input
                  type="checkbox"
                  checked={onlySeekingSponsorship}
                  onChange={(e) => setOnlySeekingSponsorship(e.target.checked)}
                  className="w-4 h-4 accent-[#B44D2E]"
                />
                <span className="flex items-center gap-1 text-[#B44D2E]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apenas equipes buscando patrocínio</span>
                </span>
              </label>
            </div>
          </div>

          {(searchQuery || selectedCategory !== 'all' || onlySeekingSponsorship) && (
            <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/60 font-sans">
              <span>Mostrando {filteredTeams.length} de {teams.length} equipes</span>
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

        {/* Teams Grid */}
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <div
                key={team.id}
                onClick={() => navigate('team-detail', team.slug)}
                className="border border-[#1A1A1A]/10 bg-[#FFFFFF] hover:border-[#1A1A1A] p-6 space-y-4 cursor-pointer group transition-all flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className="space-y-4">
                  {/* Top Bar with Badge and Category */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-16 h-16 bg-[#F6F4EE] border border-[#1A1A1A]/10 overflow-hidden flex items-center justify-center group-hover:border-[#B44D2E] transition-colors">
                      {team.badgeUrl ? (
                        <img
                          src={team.badgeUrl}
                          alt={`Escudo ${team.name}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Bot className="w-8 h-8 text-[#1A1A1A]/40" />
                      )}
                    </div>

                    <div className="text-right">
                      <span className="px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-[#F6F4EE] text-[#B44D2E] border border-[#1A1A1A]/10 block font-sans">
                        {team.category}
                      </span>
                      <span className="text-[11px] text-[#1A1A1A]/60 block mt-1 font-sans">
                        {team.city}, {team.state}
                      </span>
                    </div>
                  </div>

                  {/* Team Name */}
                  <h2 className="text-2xl font-display font-bold uppercase text-[#1A1A1A] group-hover:text-[#B44D2E] transition-colors leading-tight">
                    {team.name}
                  </h2>

                  {/* Bio */}
                  {team.bio && (
                    <p className="text-xs text-[#1A1A1A]/70 line-clamp-3 leading-relaxed font-sans">
                      {team.bio}
                    </p>
                  )}

                  {/* Achievements summary if available */}
                  {team.achievements && team.achievements.length > 0 && (
                    <div className="text-[11px] text-[#1A1A1A] bg-[#F6F4EE] p-2.5 border border-[#1A1A1A]/10 font-sans">
                      <span className="text-[#B44D2E] font-bold block mb-0.5">Conquista Homologada:</span>
                      <span>{team.achievements[0].placement} — {team.achievements[0].competitionName} ({team.achievements[0].year})</span>
                    </div>
                  )}
                </div>

                {/* Footer status / Sponsorship CTA */}
                <div className="pt-4 border-t border-[#1A1A1A]/10 space-y-2">
                  {team.isSeekingSponsorship ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#B44D2E] uppercase font-sans">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Aberta a Patrocínio Técnico / Master</span>
                    </div>
                  ) : (
                    <div className="text-xs text-[#1A1A1A]/60 font-sans">
                      Equipe Homologada
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1A] group-hover:text-[#B44D2E] font-sans">
                    <span>VER HISTÓRICO & ROBÔS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhuma equipe de robótica encontrada com os filtros selecionados"
            message="Ajuste os filtros de modalidade ou termo de busca para visualizar outras equipes de engenharia homologadas."
            actionLabel="Limpar filtros"
            onAction={resetFilters}
          />
        )}
      </div>
    </div>
  );
};
