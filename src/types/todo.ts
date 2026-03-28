export type TodoStatus = 'pending' | 'completed';

export type TodoPriority = 'low' | 'medium' | 'high';

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  priority: TodoPriority;
  categoryId: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};
