'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import Button from '@/components/ui/Button';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: data }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки формы');
      }

      setSubmitStatus('success');
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или позвоните нам.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-[var(--color-navy)] font-medium mb-2">
          Имя <span className="text-[var(--color-error)]">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-blue)] focus:border-transparent transition-all"
          placeholder="Ваше имя"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{errors.name.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-[var(--color-navy)] font-medium mb-2">
          Телефон <span className="text-[var(--color-error)]">*</span>
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

      {/* Message Field */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-[var(--color-navy)] font-medium mb-2">
          Сообщение (необязательно)
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-blue)] focus:border-transparent transition-all resize-none"
          placeholder="Расскажите о вашем празднике..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </Button>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-[var(--color-success)] bg-opacity-10 border border-[var(--color-success)] rounded-lg">
          <p className="text-[var(--color-success)] text-center font-medium">
            ✓ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-[var(--color-error)] bg-opacity-10 border border-[var(--color-error)] rounded-lg">
          <p className="text-[var(--color-error)] text-center">
            {errorMessage}
          </p>
        </div>
      )}
    </form>
  );
}
