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
  Cpu,
  Bot
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
    <div className="min-h-screen py-12 sm:py-16 bg-[#FDFCF8] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Commercial Hero */}
        <section className="border-b border-[#1A1A1A]/10 pb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/5 text-[#B44D2E] text-[10px] uppercase font-bold tracking-[0.3em] border border-[#1A1A1A]/10 font-sans">
            CANAL COMERCIAL & PATROCÍNIO DE ROBÓTICA
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] leading-[0.9] tracking-tight">
            NÃO COLOQUE APENAS SUA LOGO. <br />
            <span className="font-serif italic font-normal text-[#B44D2E]">COLOQUE SUA MARCA NO CORAÇÃO DA ENGENHARIA.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#1A1A1A]/80 max-w-3xl leading-relaxed font-sans">
            Robôs colidindo a 250 km/h, algoritmos de inteligência artificial disputando milissegundos e milhares de estudantes de engenharia e tecnologia no auge de seu potencial. Conecte sua marca a competições oficiais e equipes de robótica homologadas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-[#B44D2E] pl-4 space-y-1">
              <span className="text-[10px] font-bold text-[#B44D2E] uppercase tracking-widest font-sans">01. Arenas Blindadas</span>
              <h3 className="font-display font-bold text-lg text-[#1A1A1A] uppercase">
                Naming Rights & Arena
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 font-sans">
                Exposição master nos vidros blindados de policarbonato, backdrop de pesagem e transmissões ao vivo.
              </p>
            </div>

            <div className="border-l-2 border-[#1A1A1A] pl-4 space-y-1">
              <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest font-sans">02. Patrocínio de Bancada</span>
              <h3 className="font-display font-bold text-lg text-[#1A1A1A] uppercase">
                Chassi de Robôs & Boxes
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 font-sans">
                Adesivagem na blindagem de robôs de combate, uniformes de pilotos e fornecimento de insumos técnicos.
              </p>
            </div>

            <div className="border-l-2 border-[#B44D2E] pl-4 space-y-1">
              <span className="text-[10px] font-bold text-[#B44D2E] uppercase tracking-widest font-sans">03. Recrutamento Tech</span>
              <h3 className="font-display font-bold text-lg text-[#1A1A1A] uppercase">
                Talentos STEM & Engenharia
              </h3>
              <p className="text-xs text-[#1A1A1A]/70 font-sans">
                Acesso direto a programadores C++, engenheiros mecânicos, eletricistas e projetistas de ponta.
              </p>
            </div>
          </div>
        </section>

        {/* Commercial Form + Opportunities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Real Opportunities (If available) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#B44D2E] font-sans">
                COTAS HOMOLOGADAS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#1A1A1A] mt-1">
                Oportunidades em Aberto
              </h2>
            </div>

            {opportunities.length > 0 ? (
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="text-[#B44D2E] uppercase font-bold tracking-wider text-[10px]">
                        {opp.type.replace('_', ' ')}
                      </span>
                      {opp.estimatedInvestmentRange && (
                        <span className="text-[#1A1A1A] font-serif font-bold italic">
                          {opp.estimatedInvestmentRange}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-serif font-bold uppercase text-[#1A1A1A] leading-tight">
                      {opp.title}
                    </h3>

                    {opp.targetEntityName && (
                      <div className="text-xs text-[#1A1A1A]/70 font-sans">
                        Entidade: <span className="text-[#1A1A1A] font-medium">{opp.targetEntityName}</span>
                      </div>
                    )}

                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                      {opp.description}
                    </p>

                    {opp.benefitsList.length > 0 && (
                      <ul className="text-xs text-[#1A1A1A]/80 space-y-1 pt-1 font-sans">
                        {opp.benefitsList.slice(0, 3).map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#B44D2E] font-bold">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                As cotas comerciais específicas estão em atualização pela diretoria de eventos. Você pode enviar uma proposta personalizada utilizando o formulário ao lado.
              </div>
            )}

            {/* Credibility Guarantee */}
            <div className="p-5 border border-[#1A1A1A]/10 bg-[#F6F4EE] space-y-2">
              <div className="flex items-center gap-2 text-[#B44D2E]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest font-sans">
                  Garantia de Transparência
                </span>
              </div>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                Todos os contatos comerciais são recebidos diretamente pela diretoria executiva das competições de robótica e pelos capitães oficiais das equipes homologadas.
              </p>
            </div>
          </div>

          {/* Right Column: Commercial Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-10 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#B44D2E] font-sans">
                  FORMULÁRIO DE INTERESSE
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#1A1A1A] mt-1">
                  Solicitar Proposta de Patrocínio
                </h2>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-1 font-sans">
                  Preencha os dados da sua empresa para receber o book comercial com métricas de impacto e valores oficiais.
                </p>
              </div>

              {/* Feedback messages */}
              {successMessage && (
                <div className="p-4 bg-[#B44D2E]/10 border border-[#B44D2E] text-[#B44D2E] text-xs sm:text-sm flex items-start gap-3 font-sans">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 text-xs sm:text-sm flex items-start gap-3 font-sans">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{errorMessage}</span>
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
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#1A1A1A] mb-2 font-sans">
                    Tipo de Interesse Comercial *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setInterestType('competition')}
                      className={`py-2.5 px-3 text-xs uppercase font-bold tracking-wider border transition-colors font-sans ${
                        interestType === 'competition'
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFCF8]'
                          : 'bg-[#F6F4EE] border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                      }`}
                    >
                      Torneio / Arena
                    </button>

                    <button
                      type="button"
                      onClick={() => setInterestType('team')}
                      className={`py-2.5 px-3 text-xs uppercase font-bold tracking-wider border transition-colors font-sans ${
                        interestType === 'team'
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFCF8]'
                          : 'bg-[#F6F4EE] border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                      }`}
                    >
                      Equipe / Robô
                    </button>

                    <button
                      type="button"
                      onClick={() => setInterestType('institutional')}
                      className={`py-2.5 px-3 text-xs uppercase font-bold tracking-wider border transition-colors font-sans ${
                        interestType === 'institutional'
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FDFCF8]'
                          : 'bg-[#F6F4EE] border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                      }`}
                    >
                      Circuito Geral
                    </button>
                  </div>
                </div>

                {/* Optional Competition / Team selection */}
                {interestType === 'competition' && (
                  <div>
                    <label htmlFor="target-comp" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Competição de Robótica (Opcional)
                    </label>
                    <select
                      id="target-comp"
                      value={targetCompetitionId}
                      onChange={(e) => setTargetCompetitionId(e.target.value)}
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
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
                    <label htmlFor="target-team" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Equipe de Robótica (Opcional)
                    </label>
                    <select
                      id="target-team"
                      value={targetTeamId}
                      onChange={(e) => setTargetTeamId(e.target.value)}
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
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
                    <label htmlFor="company-name" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Nome da Empresa / Marca *
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ex: Tech Corp Solutions"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-person" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Nome do Responsável *
                    </label>
                    <input
                      id="contact-person"
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Ex: Juliana Santos"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-email" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      E-mail Corporativo *
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contato@suaempresa.com.br"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-website" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Site da Empresa (Opcional)
                    </label>
                    <input
                      id="lead-website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://suaempresa.com.br"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="investment-range" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Faixa de Investimento Pretendida
                    </label>
                    <select
                      id="investment-range"
                      value={investmentRange}
                      onChange={(e) => setInvestmentRange(e.target.value)}
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    >
                      <option value="">Selecione uma faixa estimada</option>
                      <option value="Até R$ 5.000">Apoio em Peças/Bancada (Até R$ 5.000)</option>
                      <option value="R$ 5.000 a R$ 15.000">Cota Regional de Box (R$ 5.000 a R$ 15.000)</option>
                      <option value="R$ 15.000 a R$ 50.000">Patrocínio Master de Arena (R$ 15.000 a R$ 50.000)</option>
                      <option value="Acima de R$ 50.000">Naming Rights do Torneio (Acima de R$ 50.000)</option>
                      <option value="A definir em reunião">A definir em reunião com a diretoria</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="lead-message" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                    Mensagem / Objetivos da Marca *
                  </label>
                  <textarea
                    id="lead-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva o que sua marca busca (blindagem de arena, recrutamento de engenheiros, patrocínio de robô, estande no paddock)..."
                    className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] p-3 focus:outline-none focus:border-[#B44D2E] font-sans"
                  />
                </div>

                {/* Privacy Consent */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 text-xs text-[#1A1A1A]/70 cursor-pointer font-sans">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#B44D2E]"
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
                    className="w-full py-4 bg-[#B44D2E] hover:bg-[#8F3A20] text-[#FDFCF8] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <span>{submitting ? 'PROCESSANDO...' : 'QUERO CONVERSAR SOBRE PATROCÍNIO'}</span>
                    <ArrowUpRight className="w-4 h-4" />
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
