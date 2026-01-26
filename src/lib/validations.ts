import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Имя слишком длинное')
    .trim(),
  phone: z
    .string()
    .regex(
      /^[\d\s+\-()]+$/,
      'Некорректный формат телефона'
    )
    .min(9, 'Телефон слишком короткий')
    .max(20, 'Телефон слишком длинный')
    .trim(),
  message: z
    .string()
    .max(500, 'Сообщение слишком длинное')
    .optional()
    .or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
