import React, { useState } from 'react';
import { useNavigation, RoutePath } from '../../context/NavigationContext';
import { useData } from '../../context/DataContext';
import { Menu, X, ArrowUpRight, ShieldCheck, Bot } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute, navigate, isAdminAuthenticated } = useNavigation();
  const { settings } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: RoutePath }[] = [
    { label: 'INÍCIO', route: 'home' },
    { label: 'COMPETIÇÕES', route: 'competitions' },
    { label: 'EQUIPES', route: 'teams' },
    { label: 'SÚMULAS & RESULTADOS', route: 'results' },
    { label: 'PATROCÍNIO', route: 'sponsorship' },
    { label: 'SOBRE', route: 'about' },
    { label: 'CONTATO', route: 'contact' },
  ];

  const handleNavClick = (route: RoutePath) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 bg-[#1A1A1A] text-[#FDFCF8] flex items-center justify-center font-display font-black text-xl tracking-tighter group-hover:bg-[#B44D2E] transition-colors">
                <Bot className="w-5 h-5 text-[#FDFCF8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-bold text-[#B44D2E] leading-none mb-1">
                  Robótica Competitiva &bull; Oficial
                </span>
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter text-[#1A1A1A] leading-none">
                  {settings.platformName || 'ROBOCOMPETE'}.
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Navegação Principal">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3 py-2 text-[11px] xl:text-xs font-semibold tracking-[0.2em] uppercase transition-colors relative ${
                    isActive
                      ? 'text-[#B44D2E] font-bold'
                      : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B44D2E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Sponsor CTA + Admin access indicator */}
          <div className="hidden sm:flex items-center gap-4">
            {isAdminAuthenticated && (
              <button
                id="admin-quick-badge"
                onClick={() => navigate('admin')}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] bg-[#1A1A1A]/5 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A]/10 transition-colors"
                title="Painel Administrativo Ativo"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#B44D2E]" />
                <span>Painel</span>
              </button>
            )}

            <button
              id="header-cta-sponsor"
              onClick={() => handleNavClick('sponsorship')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#B44D2E] text-[#FDFCF8] font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all group shadow-sm"
            >
              <span>QUERO PATROCINAR</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A1A1A] hover:text-[#B44D2E] border border-[#1A1A1A]/20 bg-[#FFFFFF] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFCF8] border-b border-[#1A1A1A]/10 px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1" aria-label="Navegação Mobile">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`mobile-nav-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-left px-3 py-3 text-xs font-semibold tracking-[0.2em] uppercase border-l-2 ${
                    isActive
                      ? 'border-[#B44D2E] bg-[#F6F4EE] text-[#B44D2E]'
                      : 'border-transparent text-[#1A1A1A]/70 hover:bg-[#F6F4EE]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#1A1A1A]/10 flex flex-col gap-3">
            <button
              id="mobile-cta-sponsor"
              onClick={() => handleNavClick('sponsorship')}
              className="w-full text-center py-3 bg-[#1A1A1A] text-[#FDFCF8] font-sans font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <span>QUERO PATROCINAR</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              id="mobile-nav-admin"
              onClick={() => handleNavClick('admin')}
              className="text-center py-2 text-[11px] uppercase tracking-widest text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
            >
              {isAdminAuthenticated ? 'Painel Administrativo (Conectado)' : 'Acesso da Organização (Admin)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
