import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin, Instagram, Linkedin, Send, CheckCircle2, AlertCircle, Bot } from 'lucide-react';

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
    <div className="min-h-screen py-12 sm:py-16 bg-[#FDFCF8] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <section className="border-b border-[#1A1A1A]/10 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A]/5 text-[#B44D2E] text-[10px] uppercase font-bold tracking-[0.3em] border border-[#1A1A1A]/10 font-sans">
            SECRETARIA TÉCNICA & COMISSÃO DE HOMOLOGAÇÃO
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#1A1A1A] tracking-tight">
            CANAIS OFICIAIS.
          </h1>
          <p className="text-sm sm:text-base text-[#1A1A1A]/70 max-w-2xl font-sans">
            Entre em contato com a comissão técnica para credenciamento de equipes de robótica, homologação de arenas blindadas, laudos de segurança ou propostas de parceria.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-display font-bold uppercase text-[#1A1A1A]">
              Informações de Contato
            </h2>

            <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              {settings.officialContact.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B44D2E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 block font-sans">
                      E-mail Técnico & Oficial
                    </span>
                    <a
                      href={`mailto:${settings.officialContact.email}`}
                      className="text-sm font-semibold text-[#1A1A1A] hover:underline break-all font-sans"
                    >
                      {settings.officialContact.email}
                    </a>
                  </div>
                </div>
              )}

              {settings.officialContact.whatsapp && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1A1A1A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 block font-sans">
                      WhatsApp / Paddock & Boxes
                    </span>
                    <span className="text-sm font-semibold text-[#1A1A1A] font-sans">
                      {settings.officialContact.whatsapp}
                    </span>
                  </div>
                </div>
              )}

              {settings.officialContact.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B44D2E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 block font-sans">
                      Sede Técnica & Homologação
                    </span>
                    <span className="text-sm text-[#1A1A1A]/80 font-sans">
                      {settings.officialContact.address}
                    </span>
                  </div>
                </div>
              )}

              {settings.officialContact.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-[#B44D2E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 block font-sans">
                      Instagram Oficial
                    </span>
                    <span className="text-sm text-[#1A1A1A] font-sans">
                      {settings.officialContact.instagram}
                    </span>
                  </div>
                </div>
              )}

              {settings.officialContact.linkedin && (
                <div className="flex items-start gap-3">
                  <Linkedin className="w-5 h-5 text-[#1A1A1A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A]/50 block font-sans">
                      LinkedIn Institucional
                    </span>
                    <span className="text-sm text-[#1A1A1A] font-sans">
                      {settings.officialContact.linkedin}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border border-[#1A1A1A]/10 bg-[#F6F4EE] text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
              Horário de atendimento técnico: Segunda a sexta-feira, das 09h às 18h (Horário de Brasília). Plantão especial em dias de arena.
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#1A1A1A]/10 bg-[#FFFFFF] p-6 sm:p-8 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <h2 className="text-2xl font-display font-bold uppercase text-[#1A1A1A]">
                Envie uma Mensagem
              </h2>

              {success && (
                <div className="p-4 bg-[#B44D2E]/10 border border-[#B44D2E] text-[#B44D2E] text-xs sm:text-sm flex items-start gap-3 font-sans">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-medium">{success}</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 text-xs sm:text-sm flex items-start gap-3 font-sans">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Seu Nome *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nome do capitão ou responsável"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Seu E-mail *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@equipe.org ou seu@email.com"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Telefone / WhatsApp (Opcional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                      Assunto *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex: Homologação de robô de combate"
                      className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] px-3 py-2.5 focus:outline-none focus:border-[#B44D2E] font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs uppercase font-bold text-[#1A1A1A] mb-1 font-sans">
                    Mensagem *
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva as especificações do robô, evento ou dúvida técnica..."
                    className="w-full bg-[#F6F4EE] border border-[#1A1A1A]/10 text-xs sm:text-sm text-[#1A1A1A] p-3 focus:outline-none focus:border-[#B44D2E] font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#B44D2E] text-[#FDFCF8] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
