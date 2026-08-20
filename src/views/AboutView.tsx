import React from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { ShieldCheck, Target, Trophy, ArrowUpRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { settings } = useData();
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title Header */}
        <section className="border-b border-[#77746E]/20 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252422] text-[#B9D531] text-xs uppercase font-bold tracking-widest border border-[#B9D531]/30">
            PROPÓSITO & DIRETRIZES
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase text-[#F1EDE4] leading-tight">
            SOBRE A PLATAFORMA.
          </h1>
          <p className="text-sm sm:text-base text-[#77746E] max-w-2xl">
            Estrutura oficial de homologação, registro e conexões comerciais para o ecossistema de competições esportivas e culturais.
          </p>
        </section>

        {/* Manifesto & Purpose */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-[#F1EDE4]">
              {settings.manifestoTitle || 'NÃO ASSISTA DE FORA.'}
            </h2>
            <div className="text-sm sm:text-base text-[#F1EDE4]/85 leading-relaxed space-y-4 whitespace-pre-line">
              <p>{settings.aboutText}</p>
              {settings.aboutMission && (
                <div className="p-5 border-l-2 border-[#E95D2A] bg-[#1a1918]">
                  <span className="text-xs uppercase font-bold text-[#E95D2A] block mb-1">
                    Missão Central
                  </span>
                  <p className="text-sm font-medium text-[#F1EDE4]">
                    {settings.aboutMission}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-4">
              <h3 className="text-lg font-display font-bold uppercase text-[#B9D531]">
                Compromisso Factual Inegociável
              </h3>
              <p className="text-xs text-[#77746E] leading-relaxed">
                Todas as competições, regulamentos, pontuações e perfis de equipes publicados nesta plataforma passam por verificação prévia de organizadores credenciados. Não publicamos estimativas ou dados fictícios.
              </p>
            </div>

            <div className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-4">
              <h3 className="text-lg font-display font-bold uppercase text-[#E95D2A]">
                Conexão Comercial Segura
              </h3>
              <p className="text-xs text-[#77746E] leading-relaxed">
                Facilitamos a aproximação entre investidores e organizadores com propostas transparentes, contratos homologados e métricas auditáveis de presença de marca.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars */}
        {settings.aboutPillars && settings.aboutPillars.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#77746E]/20">
            <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
              Pilares Fundamentais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {settings.aboutPillars.map((p, idx) => (
                <div
                  key={idx}
                  className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-2 border-t-2 border-t-[#B9D531]"
                >
                  <span className="text-xs uppercase font-bold text-[#B9D531]">
                    0{idx + 1}. Pilar
                  </span>
                  <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#77746E] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Commercial Callout */}
        <section className="p-8 sm:p-12 border border-[#77746E]/30 bg-[#181716] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-[#F1EDE4]">
              Quer cadastrar sua competição ou patrocinar o circuito?
            </h3>
            <p className="text-xs sm:text-sm text-[#77746E] mt-1">
              Nossa equipe técnica e comercial atende organizadores e empresas parceiras.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => navigate('contact')}
              className="px-5 py-3 border border-[#77746E]/40 hover:border-[#F1EDE4] text-xs uppercase tracking-widest font-bold text-[#F1EDE4] transition-colors"
            >
              Falar Conosco
            </button>
            <button
              onClick={() => navigate('sponsorship')}
              className="px-6 py-3 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-1.5 cut-corner"
            >
              <span>Quero Patrocinar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
