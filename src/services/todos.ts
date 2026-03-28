import { invoke } from '@tauri-apps/api/core';

import type { Category } from '@/types/category';
import type { CreateTodoInput, Todo, TodoStatus, UpdateTodoInput } from '@/types/todo';

type CreateCategoryInput = {
  name: string;
  color: string;
};

export async function fetchTodos() {
  return invoke<Todo[]>('list_todos');
}

export async function createTodo(input: CreateTodoInput) {
  return invoke<Todo>('create_todo', { payload: input });
}

export async function updateTodo(input: UpdateTodoInput) {
  return invoke<Todo>('update_todo', { payload: input });
}

export async function updateTodoStatus(id: string, status: TodoStatus) {
  return invoke<Todo>('update_todo_status', {
    payload: { id, status },
  });
}

export async function removeTodo(todoId: string) {
  return invoke<void>('delete_todo', { todoId });
}

export async function fetchCategories() {
  return invoke<Category[]>('list_categories');
}

export async function createCategory(input: CreateCategoryInput) {
  return invoke<Category>('create_category', { payload: input });
}
