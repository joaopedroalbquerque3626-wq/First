import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { EmptyState } from '../components/common/EmptyState';
import { Trophy, Calendar, CheckCircle2 } from 'lucide-react';

export const ResultsView: React.FC = () => {
  const { getPublishedResults, getPublishedCompetitions } = useData();
  const { navigate } = useNavigation();

  const competitions = getPublishedCompetitions();
  const [selectedCompId, setSelectedCompId] = useState<string>('all');

  const results = getPublishedResults(selectedCompId === 'all' ? undefined : selectedCompId);

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Section */}
        <div className="border-b border-[#77746E]/20 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252422] text-[#B9D531] text-xs uppercase font-bold tracking-widest border border-[#B9D531]/30">
            SÚMULAS & PLACARES AUDITADOS
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase text-[#F1EDE4] leading-tight">
            RESULTADOS OFICIAIS.
          </h1>
          <p className="text-sm sm:text-base text-[#77746E] max-w-2xl">
            Acompanhe os placares de confrontos e tabelas de classificação homologados pela mesa técnica e arbitragem.
          </p>
        </div>

        {/* Competition Filter */}
        <div className="border border-[#77746E]/30 bg-[#181716] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-bold text-[#F1EDE4] shrink-0">
              Filtrar por Competição:
            </span>
            <select
              value={selectedCompId}
              onChange={(e) => setSelectedCompId(e.target.value)}
              className="bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2 focus:outline-none focus:border-[#E95D2A]"
            >
              <option value="all">Todas as Competições com Resultados</option>
              {competitions.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.name} ({comp.category})
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-[#77746E]">
            {results.length} súmula(s) oficial(is) encontrada(s)
          </div>
        </div>

        {/* Results List */}
        {results.length > 0 ? (
          <div className="space-y-8">
            {results.map((res) => {
              const comp = competitions.find((c) => c.id === res.competitionId);

              return (
                <div
                  key={res.id}
                  className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#77746E]/20 pb-4">
                    <div>
                      {comp && (
                        <button
                          onClick={() => navigate('competition-detail', comp.slug)}
                          className="text-xs uppercase font-bold text-[#B9D531] hover:underline block"
                        >
                          {comp.name} • {comp.category}
                        </button>
                      )}
                      <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4] mt-0.5">
                        {res.stageName}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#77746E]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(res.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#B9D531]/10 text-[#B9D531] font-semibold border border-[#B9D531]/30 uppercase text-[10px]">
                        Súmula Homologada
                      </span>
                    </div>
                  </div>

                  {/* Match Scores */}
                  {res.type === 'match' && res.matches && (
                    <div className="divide-y divide-[#77746E]/20">
                      {res.matches.map((m, idx) => (
                        <div
                          key={idx}
                          className="py-4 flex flex-col md:flex-row items-center justify-between gap-4"
                        >
                          <div className="w-full md:w-5/12 text-center md:text-right font-display font-bold text-xl sm:text-2xl text-[#F1EDE4]">
                            {m.teamAName}
                          </div>

                          <div className="px-5 py-2 bg-[#242321] border border-[#77746E]/40 font-display font-black text-2xl sm:text-3xl tracking-widest text-[#B9D531] cut-corner shrink-0">
                            {m.scoreA} : {m.scoreB}
                          </div>

                          <div className="w-full md:w-5/12 text-center md:text-left font-display font-bold text-xl sm:text-2xl text-[#F1EDE4]">
                            {m.teamBName}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ranking / Table */}
                  {res.type === 'ranking' && res.ranking && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-[#77746E]/30 text-[#77746E] uppercase text-[11px]">
                            <th className="py-3 px-3">Posição</th>
                            <th className="py-3 px-3">Equipe / Competidor</th>
                            <th className="py-3 px-3 text-center">Pontos</th>
                            <th className="py-3 px-3 text-center">Jogos</th>
                            <th className="py-3 px-3 text-center">Vitórias</th>
                            <th className="py-3 px-3 text-center">Derrotas</th>
                            <th className="py-3 px-3 text-center">Saldo</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#77746E]/20 text-[#F1EDE4]">
                          {res.ranking.map((row) => (
                            <tr key={row.rank} className="hover:bg-[#1f1e1c]">
                              <td className="py-3.5 px-3 font-display font-bold text-lg text-[#B9D531]">
                                #{row.rank}
                              </td>
                              <td className="py-3.5 px-3 font-semibold uppercase">
                                {row.teamOrParticipantName}
                              </td>
                              <td className="py-3.5 px-3 text-center font-bold text-[#E95D2A] text-base">
                                {row.points ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-center text-[#77746E]">
                                {row.matchesPlayed ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-center text-[#77746E]">
                                {row.wins ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-center text-[#77746E]">
                                {row.losses ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-center text-[#77746E]">
                                {row.scoreDifference ?? '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {res.notes && (
                    <div className="pt-2 border-t border-[#77746E]/20 text-xs text-[#77746E]">
                      <span className="font-bold text-[#F1EDE4]">Nota da Arbitragem:</span> {res.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Nenhum resultado homologado para a seleção"
            message="Resultados oficiais são publicados imediatamente após validação da comissão técnica e assinatura das súmulas."
          />
        )}
      </div>
    </div>
  );
};
