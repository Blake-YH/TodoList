import { create } from 'zustand';

import {
  createCategory,
  createTodo,
  fetchCategories,
  fetchTodos,
  removeTodo,
  updateTodoStatus,
} from '@/services/todos';
import type { Category } from '@/types/category';
import type { CreateTodoInput, Todo, TodoFilter, TodoStatus } from '@/types/todo';

type TodoStore = {
  todos: Todo[];
  categories: Category[];
  activeFilter: TodoFilter;
  isBootstrapping: boolean;
  isSubmitting: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  setActiveFilter: (filter: TodoFilter) => void;
  addTodo: (input: CreateTodoInput) => Promise<void>;
  toggleTodoStatus: (id: string, status: TodoStatus) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  addCategory: (name: string, color: string) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  categories: [],
  activeFilter: 'today',
  isBootstrapping: true,
  isSubmitting: false,
  error: null,
  async initialize() {
    set({ isBootstrapping: true, error: null });

    try {
      const [todos, categories] = await Promise.all([fetchTodos(), fetchCategories()]);
      set({ todos, categories, isBootstrapping: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to initialize local data.',
        isBootstrapping: false,
      });
    }
  },
  setActiveFilter(filter) {
    set({ activeFilter: filter });
  },
  async addTodo(input) {
    set({ isSubmitting: true, error: null });

    try {
      const todo = await createTodo(input);
      set((state) => ({
        todos: [todo, ...state.todos],
        isSubmitting: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create todo.',
        isSubmitting: false,
      });
    }
  },
  async toggleTodoStatus(id, status) {
    try {
      const updatedTodo = await updateTodoStatus(id, status);
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update todo status.',
      });
    }
  },
  async deleteTodo(id) {
    try {
      await removeTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete todo.',
      });
    }
  },
  async addCategory(name, color) {
    try {
      const category = await createCategory({ name, color });
      set((state) => ({
        categories: [...state.categories, category],
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create category.',
      });
    }
  },
}));

export function selectVisibleTodos(todos: Todo[], activeFilter: TodoFilter) {
  const today = new Date().toISOString().slice(0, 10);

  if (activeFilter === 'completed') {
    return todos.filter((todo) => todo.status === 'completed');
  }

  if (activeFilter === 'today') {
    return todos.filter((todo) => {
      if (todo.status === 'completed') {
        return false;
      }

      return todo.dueDate ? todo.dueDate.startsWith(today) : true;
    });
  }

  return todos;
}

export function selectMetrics(todos: Todo[]) {
  return {
    total: todos.length,
    completed: todos.filter((todo) => todo.status === 'completed').length,
    highPriority: todos.filter((todo) => todo.priority === 'high' && todo.status === 'pending').length,
  };
}
