import React, { createContext, useContext, useState, useEffect } from 'react';

export type RoutePath =
  | 'home'
  | 'competitions'
  | 'competition-detail'
  | 'teams'
  | 'team-detail'
  | 'results'
  | 'sponsorship'
  | 'about'
  | 'contact'
  | 'admin';

interface NavigationContextType {
  currentRoute: RoutePath;
  currentSlug?: string;
  navigate: (route: RoutePath, slug?: string, options?: { scrollToTop?: boolean; state?: any }) => void;
  goBack: () => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('compete_admin_session') === 'true';
  });

  // Sync with browser URL / hash for deep linking
  const parseUrl = () => {
    const hash = window.location.hash.replace('#', '') || '/';
    const cleanPath = hash.startsWith('/') ? hash.slice(1) : hash;
    const parts = cleanPath.split('/').filter(Boolean);

    if (parts.length === 0) {
      setCurrentRoute('home');
      setCurrentSlug(undefined);
    } else if (parts[0] === 'competicoes') {
      if (parts[1]) {
        setCurrentRoute('competition-detail');
        setCurrentSlug(parts[1]);
      } else {
        setCurrentRoute('competitions');
        setCurrentSlug(undefined);
      }
    } else if (parts[0] === 'equipes') {
      if (parts[1]) {
        setCurrentRoute('team-detail');
        setCurrentSlug(parts[1]);
      } else {
        setCurrentRoute('teams');
        setCurrentSlug(undefined);
      }
    } else if (parts[0] === 'resultados') {
      setCurrentRoute('results');
      setCurrentSlug(undefined);
    } else if (parts[0] === 'patrocinio') {
      setCurrentRoute('sponsorship');
      setCurrentSlug(undefined);
    } else if (parts[0] === 'sobre') {
      setCurrentRoute('about');
      setCurrentSlug(undefined);
    } else if (parts[0] === 'contato') {
      setCurrentRoute('contact');
      setCurrentSlug(undefined);
    } else if (parts[0] === 'admin') {
      setCurrentRoute('admin');
      setCurrentSlug(parts[1]);
    } else {
      setCurrentRoute('home');
      setCurrentSlug(undefined);
    }
  };

  useEffect(() => {
    parseUrl();
    window.addEventListener('hashchange', parseUrl);
    return () => window.removeEventListener('hashchange', parseUrl);
  }, []);

  const navigate = (route: RoutePath, slug?: string, options?: { scrollToTop?: boolean }) => {
    let newHash = '/';
    if (route === 'home') newHash = '/';
    else if (route === 'competitions') newHash = '/competicoes';
    else if (route === 'competition-detail' && slug) newHash = `/competicoes/${slug}`;
    else if (route === 'teams') newHash = '/equipes';
    else if (route === 'team-detail' && slug) newHash = `/equipes/${slug}`;
    else if (route === 'results') newHash = '/resultados';
    else if (route === 'sponsorship') newHash = '/patrocinio';
    else if (route === 'about') newHash = '/sobre';
    else if (route === 'contact') newHash = '/contato';
    else if (route === 'admin') newHash = slug ? `/admin/${slug}` : '/admin';

    window.location.hash = newHash;
    setCurrentRoute(route);
    setCurrentSlug(slug);

    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const loginAdmin = (password: string): boolean => {
    // Default master password or env
    if (password === 'admin123' || password === 'compete2025' || password === 'admin') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('compete_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('compete_admin_session');
  };

  return (
    <NavigationContext.Provider
      value={{
        currentRoute,
        currentSlug,
        navigate,
        goBack,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return ctx;
};
