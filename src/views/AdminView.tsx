import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { PublicationBadge, StatusBadge } from '../components/common/StatusBadge';
import {
  Competition,
  Team,
  OfficialResult,
  Sponsor,
  SponsorshipOpportunity,
  Story,
  ImpactMetric,
  CompetitionStatus,
  PublicationStatus
} from '../types';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Trophy,
  Users,
  Award,
  DollarSign,
  FileText,
  Mail,
  BarChart3,
  Settings as SettingsIcon,
  Database,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Building2
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
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
    updateLeadStatus,
    deleteLead,
    updateContactStatus,
    deleteContact,
    updateSettings,
    resetToCleanDatabase,
    loadSampleDataset,
    exportDatabaseJson,
    importDatabaseJson,
  } = useData();

  const { isAdminAuthenticated, loginAdmin, logoutAdmin, navigate } = useNavigation();

  // Admin login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'leads' | 'competitions' | 'teams' | 'results' | 'sponsors' | 'opportunities' | 'stories' | 'metrics' | 'contacts' | 'settings' | 'database'
  >('leads');

  // Notification / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Modals / Form Editors State
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  const [editingComp, setEditingComp] = useState<Competition | null>(null);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<OfficialResult | null>(null);

  const [isOppModalOpen, setIsOppModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState<SponsorshipOpportunity | null>(null);

  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);

  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState<ImpactMetric | null>(null);

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setLoginError(false);
      setPasswordInput('');
      showToast('Autenticado com sucesso na Área Administrativa.');
    } else {
      setLoginError(true);
    }
  };

  // If not logged in, show clean admin login gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md border border-[#77746E]/30 bg-[#181716] p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#252422] border border-[#77746E]/30 text-[#B9D531] flex items-center justify-center mx-auto cut-corner">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-[#F1EDE4]">
              Área Administrativa
            </h1>
            <p className="text-xs text-[#77746E]">
              Painel restrito para organizadores e comitê técnico.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-[#E95D2A]/10 border border-[#E95D2A] text-[#E95D2A] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Senha incorreta. Tente "admin123" ou "compete2025".</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pass" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                Senha de Acesso
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Digite a senha administrativa..."
                className="w-full bg-[#131312] border border-[#77746E]/30 text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
              />
              <span className="block text-[11px] text-[#77746E] mt-1">
                Dica padrão para demonstração: <strong className="text-[#F1EDE4]">admin123</strong>
              </span>
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              className="w-full py-3 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] font-display font-bold text-base uppercase tracking-wider transition-colors cut-corner"
            >
              ENTRAR NO PAINEL
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('home')}
              className="text-xs text-[#77746E] hover:text-[#F1EDE4]"
            >
              ← Voltar ao site público
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#B9D531] text-[#151515] font-bold text-xs uppercase tracking-wider cut-corner shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Bar */}
      <div className="border-b border-[#77746E]/20 bg-[#121212] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#B9D531] text-[#151515] flex items-center justify-center cut-corner font-bold font-display text-lg">
              <ShieldCheck className="w-4 h-4 text-[#151515]" />
            </div>
            <div>
              <span className="font-display font-bold text-lg uppercase text-[#F1EDE4]">
                PAINEL ADMINISTRATIVO OFICIAL
              </span>
              <span className="text-[10px] text-[#77746E] uppercase block font-semibold">
                Controle de Dados e Homologação
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('home')}
              className="px-3 py-1.5 border border-[#77746E]/30 text-xs text-[#77746E] hover:text-[#F1EDE4] transition-colors"
            >
              Ver Site Público ↗
            </button>
            <button
              onClick={() => {
                logoutAdmin();
                showToast('Sessão administrativa encerrada.');
              }}
              className="px-3 py-1.5 bg-[#252422] hover:bg-[#E95D2A] text-xs font-bold uppercase text-[#F1EDE4] transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Dashboard Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="border-b border-[#77746E]/30 flex overflow-x-auto space-x-1 pb-1">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'leads'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Leads Comerciais ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('competitions')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'competitions'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Competições ({competitions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'teams'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Equipes ({teams.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'results'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Resultados ({results.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'opportunities'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Oportunidades ({opportunities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sponsors')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'sponsors'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Patrocinadores ({sponsors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'stories'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Histórias ({stories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'metrics'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Métricas ({metrics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'contacts'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contatos ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'settings'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Configurações</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              activeTab === 'database'
                ? 'bg-[#E95D2A] text-[#F1EDE4]'
                : 'text-[#77746E] hover:text-[#F1EDE4] bg-[#1a1918]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Banco de Dados</span>
          </button>
        </div>

        {/* TAB 1: LEADS COMERCIAIS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  Solicitações de Patrocínio ({leads.length})
                </h2>
                <p className="text-xs text-[#77746E]">
                  Propostas e contatos enviados por empresas através do portal comercial.
                </p>
              </div>
            </div>

            {leads.length > 0 ? (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#77746E]/20 pb-3">
                      <div>
                        <span className="text-xs font-bold uppercase text-[#E95D2A]">
                          Tipo: {lead.interestType.toUpperCase()}
                        </span>
                        <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                          {lead.companyName}
                        </h3>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#77746E] font-semibold">Status:</span>
                        <select
                          value={lead.status}
                          onChange={(e) => {
                            updateLeadStatus(lead.id, e.target.value as any);
                            showToast('Status do lead comercial atualizado.');
                          }}
                          className="bg-[#131312] border border-[#77746E]/30 text-xs text-[#F1EDE4] px-2 py-1 focus:outline-none"
                        >
                          <option value="new">Novo Lead</option>
                          <option value="in_contact">Em Contato</option>
                          <option value="negotiation">Negociação Aberta</option>
                          <option value="approved">Patrocínio Fechado</option>
                          <option value="declined">Recusado/Arquivado</option>
                        </select>
                        <button
                          onClick={() => {
                            if (confirm('Deseja excluir este lead?')) {
                              deleteLead(lead.id);
                              showToast('Lead excluído.');
                            }
                          }}
                          className="p-1.5 text-[#77746E] hover:text-[#E95D2A]"
                          title="Excluir Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-[#77746E] block">Responsável:</span>
                        <span className="text-[#F1EDE4] font-semibold">{lead.contactPerson}</span>
                      </div>
                      <div>
                        <span className="text-[#77746E] block">E-mail:</span>
                        <a href={`mailto:${lead.email}`} className="text-[#B9D531] hover:underline">
                          {lead.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-[#77746E] block">Telefone / WhatsApp:</span>
                        <span className="text-[#F1EDE4]">{lead.phone}</span>
                      </div>
                    </div>

                    {lead.investmentRange && (
                      <div className="text-xs">
                        <span className="text-[#77746E]">Faixa de Investimento Estimada:</span>{' '}
                        <span className="text-[#B9D531] font-bold">{lead.investmentRange}</span>
                      </div>
                    )}

                    <div className="p-3 bg-[#131312] border border-[#77746E]/20 text-xs text-[#F1EDE4]/90">
                      <span className="text-[#77746E] block font-bold mb-1">Mensagem da Empresa:</span>
                      <p className="whitespace-pre-line">{lead.message}</p>
                    </div>

                    <div className="text-[11px] text-[#77746E] flex justify-between">
                      <span>Recebido em: {new Date(lead.createdAt).toLocaleString('pt-BR')}</span>
                      {lead.targetCompetitionName && <span>Alvo: {lead.targetCompetitionName}</span>}
                      {lead.targetTeamName && <span>Alvo: {lead.targetTeamName}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border border-[#77746E]/20 text-center text-xs text-[#77746E]">
                Nenhuma solicitação de patrocínio recebida até o momento.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMPETIÇÕES */}
        {activeTab === 'competitions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  Gerenciador de Competições ({competitions.length})
                </h2>
                <p className="text-xs text-[#77746E]">
                  Cadastre torneios oficiais, regulamentos, status e dados de arena.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingComp(null);
                  setIsCompModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase font-bold tracking-wider cut-corner flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Competição</span>
              </button>
            </div>

            <div className="space-y-4">
              {competitions.map((c) => (
                <div
                  key={c.id}
                  className="border border-[#77746E]/30 bg-[#181716] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <PublicationBadge status={c.statusDraft} />
                      <StatusBadge status={c.status} size="sm" />
                      <span className="text-xs text-[#77746E]">Temporada {c.season}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                      {c.name}
                    </h3>
                    <div className="text-xs text-[#77746E]">
                      {c.category} • {c.location.city}, {c.location.state}
                      {c.teamsCount ? ` • ${c.teamsCount} equipes` : ''}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigate('competition-detail', c.slug)}
                      className="p-2 text-xs border border-[#77746E]/30 text-[#77746E] hover:text-[#F1EDE4]"
                      title="Ver Página Pública"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingComp(c);
                        setIsCompModalOpen(true);
                      }}
                      className="p-2 text-xs bg-[#252422] text-[#F1EDE4] hover:bg-[#E95D2A]"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Excluir a competição "${c.name}"?`)) {
                          deleteCompetition(c.id);
                          showToast('Competição excluída.');
                        }
                      }}
                      className="p-2 text-xs bg-[#252422] text-[#77746E] hover:text-[#E95D2A]"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EQUIPES */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  Gerenciador de Equipes ({teams.length})
                </h2>
                <p className="text-xs text-[#77746E]">
                  Gerencie equipes homologadas, integrantes, conquistas e status de busca de patrocínio.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTeam(null);
                  setIsTeamModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase font-bold tracking-wider cut-corner flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Equipe</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map((t) => (
                <div
                  key={t.id}
                  className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <PublicationBadge status={t.statusDraft} />
                      {t.isSeekingSponsorship && (
                        <span className="text-[10px] font-bold text-[#E95D2A] uppercase">
                          Buscando Patrocínio
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                      {t.name}
                    </h3>
                    <div className="text-xs text-[#77746E]">
                      {t.category} • {t.city}, {t.state}
                    </div>
                    {t.members && (
                      <div className="text-xs text-[#B9D531]">
                        {t.members.length} atleta(s) cadastrado(s)
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#77746E]/20 flex items-center justify-between">
                    <button
                      onClick={() => navigate('team-detail', t.slug)}
                      className="text-xs text-[#77746E] hover:text-[#F1EDE4] flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Perfil</span>
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingTeam(t);
                          setIsTeamModalOpen(true);
                        }}
                        className="p-1.5 bg-[#252422] text-[#F1EDE4] hover:bg-[#E95D2A]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir equipe "${t.name}"?`)) {
                            deleteTeam(t.id);
                            showToast('Equipe excluída.');
                          }
                        }}
                        className="p-1.5 bg-[#252422] text-[#77746E] hover:text-[#E95D2A]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RESULTADOS */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  Súmulas e Resultados Oficiais ({results.length})
                </h2>
                <p className="text-xs text-[#77746E]">
                  Lance placares de confrontos e tabelas de classificação homologadas.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingResult(null);
                  setIsResultModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase font-bold tracking-wider cut-corner flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Lançar Súmula Oficial</span>
              </button>
            </div>

            <div className="space-y-4">
              {results.map((r) => {
                const comp = competitions.find((c) => c.id === r.competitionId);
                return (
                  <div
                    key={r.id}
                    className="border border-[#77746E]/30 bg-[#181716] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <PublicationBadge status={r.statusDraft} />
                        <span className="text-xs uppercase font-bold text-[#E95D2A]">
                          Tipo: {r.type === 'match' ? 'Confronto/Placar' : 'Tabela de Classificação'}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                        {r.stageName}
                      </h3>
                      <div className="text-xs text-[#77746E]">
                        Competição: {comp?.name || 'Não vinculada'} • Data:{' '}
                        {new Date(r.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingResult(r);
                          setIsResultModalOpen(true);
                        }}
                        className="p-2 bg-[#252422] text-[#F1EDE4] hover:bg-[#E95D2A]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir a súmula "${r.stageName}"?`)) {
                            deleteResult(r.id);
                            showToast('Súmula excluída.');
                          }
                        }}
                        className="p-2 bg-[#252422] text-[#77746E] hover:text-[#E95D2A]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: OPORTUNIDADES DE PATROCÍNIO */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  Oportunidades Comerciais Homologadas ({opportunities.length})
                </h2>
                <p className="text-xs text-[#77746E]">
                  Cotas oficiais disponíveis para propostas de marcas.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingOpp(null);
                  setIsOppModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase font-bold tracking-wider cut-corner flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Cota de Patrocínio</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#E95D2A] uppercase font-bold">
                        {opp.type.replace('_', ' ')}
                      </span>
                      <PublicationBadge status={opp.statusDraft} />
                    </div>
                    <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                      {opp.title}
                    </h3>
                    {opp.estimatedInvestmentRange && (
                      <div className="text-xs text-[#B9D531] font-semibold">
                        {opp.estimatedInvestmentRange}
                      </div>
                    )}
                    <p className="text-xs text-[#77746E] line-clamp-2">{opp.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#77746E]/20 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingOpp(opp);
                        setIsOppModalOpen(true);
                      }}
                      className="p-1.5 bg-[#252422] text-[#F1EDE4] hover:bg-[#E95D2A]"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Excluir cota "${opp.title}"?`)) {
                          deleteOpportunity(opp.id);
                          showToast('Cota excluída.');
                        }
                      }}
                      className="p-1.5 bg-[#252422] text-[#77746E] hover:text-[#E95D2A]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PATROCINADORES */}
        {activeTab === 'sponsors' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  Patrocinadores Oficiais ({sponsors.length})
                </h2>
                <p className="text-xs text-[#77746E]">
                  Parceiros reais e marcas homologadas no circuito.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingSponsor(null);
                  setIsSponsorModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase font-bold tracking-wider cut-corner flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Patrocinador</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sponsors.map((sp) => (
                <div
                  key={sp.id}
                  className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#B9D531]">
                        {sp.tierName || sp.category}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 font-bold ${
                          sp.active ? 'bg-[#B9D531]/20 text-[#B9D531]' : 'bg-[#77746E]/20 text-[#77746E]'
                        }`}
                      >
                        {sp.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                      {sp.name}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#77746E]/20 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingSponsor(sp);
                        setIsSponsorModalOpen(true);
                      }}
                      className="p-1.5 bg-[#252422] text-[#F1EDE4] hover:bg-[#E95D2A]"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Excluir patrocinador "${sp.name}"?`)) {
                          deleteSponsor(sp.id);
                          showToast('Patrocinador excluído.');
                        }
                      }}
                      className="p-1.5 bg-[#252422] text-[#77746E] hover:text-[#E95D2A]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: HISTÓRIAS */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  Histórias Reais / Por Trás da Competição ({stories.length})
                </h2>
                <p className="text-xs text-[#77746E]">
                  Artigos e reportagens sobre atletas, equipes e bastidores.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingStory(null);
                  setIsStoryModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase font-bold tracking-wider cut-corner flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nova História</span>
              </button>
            </div>

            <div className="space-y-4">
              {stories.map((st) => (
                <div
                  key={st.id}
                  className="border border-[#77746E]/30 bg-[#181716] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <PublicationBadge status={st.statusDraft} />
                      <span className="text-xs text-[#77746E]">{st.date}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
                      {st.title}
                    </h3>
                    <p className="text-xs text-[#77746E] line-clamp-1">{st.content}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingStory(st);
                        setIsStoryModalOpen(true);
                      }}
                      className="p-2 bg-[#252422] text-[#F1EDE4] hover:bg-[#E95D2A]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Excluir a história "${st.title}"?`)) {
                          deleteStory(st.id);
                          showToast('História excluída.');
                        }
                      }}
                      className="p-2 bg-[#252422] text-[#77746E] hover:text-[#E95D2A]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: MÉTRICAS */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                  Indicadores de Impacto Verificados ({metrics.length})
                </h2>
                <p className="text-xs text-[#77746E]">
                  Apenas métricas reais e auditadas aparecem no site público.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingMetric(null);
                  setIsMetricModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] text-xs uppercase font-bold tracking-wider cut-corner flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Métrica</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metrics.map((m) => (
                <div
                  key={m.id}
                  className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-display font-black text-[#F1EDE4]">
                        {m.value} {m.unit}
                      </span>
                      <button
                        onClick={() => {
                          updateMetric(m.id, { visible: !m.visible });
                          showToast(
                            m.visible ? 'Métrica ocultada do público.' : 'Métrica visível ao público.'
                          );
                        }}
                        className={`text-[10px] px-2 py-0.5 font-bold uppercase ${
                          m.visible
                            ? 'bg-[#B9D531]/20 text-[#B9D531] border border-[#B9D531]/40'
                            : 'bg-[#77746E]/20 text-[#77746E]'
                        }`}
                      >
                        {m.visible ? 'Pública' : 'Oculta'}
                      </button>
                    </div>
                    <div className="text-sm uppercase font-bold text-[#F1EDE4] mt-1">{m.label}</div>
                    {m.description && <p className="text-xs text-[#77746E]">{m.description}</p>}
                    {m.verifiedSource && (
                      <div className="text-[10px] text-[#77746E]/80 pt-1">
                        Fonte: {m.verifiedSource}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#77746E]/20 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingMetric(m);
                        setIsMetricModalOpen(true);
                      }}
                      className="p-1.5 bg-[#252422] text-[#F1EDE4] hover:bg-[#E95D2A]"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Excluir métrica "${m.label}"?`)) {
                          deleteMetric(m.id);
                          showToast('Métrica excluída.');
                        }
                      }}
                      className="p-1.5 bg-[#252422] text-[#77746E] hover:text-[#E95D2A]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: CONTATOS */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
              Mensagens de Contato Recebidas ({contacts.length})
            </h2>

            {contacts.length > 0 ? (
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.id} className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#77746E]/20 pb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-lg text-[#F1EDE4]">
                          {c.name}
                        </span>
                        <a href={`mailto:${c.email}`} className="text-xs text-[#B9D531] hover:underline">
                          {c.email}
                        </a>
                        {c.phone && <span className="text-xs text-[#77746E]">• {c.phone}</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={c.status}
                          onChange={(e) => {
                            updateContactStatus(c.id, e.target.value as any);
                            showToast('Status da mensagem atualizado.');
                          }}
                          className="bg-[#131312] border border-[#77746E]/30 text-xs text-[#F1EDE4] px-2 py-1"
                        >
                          <option value="unread">Não Lida</option>
                          <option value="read">Lida</option>
                          <option value="replied">Respondida</option>
                        </select>
                        <button
                          onClick={() => {
                            if (confirm('Excluir mensagem?')) {
                              deleteContact(c.id);
                              showToast('Mensagem excluída.');
                            }
                          }}
                          className="p-1 text-[#77746E] hover:text-[#E95D2A]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-[#E95D2A] uppercase">
                      Assunto: {c.subject}
                    </div>
                    <p className="text-xs sm:text-sm text-[#F1EDE4]/90 whitespace-pre-line bg-[#131312] p-3 border border-[#77746E]/20">
                      {c.message}
                    </p>
                    <div className="text-[10px] text-[#77746E]">
                      Enviada em: {new Date(c.createdAt).toLocaleString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border border-[#77746E]/20 text-center text-xs text-[#77746E]">
                Nenhuma mensagem de contato recebida.
              </div>
            )}
          </div>
        )}

        {/* TAB 10: CONFIGURAÇÕES */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
              Configurações da Plataforma
            </h2>

            <div className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-4 max-w-3xl">
              <div>
                <label className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                  Nome da Plataforma
                </label>
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => updateSettings({ platformName: e.target.value })}
                  className="w-full bg-[#131312] border border-[#77746E]/30 text-sm text-[#F1EDE4] px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                  Slogan / Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => updateSettings({ tagline: e.target.value })}
                  className="w-full bg-[#131312] border border-[#77746E]/30 text-sm text-[#F1EDE4] px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                  Headline Conceitual do Hero
                </label>
                <input
                  type="text"
                  value={settings.manifestoTitle}
                  onChange={(e) => updateSettings({ manifestoTitle: e.target.value })}
                  className="w-full bg-[#131312] border border-[#77746E]/30 text-sm text-[#F1EDE4] px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                  Texto do Manifesto
                </label>
                <textarea
                  rows={4}
                  value={settings.manifestoText}
                  onChange={(e) => updateSettings({ manifestoText: e.target.value })}
                  className="w-full bg-[#131312] border border-[#77746E]/30 text-sm text-[#F1EDE4] p-3"
                />
              </div>

              <div className="pt-2 border-t border-[#77746E]/20">
                <span className="text-xs uppercase font-bold text-[#B9D531] block mb-3">
                  Canais Oficiais de Contato
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase text-[#77746E] mb-1">E-mail</label>
                    <input
                      type="email"
                      value={settings.officialContact.email || ''}
                      onChange={(e) =>
                        updateSettings({
                          officialContact: { ...settings.officialContact, email: e.target.value },
                        })
                      }
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs text-[#F1EDE4] px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-[#77746E] mb-1">WhatsApp</label>
                    <input
                      type="text"
                      value={settings.officialContact.whatsapp || ''}
                      onChange={(e) =>
                        updateSettings({
                          officialContact: { ...settings.officialContact, whatsapp: e.target.value },
                        })
                      }
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs text-[#F1EDE4] px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-[#77746E] mb-1">Instagram</label>
                    <input
                      type="text"
                      value={settings.officialContact.instagram || ''}
                      onChange={(e) =>
                        updateSettings({
                          officialContact: { ...settings.officialContact, instagram: e.target.value },
                        })
                      }
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs text-[#F1EDE4] px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-[#77746E] mb-1">Endereço Sede</label>
                    <input
                      type="text"
                      value={settings.officialContact.address || ''}
                      onChange={(e) =>
                        updateSettings({
                          officialContact: { ...settings.officialContact, address: e.target.value },
                        })
                      }
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs text-[#F1EDE4] px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => showToast('Configurações salvas com sucesso!')}
                  className="px-6 py-2.5 bg-[#E95D2A] text-[#F1EDE4] text-xs font-bold uppercase tracking-wider"
                >
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: DATABASE / BACKUP / PURGE */}
        {activeTab === 'database' && (
          <div className="space-y-8 max-w-3xl">
            <div>
              <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                Gerenciamento do Banco de Dados
              </h2>
              <p className="text-xs text-[#77746E]">
                Ferramentas para backup JSON, restauração, e início com banco 100% virgem em branco.
              </p>
            </div>

            {/* Clean Purge Option */}
            <div className="border border-[#E95D2A]/40 bg-[#1a1614] p-6 space-y-3">
              <h3 className="text-lg font-display font-bold uppercase text-[#E95D2A]">
                Começar com Banco 100% Vazio (Zero Dados)
              </h3>
              <p className="text-xs text-[#77746E] leading-relaxed">
                Remove todas as competições, equipes, resultados e patrocinadores pré-carregados para que você insira exclusivamente os dados reais da sua organização.
              </p>
              <button
                onClick={() => {
                  if (
                    confirm(
                      'ATENÇÃO: Deseja apagar todos os dados e deixar a plataforma completamente em branco?'
                    )
                  ) {
                    resetToCleanDatabase();
                    showToast('Banco de dados limpo com sucesso.');
                  }
                }}
                className="px-5 py-2.5 bg-[#252422] hover:bg-[#E95D2A] text-xs uppercase font-bold text-[#F1EDE4] transition-colors"
              >
                Limpar Tudo (Banco Virgem)
              </button>
            </div>

            {/* Reload Samples */}
            <div className="border border-[#B9D531]/40 bg-[#151a14] p-6 space-y-3">
              <h3 className="text-lg font-display font-bold uppercase text-[#B9D531]">
                Recarregar Dataset Oficial de Demonstração
              </h3>
              <p className="text-xs text-[#77746E] leading-relaxed">
                Restaura o conjunto de competições de Basquete 3x3, Breaking e Skate Street homologadas para demonstração das capacidades editoriais.
              </p>
              <button
                onClick={() => {
                  if (confirm('Deseja recarregar o conjunto de dados oficial de amostra?')) {
                    loadSampleDataset();
                    showToast('Dataset oficial de demonstração recarregado.');
                  }
                }}
                className="px-5 py-2.5 bg-[#252422] hover:bg-[#B9D531] hover:text-[#151515] text-xs uppercase font-bold text-[#F1EDE4] transition-colors"
              >
                Recarregar Dados de Amostra
              </button>
            </div>

            {/* Export / Import JSON */}
            <div className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-4">
              <h3 className="text-lg font-display font-bold uppercase text-[#F1EDE4]">
                Exportar / Importar Backup Completo (JSON)
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const json = exportDatabaseJson();
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `compete_backup_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    showToast('Arquivo de backup exportado.');
                  }}
                  className="px-5 py-2.5 bg-[#252422] hover:bg-[#F1EDE4] hover:text-[#151515] text-xs font-bold uppercase tracking-wider text-[#F1EDE4] flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Backup JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: COMPETITION EDITOR */}
      {isCompModalOpen && (
        <CompetitionModal
          competition={editingComp}
          onClose={() => setIsCompModalOpen(false)}
          onSave={(data) => {
            if (editingComp) {
              updateCompetition(editingComp.id, data);
              showToast('Competição atualizada com sucesso.');
            } else {
              addCompetition(data as any);
              showToast('Nova competição cadastrada com sucesso.');
            }
            setIsCompModalOpen(false);
          }}
        />
      )}

      {/* MODAL: TEAM EDITOR */}
      {isTeamModalOpen && (
        <TeamModal
          team={editingTeam}
          competitions={competitions}
          onClose={() => setIsTeamModalOpen(false)}
          onSave={(data) => {
            if (editingTeam) {
              updateTeam(editingTeam.id, data);
              showToast('Equipe atualizada.');
            } else {
              addTeam(data as any);
              showToast('Equipe cadastrada.');
            }
            setIsTeamModalOpen(false);
          }}
        />
      )}

      {/* MODAL: RESULT EDITOR */}
      {isResultModalOpen && (
        <ResultModal
          result={editingResult}
          competitions={competitions}
          teams={teams}
          onClose={() => setIsResultModalOpen(false)}
          onSave={(data) => {
            if (editingResult) {
              updateResult(editingResult.id, data);
              showToast('Súmula atualizada.');
            } else {
              addResult(data as any);
              showToast('Súmula homologada cadastrada.');
            }
            setIsResultModalOpen(false);
          }}
        />
      )}

      {/* MODAL: OPPORTUNITY EDITOR */}
      {isOppModalOpen && (
        <OpportunityModal
          opportunity={editingOpp}
          competitions={competitions}
          teams={teams}
          onClose={() => setIsOppModalOpen(false)}
          onSave={(data) => {
            if (editingOpp) {
              updateOpportunity(editingOpp.id, data);
              showToast('Cota atualizada.');
            } else {
              addOpportunity(data as any);
              showToast('Cota cadastrada.');
            }
            setIsOppModalOpen(false);
          }}
        />
      )}

      {/* MODAL: SPONSOR EDITOR */}
      {isSponsorModalOpen && (
        <SponsorModal
          sponsor={editingSponsor}
          onClose={() => setIsSponsorModalOpen(false)}
          onSave={(data) => {
            if (editingSponsor) {
              updateSponsor(editingSponsor.id, data);
              showToast('Patrocinador atualizado.');
            } else {
              addSponsor(data as any);
              showToast('Patrocinador cadastrado.');
            }
            setIsSponsorModalOpen(false);
          }}
        />
      )}

      {/* MODAL: METRIC EDITOR */}
      {isMetricModalOpen && (
        <MetricModal
          metric={editingMetric}
          onClose={() => setIsMetricModalOpen(false)}
          onSave={(data) => {
            if (editingMetric) {
              updateMetric(editingMetric.id, data);
              showToast('Métrica atualizada.');
            } else {
              addMetric(data as any);
              showToast('Métrica cadastrada.');
            }
            setIsMetricModalOpen(false);
          }}
        />
      )}

      {/* MODAL: STORY EDITOR */}
      {isStoryModalOpen && (
        <StoryModal
          story={editingStory}
          onClose={() => setIsStoryModalOpen(false)}
          onSave={(data) => {
            if (editingStory) {
              updateStory(editingStory.id, data);
              showToast('História atualizada.');
            } else {
              addStory(data as any);
              showToast('História cadastrada.');
            }
            setIsStoryModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// --- SUB-MODALS FOR CLEAN CRUD EDITING ---

const CompetitionModal: React.FC<{
  competition: Competition | null;
  onClose: () => void;
  onSave: (data: Partial<Competition>) => void;
}> = ({ competition, onClose, onSave }) => {
  const [name, setName] = useState(competition?.name || '');
  const [category, setCategory] = useState(competition?.category || '');
  const [season, setSeason] = useState(competition?.season || '2025');
  const [status, setStatus] = useState<CompetitionStatus>(competition?.status || 'upcoming');
  const [statusDraft, setStatusDraft] = useState<PublicationStatus>(competition?.statusDraft || 'published');
  const [city, setCity] = useState(competition?.location.city || '');
  const [state, setState] = useState(competition?.location.state || '');
  const [venue, setVenue] = useState(competition?.location.venue || '');
  const [startDate, setStartDate] = useState(competition?.startDate || '');
  const [endDate, setEndDate] = useState(competition?.endDate || '');
  const [description, setDescription] = useState(competition?.description || '');
  const [detailedInfo, setDetailedInfo] = useState(competition?.detailedInfo || '');
  const [bannerUrl, setBannerUrl] = useState(competition?.bannerUrl || '');
  const [organizerName, setOrganizerName] = useState(competition?.organizerName || '');
  const [prizeInfo, setPrizeInfo] = useState(competition?.prizeInfo || '');
  const [regulationTitle, setRegulationTitle] = useState(competition?.regulationDoc?.title || '');
  const [isRegOpen, setIsRegOpen] = useState(competition?.registrationInfo?.isOpen ?? true);
  const [regFee, setRegFee] = useState(competition?.registrationInfo?.fee || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    onSave({
      name,
      slug: competition?.slug || slug,
      category,
      season,
      status,
      statusDraft,
      location: { city, state, venue: venue || undefined },
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      description: description || undefined,
      detailedInfo: detailedInfo || undefined,
      bannerUrl: bannerUrl || undefined,
      organizerName: organizerName || undefined,
      prizeInfo: prizeInfo || undefined,
      regulationDoc: regulationTitle ? { title: regulationTitle, fileSize: '1.5 MB' } : undefined,
      registrationInfo: { isOpen: isRegOpen, fee: regFee || undefined },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#181716] border border-[#77746E]/30 w-full max-w-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
          {competition ? 'Editar Competição' : 'Cadastrar Nova Competição'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Nome Oficial *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Modalidade *</label>
              <input
                type="text"
                required
                value={category}
                placeholder="Ex: Basquete 3x3, Skate Street"
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Temporada</label>
              <input
                type="text"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Status da Competição</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              >
                <option value="open_registration">Inscrições Abertas</option>
                <option value="upcoming">Em Breve</option>
                <option value="ongoing">Em Andamento</option>
                <option value="completed">Finalizada</option>
              </select>
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Estado de Publicação</label>
              <select
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value as any)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              >
                <option value="published">Publicado</option>
                <option value="draft">Rascunho (Oculto)</option>
                <option value="archived">Arquivado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Cidade *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Estado (UF) *</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Local / Arena</label>
              <input
                type="text"
                value={venue}
                placeholder="Ex: Parque da Juventude"
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Data de Início</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Data de Término</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Descrição Curta</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Formato de Disputa & Diretrizes</label>
            <textarea
              rows={3}
              value={detailedInfo}
              onChange={(e) => setDetailedInfo(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">URL da Foto de Capa (Opcional)</label>
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Organização Responsável</label>
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Premiação Homologada</label>
              <input
                type="text"
                value={prizeInfo}
                placeholder="Ex: R$ 15.000 + Troféus"
                onChange={(e) => setPrizeInfo(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Nome do Regulamento Anexado</label>
              <input
                type="text"
                value={regulationTitle}
                placeholder="Ex: Regulamento Geral Oficial 2025.pdf"
                onChange={(e) => setRegulationTitle(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#77746E]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#77746E]/30 text-[#77746E]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E95D2A] text-[#F1EDE4] font-bold uppercase"
            >
              Salvar Competição
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TeamModal: React.FC<{
  team: Team | null;
  competitions: Competition[];
  onClose: () => void;
  onSave: (data: Partial<Team>) => void;
}> = ({ team, competitions, onClose, onSave }) => {
  const [name, setName] = useState(team?.name || '');
  const [category, setCategory] = useState(team?.category || '');
  const [city, setCity] = useState(team?.city || '');
  const [state, setState] = useState(team?.state || '');
  const [bio, setBio] = useState(team?.bio || '');
  const [badgeUrl, setBadgeUrl] = useState(team?.badgeUrl || '');
  const [isSeeking, setIsSeeking] = useState(team?.isSeekingSponsorship ?? false);
  const [sponsorshipProposal, setSponsorshipProposal] = useState(team?.sponsorshipProposal || '');
  const [statusDraft, setStatusDraft] = useState<PublicationStatus>(team?.statusDraft || 'published');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    onSave({
      name,
      slug: team?.slug || slug,
      category,
      city,
      state,
      bio: bio || undefined,
      badgeUrl: badgeUrl || undefined,
      isSeekingSponsorship: isSeeking,
      sponsorshipProposal: sponsorshipProposal || undefined,
      statusDraft,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#181716] border border-[#77746E]/30 w-full max-w-xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
          {team ? 'Editar Equipe' : 'Cadastrar Nova Equipe'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Nome da Equipe *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Modalidade *</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Cidade *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">UF *</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Publicação</label>
              <select
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value as any)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              >
                <option value="published">Publicado</option>
                <option value="draft">Rascunho</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">História / Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="p-3 bg-[#141312] border border-[#77746E]/30 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-[#E95D2A] font-bold">
              <input
                type="checkbox"
                checked={isSeeking}
                onChange={(e) => setIsSeeking(e.target.checked)}
                className="accent-[#E95D2A]"
              />
              <span>Esta equipe está oficialmente aberta a receber patrocinadores</span>
            </label>
            {isSeeking && (
              <div>
                <label className="block uppercase text-[11px] text-[#77746E] mb-1">
                  Proposta / O que a equipe busca
                </label>
                <textarea
                  rows={2}
                  value={sponsorshipProposal}
                  onChange={(e) => setSponsorshipProposal(e.target.value)}
                  placeholder="Ex: Busca patrocínio master para camisas e viagens..."
                  className="w-full bg-[#181716] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#77746E]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#77746E]/30 text-[#77746E]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E95D2A] text-[#F1EDE4] font-bold uppercase"
            >
              Salvar Equipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ResultModal: React.FC<{
  result: OfficialResult | null;
  competitions: Competition[];
  teams: Team[];
  onClose: () => void;
  onSave: (data: Partial<OfficialResult>) => void;
}> = ({ result, competitions, teams, onClose, onSave }) => {
  const [competitionId, setCompetitionId] = useState(result?.competitionId || competitions[0]?.id || '');
  const [stageName, setStageName] = useState(result?.stageName || '');
  const [date, setDate] = useState(result?.date || new Date().toISOString().slice(0, 10));
  const [type, setType] = useState<'match' | 'ranking'>(result?.type || 'match');
  const [statusDraft, setStatusDraft] = useState<PublicationStatus>(result?.statusDraft || 'published');

  // Simple sample match score rows
  const [teamAName, setTeamAName] = useState(result?.matches?.[0]?.teamAName || '');
  const [scoreA, setScoreA] = useState<string | number>(result?.matches?.[0]?.scoreA ?? '');
  const [teamBName, setTeamBName] = useState(result?.matches?.[0]?.teamBName || '');
  const [scoreB, setScoreB] = useState<string | number>(result?.matches?.[0]?.scoreB ?? '');
  const [notes, setNotes] = useState(result?.notes || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      competitionId,
      stageName,
      date,
      type,
      statusDraft,
      notes: notes || undefined,
      matches:
        type === 'match'
          ? [
              {
                teamAId: 'team-a',
                teamAName: teamAName || 'Equipe A',
                teamBId: 'team-b',
                teamBName: teamBName || 'Equipe B',
                scoreA: scoreA || 0,
                scoreB: scoreB || 0,
                status: 'finished',
              },
            ]
          : undefined,
      ranking:
        type === 'ranking'
          ? [
              { rank: 1, teamOrParticipantName: teamAName || 'Líder', points: 6, matchesPlayed: 2, wins: 2 },
              { rank: 2, teamOrParticipantName: teamBName || 'Vice-Líder', points: 3, matchesPlayed: 2, wins: 1 },
            ]
          : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#181716] border border-[#77746E]/30 w-full max-w-lg p-6 space-y-4">
        <h2 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
          {result ? 'Editar Súmula' : 'Lançar Súmula Oficial'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Competição *</label>
            <select
              value={competitionId}
              onChange={(e) => setCompetitionId(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            >
              {competitions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Nome da Etapa / Fase *</label>
            <input
              type="text"
              required
              value={stageName}
              placeholder="Ex: Fase Final - Confronto 1"
              onChange={(e) => setStageName(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Data *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Tipo de Súmula</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              >
                <option value="match">Confronto com Placar</option>
                <option value="ranking">Tabela de Classificação</option>
              </select>
            </div>
          </div>

          {type === 'match' && (
            <div className="p-3 bg-[#131312] border border-[#77746E]/30 space-y-3">
              <span className="font-bold text-[#B9D531] block">Placar Homologado</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#77746E]">Equipe A</label>
                  <input
                    type="text"
                    value={teamAName}
                    placeholder="Nome da Equipe A"
                    onChange={(e) => setTeamAName(e.target.value)}
                    className="w-full bg-[#181716] border border-[#77746E]/30 p-1.5 text-[#F1EDE4]"
                  />
                  <input
                    type="number"
                    value={scoreA}
                    placeholder="Pontos A"
                    onChange={(e) => setScoreA(e.target.value)}
                    className="w-full bg-[#181716] border border-[#77746E]/30 p-1.5 text-[#B9D531] font-bold mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#77746E]">Equipe B</label>
                  <input
                    type="text"
                    value={teamBName}
                    placeholder="Nome da Equipe B"
                    onChange={(e) => setTeamBName(e.target.value)}
                    className="w-full bg-[#181716] border border-[#77746E]/30 p-1.5 text-[#F1EDE4]"
                  />
                  <input
                    type="number"
                    value={scoreB}
                    placeholder="Pontos B"
                    onChange={(e) => setScoreB(e.target.value)}
                    className="w-full bg-[#181716] border border-[#77746E]/30 p-1.5 text-[#B9D531] font-bold mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Notas de Arbitragem</label>
            <input
              type="text"
              value={notes}
              placeholder="Ex: Súmula assinada pelos capitães."
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#77746E]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#77746E]/30 text-[#77746E]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E95D2A] text-[#F1EDE4] font-bold uppercase"
            >
              Salvar Súmula
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const OpportunityModal: React.FC<{
  opportunity: SponsorshipOpportunity | null;
  competitions: Competition[];
  teams: Team[];
  onClose: () => void;
  onSave: (data: Partial<SponsorshipOpportunity>) => void;
}> = ({ opportunity, competitions, teams, onClose, onSave }) => {
  const [title, setTitle] = useState(opportunity?.title || '');
  const [type, setType] = useState<any>(opportunity?.type || 'competition');
  const [targetEntityName, setTargetEntityName] = useState(opportunity?.targetEntityName || '');
  const [description, setDescription] = useState(opportunity?.description || '');
  const [estimatedInvestmentRange, setEstimatedInvestmentRange] = useState(opportunity?.estimatedInvestmentRange || '');
  const [benefitsInput, setBenefitsInput] = useState(opportunity?.benefitsList?.join('\n') || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      type,
      targetEntityName: targetEntityName || undefined,
      description,
      estimatedInvestmentRange: estimatedInvestmentRange || undefined,
      benefitsList: benefitsInput.split('\n').filter(Boolean),
      active: true,
      statusDraft: 'published',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#181716] border border-[#77746E]/30 w-full max-w-lg p-6 space-y-4">
        <h2 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
          {opportunity ? 'Editar Cota' : 'Cadastrar Cota de Patrocínio'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Título da Cota *</label>
            <input
              type="text"
              required
              value={title}
              placeholder="Ex: Naming Rights da Quadra Principal"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Tipo de Propriedade</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              >
                <option value="competition">Competição</option>
                <option value="team">Equipe</option>
                <option value="naming_rights">Naming Rights</option>
                <option value="uniform">Uniforme Master</option>
                <option value="activation">Ativação</option>
              </select>
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Faixa de Investimento</label>
              <input
                type="text"
                value={estimatedInvestmentRange}
                placeholder="Ex: Cotas a partir de R$ 5.000"
                onChange={(e) => setEstimatedInvestmentRange(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Descrição</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Entregas (Uma por linha)</label>
            <textarea
              rows={3}
              value={benefitsInput}
              placeholder="Inserção de logo&#10;Banner na quadra&#10;Estande de produtos"
              onChange={(e) => setBenefitsInput(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#77746E]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#77746E]/30 text-[#77746E]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E95D2A] text-[#F1EDE4] font-bold uppercase"
            >
              Salvar Cota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SponsorModal: React.FC<{
  sponsor: Sponsor | null;
  onClose: () => void;
  onSave: (data: Partial<Sponsor>) => void;
}> = ({ sponsor, onClose, onSave }) => {
  const [name, setName] = useState(sponsor?.name || '');
  const [tierName, setTierName] = useState(sponsor?.tierName || '');
  const [category, setCategory] = useState<any>(sponsor?.category || 'official');
  const [logoUrl, setLogoUrl] = useState(sponsor?.logoUrl || '');
  const [websiteUrl, setWebsiteUrl] = useState(sponsor?.websiteUrl || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      tierName: tierName || undefined,
      category,
      logoUrl: logoUrl || undefined,
      websiteUrl: websiteUrl || undefined,
      active: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#181716] border border-[#77746E]/30 w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
          {sponsor ? 'Editar Patrocinador' : 'Cadastrar Patrocinador'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Nome da Marca *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Categoria / Cota</label>
            <input
              type="text"
              value={tierName}
              placeholder="Ex: Patrocinador Master Oficial"
              onChange={(e) => setTierName(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">URL do Logo (Opcional)</label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#77746E]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#77746E]/30 text-[#77746E]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E95D2A] text-[#F1EDE4] font-bold uppercase"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MetricModal: React.FC<{
  metric: ImpactMetric | null;
  onClose: () => void;
  onSave: (data: Partial<ImpactMetric>) => void;
}> = ({ metric, onClose, onSave }) => {
  const [label, setLabel] = useState(metric?.label || '');
  const [value, setValue] = useState<string | number>(metric?.value ?? '');
  const [unit, setUnit] = useState(metric?.unit || '');
  const [description, setDescription] = useState(metric?.description || '');
  const [verifiedSource, setVerifiedSource] = useState(metric?.verifiedSource || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      label,
      value,
      unit: unit || undefined,
      description: description || undefined,
      verifiedSource: verifiedSource || undefined,
      visible: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#181716] border border-[#77746E]/30 w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
          {metric ? 'Editar Métrica' : 'Cadastrar Indicador de Impacto'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Título do Indicador *</label>
            <input
              type="text"
              required
              value={label}
              placeholder="Ex: Equipes Oficiais Registradas"
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Valor Numérico Real *</label>
              <input
                type="text"
                required
                value={value}
                placeholder="Ex: 72"
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Sufixo / Unidade</label>
              <input
                type="text"
                value={unit}
                placeholder="Ex: + ou equipes"
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Fonte Auditada</label>
            <input
              type="text"
              value={verifiedSource}
              placeholder="Ex: Súmulas Oficiais 2024/2025"
              onChange={(e) => setVerifiedSource(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#77746E]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#77746E]/30 text-[#77746E]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E95D2A] text-[#F1EDE4] font-bold uppercase"
            >
              Salvar Métrica
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StoryModal: React.FC<{
  story: Story | null;
  onClose: () => void;
  onSave: (data: Partial<Story>) => void;
}> = ({ story, onClose, onSave }) => {
  const [title, setTitle] = useState(story?.title || '');
  const [subtitle, setSubtitle] = useState(story?.subtitle || '');
  const [author, setAuthor] = useState(story?.author || 'Redação Oficial');
  const [content, setContent] = useState(story?.content || '');
  const [coverUrl, setCoverUrl] = useState(story?.coverUrl || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    onSave({
      title,
      slug: story?.slug || slug,
      subtitle: subtitle || undefined,
      author: author || undefined,
      content,
      coverUrl: coverUrl || undefined,
      date: story?.date || new Date().toISOString().slice(0, 10),
      featured: true,
      statusDraft: 'published',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#181716] border border-[#77746E]/30 w-full max-w-lg p-6 space-y-4">
        <h2 className="text-xl font-display font-bold uppercase text-[#F1EDE4]">
          {story ? 'Editar História' : 'Cadastrar História'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Título da Matéria *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Subtítulo / Linha Fina</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#F1EDE4] mb-1">Texto da História *</label>
            <textarea
              rows={5}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#131312] border border-[#77746E]/30 p-2 text-[#F1EDE4]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#77746E]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#77746E]/30 text-[#77746E]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#E95D2A] text-[#F1EDE4] font-bold uppercase"
            >
              Salvar História
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
