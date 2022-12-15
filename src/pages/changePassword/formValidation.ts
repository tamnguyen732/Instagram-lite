import { z } from 'zod';

export const validationSchema = z
  .object({
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(6, { message: 'ConfirmPassword is required' })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'The passwords did not match'
      });
    }
  });
export type ValidationSchema = z.infer<typeof validationSchema>;
