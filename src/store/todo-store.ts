import { create } from 'zustand';

import {
  createCategory,
  createTodo,
  fetchCategories,
  fetchSettings,
  fetchTodos,
  removeCategory,
  removeTodo,
  updateTheme,
  updateLanguage,
  updateTodo,
  updateTodoStatus,
} from '@/services/todos';
import type { Category } from '@/types/category';
import type { AppLanguage, AppTheme } from '@/types/settings';
import type {
  CreateTodoInput,
  Todo,
  TodoFilter,
  TodoPriority,
  TodoQuery,
  TodoStatus,
  UpdateTodoInput,
} from '@/types/todo';

type TodoStore = {
  todos: Todo[];
  categories: Category[];
  language: AppLanguage;
  theme: AppTheme;
  query: TodoQuery;
  isBootstrapping: boolean;
  isSubmitting: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  setLanguage: (language: AppLanguage) => Promise<void>;
  setTheme: (theme: AppTheme) => Promise<void>;
  setActiveFilter: (filter: TodoFilter) => void;
  setCategoryFilter: (categoryId: string) => void;
  setPriorityFilter: (priority: '' | TodoPriority) => void;
  addTodo: (input: CreateTodoInput) => Promise<void>;
  saveTodo: (input: UpdateTodoInput) => Promise<void>;
  toggleTodoStatus: (id: string, status: TodoStatus) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  addCategory: (name: string, color: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  categories: [],
  language: 'en',
  theme: 'dark',
  query: {
    filter: 'today',
    categoryId: '',
    priority: '',
  },
  isBootstrapping: true,
  isSubmitting: false,
  error: null,
  async initialize() {
    set({ isBootstrapping: true, error: null });

    try {
      const [todos, categories, settings] = await Promise.all([
        fetchTodos(),
        fetchCategories(),
        fetchSettings(),
      ]);
      set({
        todos,
        categories,
        language: settings.language,
        theme: settings.theme,
        isBootstrapping: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to initialize local data.',
        isBootstrapping: false,
      });
    }
  },
  async setLanguage(language) {
    try {
      const settings = await updateLanguage(language);
      set({ language: settings.language, theme: settings.theme });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update language.',
      });
    }
  },
  async setTheme(theme) {
    try {
      const settings = await updateTheme(theme);
      set({ language: settings.language, theme: settings.theme });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update theme.',
      });
    }
  },
  setActiveFilter(filter) {
    set((state) => ({
      query: {
        ...state.query,
        filter,
      },
    }));
  },
  setCategoryFilter(categoryId) {
    set((state) => ({
      query: {
        ...state.query,
        categoryId,
      },
    }));
  },
  setPriorityFilter(priority) {
    set((state) => ({
      query: {
        ...state.query,
        priority,
      },
    }));
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
  async saveTodo(input) {
    set({ isSubmitting: true, error: null });

    try {
      const todo = await updateTodo(input);
      set((state) => ({
        todos: state.todos.map((item) => (item.id === todo.id ? todo : item)),
        isSubmitting: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update todo.',
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
  async deleteCategory(id) {
    try {
      await removeCategory(id);
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
        todos: state.todos.map((todo) =>
          todo.categoryId === id
            ? {
                ...todo,
                categoryId: null,
              }
            : todo,
        ),
        query:
          state.query.categoryId === id
            ? {
                ...state.query,
                categoryId: '',
              }
            : state.query,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete category.',
      });
    }
  },
}));

export function selectVisibleTodos(todos: Todo[], query: TodoQuery) {
  const today = new Date().toISOString().slice(0, 10);
  let result = todos;

  if (query.filter === 'completed') {
    result = result.filter((todo) => todo.status === 'completed');
  }

  if (query.filter === 'today') {
    result = result.filter((todo) => {
      if (todo.status === 'completed') {
        return false;
      }

      return todo.dueDate ? todo.dueDate.startsWith(today) : true;
    });
  }

  if (query.filter === 'upcoming') {
    result = result.filter((todo) => {
      if (todo.status === 'completed' || !todo.dueDate) {
        return false;
      }

      return todo.dueDate.slice(0, 10) > today;
    });
  }

  if (query.filter === 'overdue') {
    result = result.filter((todo) => {
      if (todo.status === 'completed' || !todo.dueDate) {
        return false;
      }

      return todo.dueDate.slice(0, 10) < today;
    });
  }

  if (query.categoryId) {
    result = result.filter((todo) => todo.categoryId === query.categoryId);
  }

  if (query.priority) {
    result = result.filter((todo) => todo.priority === query.priority);
  }

  return result;
}

export function selectMetrics(todos: Todo[]) {
  const today = new Date().toISOString().slice(0, 10);

  return {
    total: todos.length,
    completed: todos.filter((todo) => todo.status === 'completed').length,
    highPriority: todos.filter((todo) => todo.priority === 'high' && todo.status === 'pending').length,
    overdue: todos.filter(
      (todo) => todo.status === 'pending' && Boolean(todo.dueDate) && todo.dueDate!.slice(0, 10) < today,
    ).length,
  };
}
