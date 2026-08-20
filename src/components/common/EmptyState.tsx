import React from 'react';
import { Info } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Informações ainda não publicadas',
  message = 'O conteúdo oficial está em fase de homologação técnica pela organização e será exibido assim que for validado.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`p-8 sm:p-12 border border-[#77746E]/25 bg-[#1a1918] text-center max-w-2xl mx-auto my-8 ${className}`}
    >
      <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-none border border-[#77746E]/40 text-[#B9D531]">
        <Info className="w-5 h-5" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F1EDE4] mb-2 font-display">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-[#77746E] leading-relaxed max-w-lg mx-auto">
        {message}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#2a2927] hover:bg-[#E95D2A] hover:text-[#F1EDE4] text-[#F1EDE4] text-xs uppercase tracking-widest font-semibold transition-colors duration-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
