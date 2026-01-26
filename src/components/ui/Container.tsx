import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-[1200px] mx-auto px-6 md:px-8', className)}>
      {children}
    </div>
  );
}
