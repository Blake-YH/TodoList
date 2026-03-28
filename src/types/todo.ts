export type TodoStatus = 'pending' | 'completed';

export type TodoPriority = 'low' | 'medium' | 'high';

export type TodoFilter = 'today' | 'all' | 'completed';

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

export type CreateTodoInput = {
  title: string;
  description?: string | null;
  priority: TodoPriority;
  categoryId?: string | null;
  dueDate?: string | null;
};
