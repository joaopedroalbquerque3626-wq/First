import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { EmptyState } from '../components/common/EmptyState';
import { Calendar, CheckCircle2, Bot } from 'lucide-react';

export const ResultsView: React.FC = () => {
  const { getPublishedResults, getPublishedCompetitions } = useData();
  const { navigate } = useNavigation();

  const competitions = getPublishedCompetitions();
  const [selectedCompId, setSelectedCompId] = useState<string>('all');

  const results = getPublishedResults(selectedCompId === 'all' ? undefined : selectedCompId);

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-[#FDFCF8] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Section */}
        <div className="border-b border-[#1A1A1A]/10 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/5 text-[#B44D2E] text-[10px] uppercase font-bold tracking-[0.3em] border border-[#1A1A1A]/10 font-sans">
            SÚMULAS DE ARENA & LAUDOS TÉCNICOS AUDITADOS
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tight">
            SÚMULAS & RESULTADOS.
          </h1>
          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-2xl font-sans">
            Pontuações de combates, nocautes técnicos (KO), tempos de volta em milissegundos e rankings oficiais validados por juízes de arena e comissões técnicas.
          </p>
        </div>

        {/* Competition Filter */}
        <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-bold text-[#1A1A1A] shrink-0 font-sans">
              Filtrar por Torneio:
            </span>
            <select
              value={selectedCompId}
              onChange={(e) => setSelectedCompId(e.target.value)}
              className="bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2 focus:outline-none focus:border-[#B44D2E] font-sans"
            >
              <option value="all">Todas as Competições de Robótica</option>
              {competitions.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.name} ({comp.category})
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-[#1A1A1A]/60 font-sans">
            {results.length} súmula(s) técnica(s) encontrada(s)
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
                  className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1A1A]/10 pb-4">
                    <div>
                      {comp && (
                        <button
                          onClick={() => navigate('competition-detail', comp.slug)}
                          className="text-[10px] uppercase font-bold tracking-widest text-[#B44D2E] hover:underline block font-sans"
                        >
                          {comp.name} • {comp.category}
                        </button>
                      )}
                      <h2 className="text-2xl font-display font-bold uppercase text-[#1A1A1A] mt-0.5">
                        {res.stageName}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#1A1A1A]/60 font-sans">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
                        <span>{new Date(res.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <span className="px-2.5 py-0.5 bg-[#B44D2E]/10 text-[#B44D2E] font-bold border border-[#B44D2E]/30 uppercase text-[10px] tracking-wider">
                        Súmula Homologada
                      </span>
                    </div>
                  </div>

                  {/* Match Scores */}
                  {res.type === 'match' && res.matches && (
                    <div className="divide-y divide-[#1A1A1A]/10">
                      {res.matches.map((m, idx) => (
                        <div key={idx} className="py-5 space-y-2">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="w-full md:w-5/12 text-center md:text-right font-display font-bold text-xl sm:text-2xl text-[#1A1A1A]">
                              {m.teamAName}
                            </div>

                            <div className="px-6 py-2 bg-[#F6F4EE] border border-[#1A1A1A]/20 font-serif font-bold text-2xl sm:text-3xl tracking-widest text-[#B44D2E] shrink-0">
                              {m.scoreA} : {m.scoreB}
                            </div>

                            <div className="w-full md:w-5/12 text-center md:text-left font-display font-bold text-xl sm:text-2xl text-[#1A1A1A]">
                              {m.teamBName}
                            </div>
                          </div>
                          {m.notes && (
                            <div className="text-center text-xs text-[#1A1A1A]/70 italic font-serif max-w-xl mx-auto pt-1">
                              "{m.notes}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ranking / Table */}
                  {res.type === 'ranking' && res.ranking && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm font-sans">
                        <thead>
                          <tr className="border-b border-[#1A1A1A]/10 text-[#1A1A1A]/60 uppercase text-[10px] tracking-widest">
                            <th className="py-3 px-3">Posição</th>
                            <th className="py-3 px-3">Robô / Equipe</th>
                            <th className="py-3 px-3 text-center">Pontos</th>
                            <th className="py-3 px-3 text-center">Combates</th>
                            <th className="py-3 px-3 text-center">Vitórias</th>
                            <th className="py-3 px-3 text-center">Derrotas</th>
                            <th className="py-3 px-3 text-center">Dano / Saldo</th>
                            <th className="py-3 px-3 text-right">Observações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A1A1A]/10 text-[#1A1A1A]">
                          {res.ranking.map((row) => (
                            <tr key={row.rank} className="hover:bg-[#F6F4EE]/50 transition-colors">
                              <td className="py-3.5 px-3 font-serif font-bold text-lg text-[#B44D2E]">
                                #{row.rank}
                              </td>
                              <td className="py-3.5 px-3 font-semibold uppercase">
                                {row.teamOrParticipantName}
                              </td>
                              <td className="py-3.5 px-3 text-center font-bold text-[#1A1A1A]">
                                {row.points ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-center text-[#1A1A1A]/70">
                                {row.matchesPlayed ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-center text-[#B44D2E] font-bold">
                                {row.wins ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-center text-[#1A1A1A]/50">
                                {row.losses ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-center font-mono text-xs">
                                {row.scoreDifference ?? '-'}
                              </td>
                              <td className="py-3.5 px-3 text-right text-xs text-[#1A1A1A]/60 italic font-serif">
                                {row.notes || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {res.notes && (
                    <div className="pt-3 border-t border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/60 font-sans italic">
                      Nota técnica: {res.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Nenhum resultado registrado para esta competição"
            message="As súmulas e laudos técnicos são publicados após o término das etapas e validação pelos juízes de arena."
            actionLabel="Ver todas as competições"
            onAction={() => setSelectedCompId('all')}
          />
        )}
      </div>
    </div>
  );
};
