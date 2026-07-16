'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import type { SeoSection } from '@/lib/seo';

interface SeoBlockProps {
  sections: SeoSection[];
  readMore: string;
  readLess: string;
  className?: string;
}

export default function SeoBlock({
  sections,
  readMore,
  readLess,
  className,
}: SeoBlockProps) {
  const [expanded, setExpanded] = useState(false);

  if (!sections?.length) return null;

  return (
    <section
      className={cn('section-padding bg-[var(--color-cream)] border-t border-[var(--color-light-gray)]', className)}
      aria-label="SEO"
    >
      <Container>
        <div className="relative max-w-3xl mx-auto">
          <div
            className={cn(
              'relative overflow-hidden transition-[max-height] duration-500 ease-in-out',
              expanded ? 'max-h-[5000px]' : 'max-h-48 md:max-h-56'
            )}
          >
            <div className="space-y-8 text-[var(--color-gray)]">
              {sections.map((section) => {
                const HeadingTag = section.level === 3 ? 'h3' : 'h2';
                let headingClass = 'text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-4';
                if (section.level === 3) {
                  headingClass = 'text-xl font-semibold text-[var(--color-navy)] mb-3';
                }

                return (
                  <div key={`${section.level}-${section.heading}`}>
                    <HeadingTag className={headingClass}>{section.heading}</HeadingTag>
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)} className="text-base md:text-lg leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {!expanded && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-cream)] to-transparent"
              />
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
              className="text-[var(--color-electric-blue)] hover:text-[var(--color-hot-pink)] font-medium transition-colors"
            >
              {expanded ? readLess : readMore}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
