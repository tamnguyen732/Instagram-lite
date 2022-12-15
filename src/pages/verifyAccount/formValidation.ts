import { z } from 'zod';
const stringRegex = /^[0-9]{1,45}$/;

export const validationSchema = z.object({
  code: z
    .string()
    .regex(stringRegex, { message: 'Code is not valid' })
    .min(5, { message: 'Atleast  5 Numbers' })
});

export type ValidationSchema = z.infer<typeof validationSchema>;
