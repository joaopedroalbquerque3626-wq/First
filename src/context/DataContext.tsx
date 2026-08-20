import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Competition,
  Team,
  OfficialResult,
  Sponsor,
  SponsorshipOpportunity,
  SponsorshipLead,
  Story,
  ImpactMetric,
  ContactMessage,
  PlatformSettings
} from '../types';
import {
  initialPlatformSettings,
  sampleCompetitions,
  sampleTeams,
  sampleResults,
  sampleSponsors,
  sampleOpportunities,
  sampleStories,
  sampleMetrics,
  sampleLeads,
  sampleContacts
} from '../data/initialData';

interface DataContextType {
  competitions: Competition[];
  teams: Team[];
  results: OfficialResult[];
  sponsors: Sponsor[];
  opportunities: SponsorshipOpportunity[];
  leads: SponsorshipLead[];
  stories: Story[];
  metrics: ImpactMetric[];
  contacts: ContactMessage[];
  settings: PlatformSettings;

  // Public Getters (Filtered by Published state)
  getPublishedCompetitions: () => Competition[];
  getPublishedTeams: () => Competition[]; // helper
  getPublishedTeamList: () => Team[];
  getPublishedResults: (competitionId?: string) => OfficialResult[];
  getPublishedStories: () => Story[];
  getActiveOpportunities: () => SponsorshipOpportunity[];
  getActiveSponsors: () => Sponsor[];
  getVisibleMetrics: () => ImpactMetric[];

  // CRUD for Competitions
  addCompetition: (item: Omit<Competition, 'id' | 'createdAt' | 'updatedAt'>) => Competition;
  updateCompetition: (id: string, item: Partial<Competition>) => void;
  deleteCompetition: (id: string) => void;

  // CRUD for Teams
  addTeam: (item: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>) => Team;
  updateTeam: (id: string, item: Partial<Team>) => void;
  deleteTeam: (id: string) => void;

  // CRUD for Results
  addResult: (item: Omit<OfficialResult, 'id' | 'createdAt'>) => OfficialResult;
  updateResult: (id: string, item: Partial<OfficialResult>) => void;
  deleteResult: (id: string) => void;

  // CRUD for Sponsors
  addSponsor: (item: Omit<Sponsor, 'id'>) => Sponsor;
  updateSponsor: (id: string, item: Partial<Sponsor>) => void;
  deleteSponsor: (id: string) => void;

  // CRUD for Opportunities
  addOpportunity: (item: Omit<SponsorshipOpportunity, 'id' | 'createdAt'>) => SponsorshipOpportunity;
  updateOpportunity: (id: string, item: Partial<SponsorshipOpportunity>) => void;
  deleteOpportunity: (id: string) => void;

  // CRUD for Stories
  addStory: (item: Omit<Story, 'id' | 'createdAt'>) => Story;
  updateStory: (id: string, item: Partial<Story>) => void;
  deleteStory: (id: string) => void;

  // CRUD for Metrics
  addMetric: (item: Omit<ImpactMetric, 'id'>) => ImpactMetric;
  updateMetric: (id: string, item: Partial<ImpactMetric>) => void;
  deleteMetric: (id: string) => void;

  // Leads & Contact
  submitSponsorshipLead: (lead: Omit<SponsorshipLead, 'id' | 'status' | 'createdAt'>) => Promise<{ success: boolean; message: string }>;
  updateLeadStatus: (id: string, status: SponsorshipLead['status'], notes?: string) => void;
  deleteLead: (id: string) => void;

  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => Promise<{ success: boolean; message: string }>;
  updateContactStatus: (id: string, status: ContactMessage['status']) => void;
  deleteContact: (id: string) => void;

  // Settings & DB Management
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  resetToCleanDatabase: () => void;
  loadSampleDataset: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonString: string) => boolean;
}

