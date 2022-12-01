import { z } from 'zod';

export const validationSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(6, { message: 'Password must be atleast 6 characters' })
});

export type ValidationSchema = z.infer<typeof validationSchema>;
