import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { EmptyState } from '../components/common/EmptyState';
import { Search, MapPin, Users, ArrowUpRight, Sparkles, X } from 'lucide-react';

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
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Section */}
        <div className="border-b border-[#77746E]/20 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252422] text-[#E95D2A] text-xs uppercase font-bold tracking-widest border border-[#E95D2A]/30">
            PROTAGONISMO & IDENTIDADE
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase text-[#F1EDE4] leading-tight">
            CONHEÇA QUEM ESTÁ NA DISPUTA.
          </h1>
          <p className="text-sm sm:text-base text-[#77746E] max-w-2xl">
            Perfis de equipes homologadas, integrantes, histórico de conquistas e canais para propostas de patrocínio direto.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="border border-[#77746E]/30 bg-[#181716] p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="relative sm:col-span-1">
              <Search className="w-4 h-4 text-[#77746E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por equipe, modalidade ou cidade..."
                className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] pl-9 pr-3 py-2.5 placeholder:text-[#77746E] focus:outline-none focus:border-[#E95D2A]"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
              >
                <option value="all">Todas as Modalidades</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Seeking Sponsorship Toggle */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs uppercase font-bold text-[#F1EDE4]">
                <input
                  type="checkbox"
                  checked={onlySeekingSponsorship}
                  onChange={(e) => setOnlySeekingSponsorship(e.target.checked)}
                  className="w-4 h-4 accent-[#E95D2A]"
                />
                <span className="flex items-center gap-1 text-[#E95D2A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apenas equipes buscando patrocínio</span>
                </span>
              </label>
            </div>
          </div>

          {(searchQuery || selectedCategory !== 'all' || onlySeekingSponsorship) && (
            <div className="flex items-center justify-between pt-2 border-t border-[#77746E]/20 text-xs text-[#77746E]">
              <span>Mostrando {filteredTeams.length} de {teams.length} equipes</span>
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

        {/* Teams Grid */}
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <div
                key={team.id}
                onClick={() => navigate('team-detail', team.slug)}
                className="border border-[#77746E]/30 bg-[#181716] hover:border-[#E95D2A] p-6 space-y-4 cursor-pointer group transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar with Badge and Category */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-16 h-16 bg-[#252422] border border-[#77746E]/30 overflow-hidden flex items-center justify-center cut-corner group-hover:border-[#E95D2A] transition-colors">
                      {team.badgeUrl ? (
                        <img
                          src={team.badgeUrl}
                          alt={`Escudo ${team.name}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Users className="w-8 h-8 text-[#77746E]" />
                      )}
                    </div>

                    <div className="text-right">
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#252422] text-[#B9D531] border border-[#77746E]/30 block">
                        {team.category}
                      </span>
                      <span className="text-[11px] text-[#77746E] block mt-1">
                        {team.city}, {team.state}
                      </span>
                    </div>
                  </div>

                  {/* Team Name */}
                  <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4] group-hover:text-[#E95D2A] transition-colors leading-tight">
                    {team.name}
                  </h2>

                  {/* Bio */}
                  {team.bio && (
                    <p className="text-xs text-[#77746E] line-clamp-3 leading-relaxed">
                      {team.bio}
                    </p>
                  )}

                  {/* Achievements summary if available */}
                  {team.achievements && team.achievements.length > 0 && (
                    <div className="text-[11px] text-[#F1EDE4]/90 bg-[#131312] p-2.5 border border-[#77746E]/20">
                      <span className="text-[#B9D531] font-bold block mb-0.5">Destaque:</span>
                      <span>{team.achievements[0].placement} — {team.achievements[0].competitionName} ({team.achievements[0].year})</span>
                    </div>
                  )}
                </div>

                {/* Footer status / Sponsorship CTA */}
                <div className="pt-4 border-t border-[#77746E]/20 space-y-2">
                  {team.isSeekingSponsorship ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#E95D2A] uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Aberta a Patrocínios</span>
                    </div>
                  ) : (
                    <div className="text-xs text-[#77746E]">
                      Equipe Homologada
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-bold text-[#F1EDE4] group-hover:text-[#E95D2A]">
                    <span>VER HISTÓRICO & INTEGRANTES</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhuma equipe encontrada com os filtros selecionados"
            message="Ajuste os filtros de modalidade ou termo de busca para visualizar outras equipes homologadas."
            actionLabel="Limpar filtros"
            onAction={resetFilters}
          />
        )}
      </div>
    </div>
  );
};
