'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getContactFormSchema, type ContactFormData } from '@/lib/validations';
import Button from '@/components/ui/Button';
import type { Locale, Dict } from '@/lib/i18n';

interface ContactFormProps {
  locale?: Locale;
  formDict: Dict;
  className?: string;
}

export default function ContactForm({ formDict, className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const schema = getContactFormSchema(formDict.validation);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: data }),
      });

      if (!response.ok) throw new Error('Form submission failed');

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      setErrorMessage(formDict.errorMsg as string);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-[var(--color-navy)] font-medium mb-2">
          {formDict.nameLabel} <span className="text-[var(--color-error)]">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-blue)] focus:border-transparent transition-all"
          placeholder={formDict.namePlaceholder as string}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-[var(--color-navy)] font-medium mb-2">
          {formDict.phoneLabel} <span className="text-[var(--color-error)]">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-blue)] focus:border-transparent transition-all"
          placeholder="+373 XX XXX XXX"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-[var(--color-navy)] font-medium mb-2">
          {formDict.messageLabel}
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-blue)] focus:border-transparent transition-all resize-none"
          placeholder={formDict.messagePlaceholder as string}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? formDict.submittingBtn : formDict.submitBtn}
      </Button>

      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-[var(--color-success)] bg-opacity-10 border border-[var(--color-success)] rounded-lg">
          <p className="text-white text-center font-medium">
            {formDict.successMsg}
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-[var(--color-error)] bg-opacity-10 border border-[var(--color-error)] rounded-lg">
          <p className="text-white text-center">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
