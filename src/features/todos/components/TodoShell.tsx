import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { todoFormSchema, type TodoFormValues } from '@/features/todos/schema';
import { selectMetrics, selectVisibleTodos, useTodoStore } from '@/store/todo-store';
import type { TodoFilter, TodoPriority, TodoStatus } from '@/types/todo';

const priorityLabel: Record<TodoPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const statusLabel: Record<TodoStatus, string> = {
  pending: 'Pending',
  completed: 'Completed',
};

const filterLabel: Record<TodoFilter, string> = {
  today: 'Today',
  all: 'All todos',
  completed: 'Completed',
};

export function TodoShell() {
  const [categoryName, setCategoryName] = useState('');
  const todos = useTodoStore((state) => state.todos);
  const categories = useTodoStore((state) => state.categories);
  const activeFilter = useTodoStore((state) => state.activeFilter);
  const isBootstrapping = useTodoStore((state) => state.isBootstrapping);
  const isSubmitting = useTodoStore((state) => state.isSubmitting);
  const error = useTodoStore((state) => state.error);
  const initialize = useTodoStore((state) => state.initialize);
  const setActiveFilter = useTodoStore((state) => state.setActiveFilter);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodoStatus = useTodoStore((state) => state.toggleTodoStatus);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const addCategory = useTodoStore((state) => state.addCategory);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      categoryId: '',
      dueDate: '',
    },
  });

  useEffect(() => {
    void initialize();
  }, [initialize]);

  const visibleTodos = selectVisibleTodos(todos, activeFilter);
  const metrics = selectMetrics(todos);

  async function handleSubmit(values: TodoFormValues) {
    await addTodo({
      title: values.title,
      description: values.description || null,
      priority: values.priority,
      categoryId: values.categoryId || null,
      dueDate: values.dueDate || null,
    });

    form.reset({
      title: '',
      description: '',
      priority: 'medium',
      categoryId: values.categoryId,
      dueDate: '',
    });
  }

  async function handleCreateCategory() {
    const trimmed = categoryName.trim();
    if (!trimmed) {
      return;
    }

    await addCategory(trimmed, '#F3A522');
    setCategoryName('');
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">Desktop MVP</p>
          <h1>TodoList</h1>
          <p className="brand-copy">Local-first lightweight desktop todo app for Windows.</p>
        </div>

        <nav className="nav-list" aria-label="Primary">
          {(['today', 'all', 'completed'] as TodoFilter[]).map((filter) => (
            <button
              className={`nav-item ${activeFilter === filter ? 'is-active' : ''}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filterLabel[filter]}
            </button>
          ))}
        </nav>

        <section className="sidebar-panel">
          <p className="eyebrow">Quick Category</p>
          <div className="inline-row">
            <input
              className="text-input"
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="New category"
              value={categoryName}
            />
            <button className="secondary-button" onClick={handleCreateCategory} type="button">
              Add
            </button>
          </div>
        </section>
      </aside>

      <section className="workspace">
        <header className="hero-panel">
          <div>
            <p className="eyebrow">MVP Scaffold</p>
            <h2>SQLite, Tauri commands, and local store are now connected.</h2>
            <p className="hero-copy">The next step is expanding CRUD, filters, and richer category workflows.</p>
          </div>
        </header>

        <section className="panel-grid">
          <article className="metrics-panel">
            <div>
              <span className="metric-value">{metrics.total.toString().padStart(2, '0')}</span>
              <span className="metric-label">Total todos</span>
            </div>
            <div>
              <span className="metric-value">{metrics.completed.toString().padStart(2, '0')}</span>
              <span className="metric-label">Completed</span>
            </div>
            <div>
              <span className="metric-value">{metrics.highPriority.toString().padStart(2, '0')}</span>
              <span className="metric-label">High priority</span>
            </div>
          </article>

          <article className="todo-panel form-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Create Todo</p>
                <h3>Capture the next task quickly</h3>
              </div>
            </div>

            <form className="todo-form" onSubmit={form.handleSubmit(handleSubmit)}>
              <label className="field">
                <span>Title</span>
                <input className="text-input" placeholder="Finish database setup" {...form.register('title')} />
                <small>{form.formState.errors.title?.message}</small>
              </label>

              <label className="field">
                <span>Description</span>
                <textarea className="text-area" placeholder="Optional notes..." {...form.register('description')} />
                <small>{form.formState.errors.description?.message}</small>
              </label>

              <div className="field-grid">
                <label className="field">
                  <span>Priority</span>
                  <select className="text-input" {...form.register('priority')}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>

                <label className="field">
                  <span>Category</span>
                  <select className="text-input" {...form.register('categoryId')}>
                    <option value="">No category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="field">
                <span>Due date</span>
                <input className="text-input" type="date" {...form.register('dueDate')} />
              </label>

              <button className="primary-button" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Saving...' : 'Create todo'}
              </button>
            </form>
          </article>

          <article className="todo-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Todo List</p>
                <h3>{filterLabel[activeFilter]}</h3>
              </div>
              <span className="pill">{categories.length} categories</span>
            </div>

            {error ? <p className="error-banner">{error}</p> : null}

            {isBootstrapping ? <p className="empty-state">Loading local data...</p> : null}

            {!isBootstrapping && visibleTodos.length === 0 ? (
              <p className="empty-state">No todos in this view yet.</p>
            ) : null}

            <div className="todo-list">
              {visibleTodos.map((todo) => (
                <article className="todo-card" key={todo.id}>
                  <div className="todo-main">
                    <div className={`status-dot status-${todo.status}`} aria-hidden="true" />
                    <div>
                      <h4>{todo.title}</h4>
                      <p>
                        {resolveCategoryName(todo.categoryId, categories)} · {statusLabel[todo.status]}
                      </p>
                    </div>
                  </div>
                  <div className="todo-meta">
                    <span className={`priority-tag priority-${todo.priority}`}>
                      {priorityLabel[todo.priority]}
                    </span>
                    <span className="due-tag">{formatDueLabel(todo.dueDate, todo.status)}</span>
                    <button
                      className="secondary-button"
                      onClick={() =>
                        toggleTodoStatus(todo.id, todo.status === 'completed' ? 'pending' : 'completed')
                      }
                      type="button"
                    >
                      {todo.status === 'completed' ? 'Reopen' : 'Complete'}
                    </button>
                    <button className="ghost-button" onClick={() => deleteTodo(todo.id)} type="button">
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

function resolveCategoryName(categoryId: string | null, categories: { id: string; name: string }[]) {
  return categories.find((category) => category.id === categoryId)?.name ?? 'Inbox';
}

function formatDueLabel(dueDate: string | null, status: TodoStatus) {
  if (status === 'completed') {
    return 'Done';
  }

  if (!dueDate) {
    return 'No due date';
  }

  return dueDate.slice(0, 10);
}
