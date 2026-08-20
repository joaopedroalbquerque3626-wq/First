import React from 'react';
import { CompetitionStatus, PublicationStatus } from '../../types';

interface StatusBadgeProps {
  status: CompetitionStatus;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'open_registration':
        return {
          label: 'INSCRIÇÕES ABERTAS',
          bg: 'bg-[#B44D2E] text-[#FDFCF8] font-bold',
          dot: 'bg-[#FDFCF8]',
        };
      case 'ongoing':
        return {
          label: 'EM ANDAMENTO',
          bg: 'bg-[#1A1A1A] text-[#FDFCF8] font-bold',
          dot: 'bg-[#B44D2E] animate-pulse',
        };
      case 'upcoming':
        return {
          label: 'EM BREVE',
          bg: 'bg-[#F6F4EE] text-[#1A1A1A] border border-[#1A1A1A]/20',
          dot: 'bg-[#B44D2E]',
        };
      case 'completed':
        return {
          label: 'FINALIZADA',
          bg: 'bg-[#EAE7DF] text-[#1A1A1A]/60 border border-[#1A1A1A]/10',
          dot: 'bg-[#1A1A1A]/40',
        };
      default:
        return {
          label: status,
          bg: 'bg-[#F6F4EE] text-[#1A1A1A]',
          dot: 'bg-[#1A1A1A]/40',
        };
    }
  };

  const config = getStatusConfig();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 uppercase font-sans tracking-[0.15em] font-semibold border border-[#1A1A1A]/10 ${config.bg} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      <span className="whitespace-nowrap">{config.label}</span>
    </span>
  );
};

export const PublicationBadge: React.FC<{ status: PublicationStatus }> = ({ status }) => {
  switch (status) {
    case 'published':
      return (
        <span className="px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider bg-[#B44D2E]/10 text-[#B44D2E] border border-[#B44D2E]/30">
          Publicado
        </span>
      );
    case 'draft':
      return (
        <span className="px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider bg-[#1A1A1A]/5 text-[#1A1A1A]/60 border border-[#1A1A1A]/20">
          Rascunho
        </span>
      );
    case 'archived':
      return (
        <span className="px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider bg-[#1A1A1A]/10 text-[#1A1A1A]/80 border border-[#1A1A1A]/30">
          Arquivado
        </span>
      );
  }
};
