import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin, Instagram, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, submitContactMessage } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSubmitting(true);
    const res = await submitContactMessage({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    });
    setSubmitting(false);

    if (res.success) {
      setSuccess(res.message);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <section className="border-b border-[#77746E]/20 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#252422] text-[#B9D531] text-xs uppercase font-bold tracking-widest border border-[#B9D531]/30">
            ATENDIMENTO & OUVIDORIA
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase text-[#F1EDE4] leading-tight">
            CANAIS OFICIAIS.
          </h1>
          <p className="text-sm sm:text-base text-[#77746E] max-w-2xl">
            Entre em contato com a organização para credenciamento de equipes, homologação de torneios, dúvidas técnicas ou imprensa.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
              Informações de Contato
            </h2>

            <div className="border border-[#77746E]/30 bg-[#181716] p-6 space-y-4">
              {settings.officialContact.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#E95D2A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#77746E] block">
                      E-mail Oficial
                    </span>
                    <a
                      href={`mailto:${settings.officialContact.email}`}
                      className="text-sm font-semibold text-[#F1EDE4] hover:underline break-all"
                    >
                      {settings.officialContact.email}
                    </a>
                  </div>
                </div>
              )}

              {settings.officialContact.whatsapp && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B9D531] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#77746E] block">
                      WhatsApp / Central
                    </span>
                    <span className="text-sm font-semibold text-[#F1EDE4]">
                      {settings.officialContact.whatsapp}
                    </span>
                  </div>
                </div>
              )}

              {settings.officialContact.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#77746E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#77746E] block">
                      Sede Administrativa
                    </span>
                    <span className="text-sm text-[#F1EDE4]">
                      {settings.officialContact.address}
                    </span>
                  </div>
                </div>
              )}

              {settings.officialContact.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-[#E95D2A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#77746E] block">
                      Instagram Oficial
                    </span>
                    <span className="text-sm text-[#F1EDE4]">
                      {settings.officialContact.instagram}
                    </span>
                  </div>
                </div>
              )}

              {settings.officialContact.linkedin && (
                <div className="flex items-start gap-3">
                  <Linkedin className="w-5 h-5 text-[#B9D531] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#77746E] block">
                      LinkedIn Institucional
                    </span>
                    <span className="text-sm text-[#F1EDE4]">
                      {settings.officialContact.linkedin}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border border-[#77746E]/25 bg-[#141312] text-xs text-[#77746E] leading-relaxed">
              Horário de atendimento técnico: Segunda a sexta-feira, das 09h às 18h (Horário de Brasília).
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#77746E]/30 bg-[#181716] p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-display font-bold uppercase text-[#F1EDE4]">
                Envie uma Mensagem
              </h2>

              {success && (
                <div className="p-4 bg-[#B9D531]/10 border border-[#B9D531] text-[#B9D531] text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-[#E95D2A]/10 border border-[#E95D2A] text-[#E95D2A] text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Seu Nome *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nome completo"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Seu E-mail *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Telefone / WhatsApp (Opcional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                      Assunto *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex: Homologação de nova etapa"
                      className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] px-3 py-2.5 focus:outline-none focus:border-[#E95D2A]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs uppercase font-bold text-[#F1EDE4] mb-1">
                    Mensagem *
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escreva sua dúvida ou solicitação..."
                    className="w-full bg-[#131312] border border-[#77746E]/30 text-xs sm:text-sm text-[#F1EDE4] p-3 focus:outline-none focus:border-[#E95D2A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#252422] hover:bg-[#E95D2A] text-[#F1EDE4] font-display font-bold text-base uppercase tracking-wider transition-colors cut-corner flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
