import React from 'react';
import { DataProvider } from './context/DataContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Views
import { HomeView } from './views/HomeView';
import { CompetitionsView } from './views/CompetitionsView';
import { CompetitionDetailView } from './views/CompetitionDetailView';
import { TeamsView } from './views/TeamsView';
import { TeamDetailView } from './views/TeamDetailView';
import { ResultsView } from './views/ResultsView';
import { SponsorshipView } from './views/SponsorshipView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

const MainContent: React.FC = () => {
  const { currentRoute } = useNavigation();

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#B44D2E] selection:text-[#FDFCF8]">
      <Header />
      <main className="flex-1">
        {currentRoute === 'home' && <HomeView />}
        {currentRoute === 'competitions' && <CompetitionsView />}
        {currentRoute === 'competition-detail' && <CompetitionDetailView />}
        {currentRoute === 'teams' && <TeamsView />}
        {currentRoute === 'team-detail' && <TeamDetailView />}
        {currentRoute === 'results' && <ResultsView />}
        {currentRoute === 'sponsorship' && <SponsorshipView />}
        {currentRoute === 'about' && <AboutView />}
        {currentRoute === 'contact' && <ContactView />}
        {currentRoute === 'admin' && <AdminView />}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <NavigationProvider>
        <MainContent />
      </NavigationProvider>
    </DataProvider>
  );
}
