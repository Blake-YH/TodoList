import { z } from 'zod';

export const todoFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.').max(120, 'Title is too long.'),
  description: z.string().trim().max(500, 'Description is too long.').optional().or(z.literal('')),
  priority: z.enum(['low', 'medium', 'high']),
  categoryId: z.string().optional().or(z.literal('')),
  dueDate: z.string().optional().or(z.literal('')),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;
