import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  darkBackground?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  darkBackground = false,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div
      className={cn(
        'flex flex-col mb-12 sm:mb-16',
        alignmentClasses[align],
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full mb-3',
            darkBackground
              ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
              : 'bg-blue-50 text-blue-900 border border-blue-200'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          {badge}
        </span>
      )}
      
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight',
          darkBackground ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'mt-3 max-w-2xl text-base sm:text-lg leading-relaxed',
            darkBackground ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative accent divider line */}
      <div
        className={cn(
          'mt-4 h-1 w-16 rounded-full',
          align === 'center' ? 'mx-auto' : '',
          darkBackground ? 'bg-amber-400' : 'bg-blue-800'
        )}
      />
    </div>
  );
};
