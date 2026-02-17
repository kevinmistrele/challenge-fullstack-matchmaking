import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, 'Shorty name must be at least 3 characters long'),
  email: z.string().email('invalid email address'),
});

export type User = z.infer<typeof userSchema>;