const STORAGE_KEYS = {
  competitions: 'compete_db_competitions_v1',
  teams: 'compete_db_teams_v1',
  results: 'compete_db_results_v1',
  sponsors: 'compete_db_sponsors_v1',
  opportunities: 'compete_db_opportunities_v1',
  leads: 'compete_db_leads_v1',
  stories: 'compete_db_stories_v1',
  metrics: 'compete_db_metrics_v1',
  contacts: 'compete_db_contacts_v1',
  settings: 'compete_db_settings_v1',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading storage key ${key}:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving storage key ${key}:`, err);
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [competitions, setCompetitions] = useState<Competition[]>(() =>
    loadFromStorage(STORAGE_KEYS.competitions, sampleCompetitions)
  );
  const [teams, setTeams] = useState<Team[]>(() =>
    loadFromStorage(STORAGE_KEYS.teams, sampleTeams)
  );
  const [results, setResults] = useState<OfficialResult[]>(() =>
    loadFromStorage(STORAGE_KEYS.results, sampleResults)
  );
  const [sponsors, setSponsors] = useState<Sponsor[]>(() =>
    loadFromStorage(STORAGE_KEYS.sponsors, sampleSponsors)
  );
  const [opportunities, setOpportunities] = useState<SponsorshipOpportunity[]>(() =>
    loadFromStorage(STORAGE_KEYS.opportunities, sampleOpportunities)
  );
  const [leads, setLeads] = useState<SponsorshipLead[]>(() =>
    loadFromStorage(STORAGE_KEYS.leads, sampleLeads)
  );
  const [stories, setStories] = useState<Story[]>(() =>
    loadFromStorage(STORAGE_KEYS.stories, sampleStories)
  );
  const [metrics, setMetrics] = useState<ImpactMetric[]>(() =>
    loadFromStorage(STORAGE_KEYS.metrics, sampleMetrics)
  );
  const [contacts, setContacts] = useState<ContactMessage[]>(() =>
    loadFromStorage(STORAGE_KEYS.contacts, sampleContacts)
  );
  const [settings, setSettings] = useState<PlatformSettings>(() =>
    loadFromStorage(STORAGE_KEYS.settings, initialPlatformSettings)
  );

  // Sync to localStorage
  useEffect(() => saveToStorage(STORAGE_KEYS.competitions, competitions), [competitions]);
  useEffect(() => saveToStorage(STORAGE_KEYS.teams, teams), [teams]);
  useEffect(() => saveToStorage(STORAGE_KEYS.results, results), [results]);
  useEffect(() => saveToStorage(STORAGE_KEYS.sponsors, sponsors), [sponsors]);
  useEffect(() => saveToStorage(STORAGE_KEYS.opportunities, opportunities), [opportunities]);
  useEffect(() => saveToStorage(STORAGE_KEYS.leads, leads), [leads]);
  useEffect(() => saveToStorage(STORAGE_KEYS.stories, stories), [stories]);
  useEffect(() => saveToStorage(STORAGE_KEYS.metrics, metrics), [metrics]);
  useEffect(() => saveToStorage(STORAGE_KEYS.contacts, contacts), [contacts]);
  useEffect(() => saveToStorage(STORAGE_KEYS.settings, settings), [settings]);

  // Helpers
  const getPublishedCompetitions = () =>
    competitions.filter((c) => c.statusDraft === 'published');

  const getPublishedTeamList = () =>
    teams.filter((t) => t.statusDraft === 'published');

  const getPublishedTeams = () => getPublishedCompetitions(); // type signature helper

  const getPublishedResults = (competitionId?: string) => {
    let filtered = results.filter((r) => r.statusDraft === 'published');
    if (competitionId) {
      filtered = filtered.filter((r) => r.competitionId === competitionId);
    }
    return filtered;
  };

  const getPublishedStories = () =>
    stories.filter((s) => s.statusDraft === 'published');

  const getActiveOpportunities = () =>
    opportunities.filter((o) => o.active && o.statusDraft === 'published');

  const getActiveSponsors = () => sponsors.filter((s) => s.active);

  const getVisibleMetrics = () => metrics.filter((m) => m.visible);

  // CRUD Competitions
  const addCompetition = (item: Omit<Competition, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newComp: Competition = {
      ...item,
      id: `comp-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setCompetitions((prev) => [newComp, ...prev]);
    return newComp;
  };

  const updateCompetition = (id: string, updates: Partial<Competition>) => {
    setCompetitions((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      )
    );
  };

  const deleteCompetition = (id: string) => {
    setCompetitions((prev) => prev.filter((c) => c.id !== id));
  };

  // CRUD Teams
  const addTeam = (item: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTeam: Team = {
      ...item,
      id: `team-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setTeams((prev) => [newTeam, ...prev]);
    return newTeam;
  };

  const updateTeam = (id: string, updates: Partial<Team>) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const deleteTeam = (id: string) => {
    setTeams((prev) => prev.filter((t) => t.id !== id));
  };

  // CRUD Results
  const addResult = (item: Omit<OfficialResult, 'id' | 'createdAt'>) => {
    const newRes: OfficialResult = {
      ...item,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setResults((prev) => [newRes, ...prev]);
    return newRes;
  };

  const updateResult = (id: string, updates: Partial<OfficialResult>) => {
    setResults((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteResult = (id: string) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  // CRUD Sponsors
  const addSponsor = (item: Omit<Sponsor, 'id'>) => {
    const newSponsor: Sponsor = {
      ...item,
      id: `sp-${Date.now()}`,
    };
    setSponsors((prev) => [newSponsor, ...prev]);
    return newSponsor;
  };

  const updateSponsor = (id: string, updates: Partial<Sponsor>) => {
    setSponsors((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSponsor = (id: string) => {
    setSponsors((prev) => prev.filter((s) => s.id !== id));
  };

  // CRUD Opportunities
  const addOpportunity = (item: Omit<SponsorshipOpportunity, 'id' | 'createdAt'>) => {
    const newOpp: SponsorshipOpportunity = {
      ...item,
      id: `opp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    return newOpp;
  };

  const updateOpportunity = (id: string, updates: Partial<SponsorshipOpportunity>) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
  };

  // CRUD Stories
  const addStory = (item: Omit<Story, 'id' | 'createdAt'>) => {
    const newStory: Story = {
      ...item,
      id: `story-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setStories((prev) => [newStory, ...prev]);
    return newStory;
  };

  const updateStory = (id: string, updates: Partial<Story>) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteStory = (id: string) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
  };

  // CRUD Metrics
  const addMetric = (item: Omit<ImpactMetric, 'id'>) => {
    const newMetric: ImpactMetric = {
      ...item,
      id: `met-${Date.now()}`,
    };
    setMetrics((prev) => [...prev, newMetric]);
    return newMetric;
  };

  const updateMetric = (id: string, updates: Partial<ImpactMetric>) => {
    setMetrics((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteMetric = (id: string) => {
    setMetrics((prev) => prev.filter((m) => m.id !== id));
  };

  // Lead Submission
  const submitSponsorshipLead = async (
    lead: Omit<SponsorshipLead, 'id' | 'status' | 'createdAt'>
  ): Promise<{ success: boolean; message: string }> => {
    if (!lead.companyName?.trim() || !lead.contactPerson?.trim() || !lead.email?.trim()) {
      return { success: false, message: 'Por favor, preencha todos os campos obrigatórios da empresa.' };
    }

    const newLead: SponsorshipLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);
    return {
      success: true,
      message: 'Proposta registrada com sucesso! A diretoria comercial entrará em contato via e-mail e WhatsApp informados.',
    };
  };

  const updateLeadStatus = (id: string, status: SponsorshipLead['status'], notes?: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, internalNotes: notes ?? l.internalNotes } : l))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Contact Submission
  const submitContactMessage = async (
    msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>
  ): Promise<{ success: boolean; message: string }> => {
    if (!msg.name?.trim() || !msg.email?.trim() || !msg.message?.trim()) {
      return { success: false, message: 'Por favor, preencha nome, e-mail e mensagem.' };
    }

    const newMsg: ContactMessage = {
      ...msg,
      id: `cont-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };

    setContacts((prev) => [newMsg, ...prev]);
    return {
      success: true,
      message: 'Mensagem enviada com sucesso aos canais oficiais da plataforma.',
    };
  };

  const updateContactStatus = (id: string, status: ContactMessage['status']) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Platform Settings
  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Database Management
  const resetToCleanDatabase = () => {
    setCompetitions([]);
    setTeams([]);
    setResults([]);
    setSponsors([]);
    setOpportunities([]);
    setLeads([]);
    setStories([]);
    setMetrics([]);
    setContacts([]);
    setSettings(initialPlatformSettings);
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  };

  const loadSampleDataset = () => {
    setCompetitions(sampleCompetitions);
    setTeams(sampleTeams);
    setResults(sampleResults);
    setSponsors(sampleSponsors);
    setOpportunities(sampleOpportunities);
    setLeads(sampleLeads);
    setStories(sampleStories);
    setMetrics(sampleMetrics);
    setContacts(sampleContacts);
    setSettings(initialPlatformSettings);
  };

  const exportDatabaseJson = () => {
    const payload = {
      competitions,
      teams,
      results,
      sponsors,
      opportunities,
      leads,
      stories,
      metrics,
      contacts,
      settings,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(payload, null, 2);
  };

  const importDatabaseJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.competitions) setCompetitions(data.competitions);
      if (data.teams) setTeams(data.teams);
      if (data.results) setResults(data.results);
      if (data.sponsors) setSponsors(data.sponsors);
      if (data.opportunities) setOpportunities(data.opportunities);
      if (data.leads) setLeads(data.leads);
      if (data.stories) setStories(data.stories);
      if (data.metrics) setMetrics(data.metrics);
      if (data.contacts) setContacts(data.contacts);
      if (data.settings) setSettings(data.settings);
      return true;
    } catch (err) {
      console.error('Failed to parse database json:', err);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        competitions,
        teams,
        results,
        sponsors,
        opportunities,
        leads,
        stories,
        metrics,
        contacts,
        settings,
        getPublishedCompetitions,
        getPublishedTeams,
        getPublishedTeamList,
        getPublishedResults,
        getPublishedStories,
        getActiveOpportunities,
        getActiveSponsors,
        getVisibleMetrics,
        addCompetition,
        updateCompetition,
        deleteCompetition,
        addTeam,
        updateTeam,
        deleteTeam,
        addResult,
        updateResult,
        deleteResult,
        addSponsor,
        updateSponsor,
        deleteSponsor,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        addStory,
        updateStory,
        deleteStory,
        addMetric,
        updateMetric,
        deleteMetric,
        submitSponsorshipLead,
        updateLeadStatus,
        deleteLead,
        submitContactMessage,
        updateContactStatus,
        deleteContact,
        updateSettings,
        resetToCleanDatabase,
        loadSampleDataset,
        exportDatabaseJson,
        importDatabaseJson,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within DataProvider');
  }
  return ctx;
};
