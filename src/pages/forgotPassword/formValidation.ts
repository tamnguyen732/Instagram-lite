import { z } from 'zod';

export const validationSchema = z.object({
  email: z
    .string()
    .min(5, { message: 'Email is required' })
    .email({ message: 'Must be a valid email' })
});

export type ValidationSchema = z.infer<typeof validationSchema>;
