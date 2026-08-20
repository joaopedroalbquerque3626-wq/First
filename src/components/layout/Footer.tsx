import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useData } from '../../context/DataContext';
import { ArrowUpRight, Lock, Mail, Phone, MapPin, Instagram, Linkedin, Bot } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const { settings } = useData();

  return (
    <footer id="main-footer" className="bg-[#1A1A1A] border-t border-[#1A1A1A] text-[#FDFCF8] mt-auto">
      {/* Top Banner Stripe */}
      <div className="border-b border-[#FDFCF8]/10 bg-[#151515] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#B44D2E] mb-2 font-sans">
              Robótica Competitiva &bull; Arenas de Combate &bull; FRC &bull; Patrocínio
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-[#FDFCF8] tracking-tight">
              ROBÔS NÃO SE CONSTROEM SOZINHOS.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('competitions')}
              className="px-5 py-3 border border-[#FDFCF8]/30 hover:border-[#FDFCF8] text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#FDFCF8] transition-colors"
            >
              Ver Competições &rarr;
            </button>
            <button
              onClick={() => navigate('sponsorship')}
              className="px-6 py-3 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-colors inline-flex items-center gap-2"
            >
              <span>Patrocinar Robótica</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Manifesto */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#B44D2E] flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#FDFCF8]" />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter text-[#FDFCF8]">
                {settings.platformName || 'ROBOCOMPETE'}.
              </span>
            </div>
            <p className="text-xs text-[#FDFCF8]/70 leading-relaxed font-sans">
              {settings.tagline || 'Plataforma Oficial de Competições de Robótica, Equipes e Patrocínio.'}
            </p>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#FDFCF8]/40 border-t border-[#FDFCF8]/10 pt-3 font-sans">
              Súmulas e laudos técnicos homologados por ligas de robótica e bancas examinadoras.
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FDFCF8] mb-4 pb-2 border-b border-[#FDFCF8]/10 font-sans">
              Índice
            </div>
            <ul className="space-y-2 text-xs uppercase tracking-[0.15em] text-[#FDFCF8]/70 font-sans">
              <li>
                <button
                  onClick={() => navigate('competitions')}
                  className="hover:text-[#B44D2E] transition-colors"
                >
                  Competições Homologadas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('teams')}
                  className="hover:text-[#B44D2E] transition-colors"
                >
                  Equipes & Atletas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('results')}
                  className="hover:text-[#B44D2E] transition-colors"
                >
                  Resultados Oficiais
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('sponsorship')}
                  className="hover:text-[#B44D2E] transition-colors"
                >
                  Oportunidades de Patrocínio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-[#B44D2E] transition-colors"
                >
                  Sobre a Plataforma
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Real Contacts */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FDFCF8] mb-4 pb-2 border-b border-[#FDFCF8]/10 font-sans">
              Canais Oficiais
            </div>
            <div className="space-y-3 text-xs text-[#FDFCF8]/70 font-sans">
              {settings.officialContact.email && (
                <div className="flex items-center gap-2 text-[#FDFCF8]">
                  <Mail className="w-3.5 h-3.5 text-[#B44D2E] shrink-0" />
                  <a
                    href={`mailto:${settings.officialContact.email}`}
                    className="hover:underline break-all"
                  >
                    {settings.officialContact.email}
                  </a>
                </div>
              )}
              {settings.officialContact.whatsapp && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#B44D2E] shrink-0" />
                  <span>WhatsApp: {settings.officialContact.whatsapp}</span>
                </div>
              )}
              {settings.officialContact.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FDFCF8]/50 shrink-0" />
                  <span>{settings.officialContact.address}</span>
                </div>
              )}
              {settings.officialContact.instagram && (
                <div className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-[#B44D2E] shrink-0" />
                  <span>{settings.officialContact.instagram}</span>
                </div>
              )}
              {settings.officialContact.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#B44D2E] shrink-0" />
                  <span>{settings.officialContact.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 4: Commercial & Admin */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FDFCF8] mb-4 pb-2 border-b border-[#FDFCF8]/10 font-sans">
              Comercial & Gestão
            </div>
            <p className="text-xs text-[#FDFCF8]/70 leading-relaxed mb-4 font-sans">
              Interessado em patrocinar uma competição ou equipe homologada? Solicite a proposta oficial.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => navigate('sponsorship')}
                className="w-full text-left px-3.5 py-2.5 bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 border border-[#FDFCF8]/15 text-xs font-semibold text-[#FDFCF8] flex items-center justify-between transition-colors font-sans"
              >
                <span>Propostas Comerciais</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B44D2E]" />
              </button>

              <button
                id="footer-admin-link"
                onClick={() => navigate('admin')}
                className="w-full text-left px-3.5 py-2.5 bg-transparent hover:bg-[#FDFCF8]/5 text-xs text-[#FDFCF8]/60 hover:text-[#FDFCF8] flex items-center gap-2 transition-colors border border-transparent hover:border-[#FDFCF8]/10 font-sans"
              >
                <Lock className="w-3 h-3 text-[#B44D2E]" />
                <span>Área Administrativa (Gestão)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#FDFCF8]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FDFCF8]/50 font-sans">
          <p>© {new Date().getFullYear()} {settings.platformName || 'COMPETE'} &mdash; Todos os direitos reservados. Edição Oficial.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate('about')} className="hover:text-[#FDFCF8]">
              Propósito Editorial
            </button>
            <button onClick={() => navigate('contact')} className="hover:text-[#FDFCF8]">
              Contato
            </button>
            <button onClick={() => navigate('admin')} className="hover:text-[#B44D2E]">
              Acesso Restrito
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
