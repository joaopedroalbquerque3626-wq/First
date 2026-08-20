import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import {
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Send,
  Briefcase,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const SponsorshipView: React.FC = () => {
  const {
    getActiveOpportunities,
    getPublishedCompetitions,
    getPublishedTeamList,
    submitSponsorshipLead,
  } = useData();
  const { navigate } = useNavigation();

  const opportunities = getActiveOpportunities();
  const competitions = getPublishedCompetitions();
  const teams = getPublishedTeamList();

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [interestType, setInterestType] = useState<'competition' | 'team' | 'institutional' | 'custom'>('competition');
  const [targetCompetitionId, setTargetCompetitionId] = useState('');
  const [targetTeamId, setTargetTeamId] = useState('');
  const [investmentRange, setInvestmentRange] = useState('');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap

  // Feedback states
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Bot detection
    if (honeypot) return;

    if (!companyName.trim() || !contactPerson.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios marcados com *.');
      return;
    }

    if (!privacyConsent) {
      setErrorMessage('É necessário concordar com os termos de privacidade para envio comercial.');
      return;
    }

    setSubmitting(true);

    const selectedComp = competitions.find((c) => c.id === targetCompetitionId);
    const selectedTeam = teams.find((t) => t.id === targetTeamId);

    const res = await submitSponsorshipLead({
      companyName,
      contactPerson,
      email,
      phone,
      website: website || undefined,
      interestType,
      targetCompetitionId: targetCompetitionId || undefined,
      targetCompetitionName: selectedComp?.name || undefined,
      targetTeamId: targetTeamId || undefined,
      targetTeamName: selectedTeam?.name || undefined,
      investmentRange: investmentRange || undefined,
      message,
    });

    setSubmitting(false);

    if (res.success) {
      setSuccessMessage(res.message);
      // Reset form
      setCompanyName('');
      setContactPerson('');
      setEmail('');
      setPhone('');
      setWebsite('');
      setMessage('');
      setInvestmentRange('');
      setTargetCompetitionId('');
      setTargetTeamId('');
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Commercial Hero */}
        <section className="border-b border-[#77746E]/20 pb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252422] text-[#E95D2A] text-xs uppercase font-bold tracking-widest border border-[#E95D2A]/30">
            CANAL COMERCIAL & PATROCÍNIO
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase text-[#F1EDE4] leading-[0.9] text-balance">
            NÃO COLOQUE APENAS SUA LOGO. <br />
            <span className="text-[#E95D2A]">COLOQUE SUA MARCA DENTRO DA HISTÓRIA.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#F1EDE4]/80 max-w-3xl leading-relaxed">
            Tem gente competindo. Tem gente torcendo. Falta a sua marca. Conectamos empresas a campeonatos oficiais e equipes de alta performance com contrapartidas auditáveis, contratos seguros e relacionamento direto com organizadores.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-[#E95D2A] pl-4 space-y-1">
              <span className="text-xs font-bold text-[#E95D2A] uppercase">01. Associação Direta</span>
              <h3 className="font-display font-bold text-lg text-[#F1EDE4] uppercase">
                Naming Rights & Arena
              </h3>
              <p className="text-xs text-[#77746E]">
                Visibilidade central em quadras, pistas, palcos e material de comunicação oficial.
              </p>
            </div>

            <div className="border-l-2 border-[#B9D531] pl-4 space-y-1">
              <span className="text-xs font-bold text-[#B9D531] uppercase">02. Apoio a Equipes</span>
              <h3 className="font-display font-bold text-lg text-[#F1EDE4] uppercase">
                Espaço Master em Uniformes
              </h3>
              <p className="text-xs text-[#77746E]">
                Patrocínio de camisas de jogo, transporte e bolsas de incentivo a atletas.
              </p>
            </div>

            <div className="border-l-2 border-[#F1EDE4] pl-4 space-y-1">
              <span className="text-xs font-bold text-[#F1EDE4] uppercase">03. Ativações Reais</span>
              <h3 className="font-display font-bold text-lg text-[#F1EDE4] uppercase">
                Presença e Experiência
              </h3>
              <p className="text-xs text-[#77746E]">
                Estandes, degustação, distribuição de brindes e interações diretas com o público presente.
              </p>
            </div>
          </div>
        </section>

        {/* Commercial Form + Opportunities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Real Opportunities (If available) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#B9D531]">
                COTAS HOMOLOGADAS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#F1EDE4] mt-1">
                Oportunidades em Aberto
              </h2>
            </div>

            {opportunities.length > 0 ? (
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#E95D2A] uppercase font-bold tracking-wider">
                        {opp.type.replace('_', ' ')}
                      </span>
                      {opp.estimatedInvestmentRange && (
                        <span className="text-[#B9D531] font-semibold">
                          {opp.estimatedInvestmentRange}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-display font-bold uppercase text-[#F1EDE4] leading-tight">
                      {opp.title}
                    </h3>

                    {opp.targetEntityName && (
                      <div className="text-xs text-[#77746E]">
                        Entidade: <span className="text-[#F1EDE4]">{opp.targetEntityName}</span>
                      </div>
                    )}

                    <p className="text-xs text-[#77746E] leading-relaxed">
                      {opp.description}
                    </p>

                    {opp.benefitsList.length > 0 && (
                      <ul className="text-xs text-[#77746E] space-y-1 pt-1">
                        {opp.benefitsList.slice(0, 3).map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#B9D531]">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-[#77746E]/20 bg-[#161514] p-6 text-xs text-[#77746E] leading-relaxed">
                As cotas comerciais específicas estão em atualização. Você pode enviar uma proposta personalizada utilizando o formulário ao lado.
              </div>
            )}

            {/* Credibility Guarantee */}
            <div className="p-5 border border-[#77746E]/30 bg-[#141312] space-y-2">
              <div className="flex items-center gap-2 text-[#B9D531]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  Garantia de Transparência
                </span>
              </div>
              <p className="text-xs text-[#77746E] leading-relaxed">
                Todos os contatos comerciais são recebidos diretamente pela diretoria executiva das competições e pelos representantes oficiais das equipes homologadas.
              </p>
            </div>
          </div>

          {/* Right Column: Commercial Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#E95D2A]">
                  FORMULÁRIO DE INTERESSE
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#F1EDE4] mt-1">
                  Solicitar Proposta de Patrocínio
                </h2>
                <p className="text-xs sm:text-sm text-[#77746E] mt-1">
                  Preencha os dados da sua empresa para receber o book comercial e valores oficiais.
                </p>
              </div>

              {/* Feedback messages */}
              {successMessage && (
                <div className="p-4 bg-[#B9D531]/10 border border-[#B9D531] text-[#B9D531] text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 bg-[#E95D2A]/10 border border-[#E95D2A] text-[#E95D2A] text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot for bots */}
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                {/* Interest Type Radio Pills */}
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#F1EDE4] mb-2">
                    Tipo de Interesse Comercial *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setInterestType('competition')}
                      className={`py-2.5 px-3 text-xs uppercase font-bold tracking-wider border transition-colors ${
                        interestType === 'competition'
                          ? 'bg-[#E95D2A] border-[#E95D2A] text-[#F1EDE4]'
                          : 'bg-[#131312] border-[#77746E]/30 text-[#77746E] hover:text-[#F1EDE4]'
                      }`}
                    >
                      Patrocinar Competição
                    </button>

                    <button
                      type="button"
                      onClick={() => setInterestType('team')}
                      className={`py-2.5 px-3 text-xs uppercase font-bold tracking-wider border transition-colors ${
                        interestType === 'team'
                          ? 'bg-[#E95D2A] border-[#E95D2A] text-[#F1EDE4]'
                          : 'bg-[#131312] border-[#77746E]/30 text-[#77746E] hover:text-[#F1EDE4]'
                      }`}
                    >
                      Patrocinar Equipe
                    </button>

                    <button
                      type="button"
                      onClick={() => setInterestType('institutional')}
                      className={`py-2.5 px-3 text-xs uppercase font-bold tracking-wider border transition-colors ${
                        interestType === 'institutional'
                          ? 'bg-[#E95D2A] border-[#E95D2A] text-[#F1EDE4]'
                          : 'bg-[#131312] border-[#77746E]/30 text-[#77746E] hover:text-[#F1EDE4]'
                      }`}
                    >
                      Parceria Institucional
                    </button>
                  </div>
                </div>

                {/* Optional Competition / Team selection */}
                {interestType === 'competition' && (
                  <div>
                    <label htmlFor="target-comp" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Competição Específica (Opcional)
                    </label>
                    <select
                      id="target-comp"
                      value={targetCompetitionId}
                      onChange={(e) => setTargetCompetitionId(e.target.value)}
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    >
                      <option value="">Selecione ou deixe aberto para todo o circuito</option>
                      {competitions.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.category})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {interestType === 'team' && (
                  <div>
                    <label htmlFor="target-team" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Equipe Específica (Opcional)
                    </label>
                    <select
                      id="target-team"
                      value={targetTeamId}
                      onChange={(e) => setTargetTeamId(e.target.value)}
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    >
                      <option value="">Selecione a equipe de interesse</option>
                      {teams.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.category} - {t.city}/{t.state})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Company & Contact fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company-name" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Nome da Empresa / Marca *
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ex: Empresa Ltda"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-person" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Nome do Responsável *
                    </label>
                    <input
                      id="contact-person"
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Ex: Juliana Santos"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-email" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      E-mail Corporativo *
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contato@suaempresa.com.br"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-website" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Site da Empresa (Opcional)
                    </label>
                    <input
                      id="lead-website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://suaempresa.com.br"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="investment-range" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Faixa de Investimento Pretendida
                    </label>
                    <select
                      id="investment-range"
                      value={investmentRange}
                      onChange={(e) => setInvestmentRange(e.target.value)}
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    >
                      <option value="">Selecione uma faixa estimada</option>
                      <option value="Até R$ 5.000">Apoio Inicial (Até R$ 5.000)</option>
                      <option value="R$ 5.000 a R$ 15.000">Cota Regional (R$ 5.000 a R$ 15.000)</option>
                      <option value="R$ 15.000 a R$ 50.000">Patrocínio Oficial (R$ 15.000 a R$ 50.000)</option>
                      <option value="Acima de R$ 50.000">Naming Rights / Master (Acima de R$ 50.000)</option>
                      <option value="A definir em reunião">A definir em reunião com a diretoria</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="lead-message" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                    Mensagem / Objetivos da Marca *
                  </label>
                  <textarea
                    id="lead-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva o que sua marca busca (visibilidade de quadra, ativação de produto, patrocínio de camisa, etc.)..."
                    className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] p-3 focus:outline-none focus:border-[#E95D2A]"
                  />
                </div>

                {/* Privacy Consent */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 text-xs text-[#77746E] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#E95D2A]"
                    />
                    <span>
                      Concordo com o tratamento dos dados informados exclusivamente para envio da proposta comercial e contato da organização oficial (em conformidade com a LGPD).
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    id="submit-sponsorship-lead-btn"
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#E95D2A] hover:bg-[#d64e1c] text-[#F1EDE4] font-display font-bold text-lg uppercase tracking-wider transition-all cut-corner flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <span>{submitting ? 'PROCESSANDO...' : 'QUERO CONVERSAR SOBRE PATROCÍNIO'}</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
