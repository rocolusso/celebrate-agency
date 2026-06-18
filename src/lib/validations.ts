import { z } from 'zod';
import type { Dict } from './i18n';

export function getContactFormSchema(validationDict: Dict) {
  const v = validationDict;
  return z.object({
    name: z
      .string()
      .min(2, v.nameMin)
      .max(100, v.nameMax)
      .trim(),
    phone: z
      .string()
      .regex(/^[\d\s+\-()]+$/, v.phoneFormat)
      .min(9, v.phoneMin)
      .max(20, v.phoneLong)
      .trim(),
    message: z
      .string()
      .max(500, v.messageMax)
      .optional()
      .or(z.literal('')),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof getContactFormSchema>>;
