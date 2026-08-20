import React from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { ShieldCheck, ArrowUpRight, Bot, Cpu } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { settings } = useData();
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-[#FDFCF8] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title Header */}
        <section className="border-b border-[#1A1A1A]/10 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/5 text-[#B44D2E] text-[10px] uppercase font-bold tracking-[0.3em] border border-[#1A1A1A]/10 font-sans">
            PROPÓSITO, REGULAMENTOS & HOMOLOGAÇÃO
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tight">
            SOBRE O ROBOCOMPETE.
          </h1>
          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-2xl font-sans">
            Estrutura oficial de homologação técnica, laudos de segurança em arenas blindadas e conexões comerciais para o ecossistema nacional de robótica competitiva.
          </p>
        </section>

        {/* Manifesto & Purpose */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-[#1A1A1A]">
              {settings.manifestoTitle || 'ENGENHARIA LEVADA AO LIMITE.'}
            </h2>
            <div className="text-sm sm:text-base text-[#1A1A1A]/85 leading-relaxed space-y-4 whitespace-pre-line font-sans">
              <p>{settings.aboutText}</p>
              {settings.aboutMission && (
                <div className="p-5 border-l-2 border-[#B44D2E] bg-[#F6F4EE]">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#B44D2E] block mb-1 font-sans">
                    Missão Central
                  </span>
                  <p className="text-sm font-serif italic text-[#1A1A1A]">
                    {settings.aboutMission}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 text-[#B44D2E]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-base font-display font-bold uppercase text-[#1A1A1A]">
                  Compromisso Técnico Inegociável
                </h3>
              </div>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                Todas as categorias de combate (Featherweight, Beetleweight, Antweight), FRC, FTC e autônomos seguem rigorosos critérios de inspeção de segurança elétrica, sistemas failsafe e contenção balística.
              </p>
            </div>

            <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 text-[#B44D2E]">
                <Cpu className="w-5 h-5" />
                <h3 className="text-base font-display font-bold uppercase text-[#1A1A1A]">
                  Conexão com a Indústria 4.0
                </h3>
              </div>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                Aproximamos indústrias, empresas de automação, softwares CAD/CAM e fabricantes de semicondutores dos maiores talentos universitários e técnicos do país.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars */}
        {settings.aboutPillars && settings.aboutPillars.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#1A1A1A]/10">
            <h2 className="text-2xl font-display font-bold uppercase text-[#1A1A1A]">
              Pilares Fundamentais do Circuito
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {settings.aboutPillars.map((p, idx) => (
                <div
                  key={idx}
                  className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-2 border-t-2 border-t-[#B44D2E] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#B44D2E] font-sans">
                    0{idx + 1}. Pilar
                  </span>
                  <h3 className="text-xl font-display font-bold uppercase text-[#1A1A1A]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Commercial Callout */}
        <section className="p-8 sm:p-12 border border-[#1A1A1A]/10 bg-[#1A1A1A] text-[#FDFCF8] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#FDFCF8]">
              Quer homologar seu torneio ou patrocinar equipes de robótica?
            </h3>
            <p className="text-xs sm:text-sm text-[#FDFCF8]/70 mt-1 font-sans">
              Nossa comissão técnica e diretoria comercial atendem organizadores, universidades e empresas parceiras.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => navigate('contact')}
              className="px-5 py-3 border border-[#FDFCF8]/30 hover:border-[#FDFCF8] text-[11px] uppercase tracking-widest font-bold text-[#FDFCF8] transition-colors font-sans"
            >
              Falar Conosco
            </button>
            <button
              onClick={() => navigate('sponsorship')}
              className="px-6 py-3 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] text-[11px] uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-1.5 font-sans"
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
