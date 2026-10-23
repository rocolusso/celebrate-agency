import React from 'react';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import type { SeoSection } from '@/lib/seo';

interface SeoBlockProps {
  sections: SeoSection[];
  className?: string;
}

/**
 * Section heading by level. Level 1 is used only by the home page (its single h1).
 * The global (unlayered) `h1` rule applies the display font and beats Tailwind utilities,
 * so the heading font of level 1 is set inline.
 */
const HEADINGS = {
  1: {
    Tag: 'h1',
    className: 'text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-4',
    style: { fontFamily: 'var(--font-heading), Arial, Helvetica, sans-serif' },
  },
  2: { Tag: 'h2', className: 'text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-4', style: undefined },
  3: { Tag: 'h3', className: 'text-xl font-semibold text-[var(--color-navy)] mb-3', style: undefined },
} as const;

export default function SeoBlock({ sections, className }: SeoBlockProps) {
  if (!sections?.length) return null;

  return (
    <section
      className={cn('section-padding bg-[var(--color-cream)] border-t border-[var(--color-light-gray)]', className)}
      aria-label="SEO"
    >
      <Container>
        <div className="max-w-3xl mx-auto space-y-8 text-[var(--color-gray)]">
          {sections.map((section) => {
            const { Tag, className: headingClass, style } = HEADINGS[section.level];

            return (
              <div key={`${section.level}-${section.heading}`}>
                <Tag className={headingClass} style={style}>{section.heading}</Tag>
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
      </Container>
    </section>
  );
}
