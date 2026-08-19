import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'normal' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'normal',
  ...props
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    normal: 'max-w-7xl',
    wide: 'max-w-8xl',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
