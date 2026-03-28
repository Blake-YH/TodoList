import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { copy } from '@/app/i18n';
import { todoFormSchema, type TodoFormValues } from '@/features/todos/schema';
import { selectMetrics, selectVisibleTodos, useTodoStore } from '@/store/todo-store';
import type { Category } from '@/types/category';
import type { AppLanguage } from '@/types/settings';
import type { TodoFilter, TodoPriority, TodoStatus } from '@/types/todo';

const categoryColors = ['#F3A522', '#3AC28C', '#6EA8FE', '#F472B6', '#A78BFA', '#F97316'];

export function TodoShell() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState(categoryColors[0]);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const todos = useTodoStore((state) => state.todos);
  const categories = useTodoStore((state) => state.categories);
  const language = useTodoStore((state) => state.language);
  const query = useTodoStore((state) => state.query);
  const isBootstrapping = useTodoStore((state) => state.isBootstrapping);
  const isSubmitting = useTodoStore((state) => state.isSubmitting);
  const error = useTodoStore((state) => state.error);
  const initialize = useTodoStore((state) => state.initialize);
  const setLanguage = useTodoStore((state) => state.setLanguage);
  const setActiveFilter = useTodoStore((state) => state.setActiveFilter);
  const setCategoryFilter = useTodoStore((state) => state.setCategoryFilter);
  const setPriorityFilter = useTodoStore((state) => state.setPriorityFilter);
  const addTodo = useTodoStore((state) => state.addTodo);
  const saveTodo = useTodoStore((state) => state.saveTodo);
  const toggleTodoStatus = useTodoStore((state) => state.toggleTodoStatus);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const addCategory = useTodoStore((state) => state.addCategory);
  const deleteCategory = useTodoStore((state) => state.deleteCategory);

  const t = copy[language];
  const priorityLabel: Record<TodoPriority, string> = {
    low: t.low,
    medium: t.medium,
    high: t.high,
  };
  const statusLabel: Record<TodoStatus, string> = {
    pending: t.pending,
    completed: t.doneStatus,
  };
  const filterLabel: Record<TodoFilter, string> = {
    today: t.today,
    all: t.all,
    completed: t.completed,
    upcoming: t.upcoming,
    overdue: t.overdue,
  };

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

  const visibleTodos = selectVisibleTodos(todos, query);
  const metrics = selectMetrics(todos);
  const editingTodo = todos.find((todo) => todo.id === editingTodoId) ?? null;

  async function handleSubmit(values: TodoFormValues) {
    if (editingTodo) {
      await saveTodo({
        id: editingTodo.id,
        title: values.title,
        description: values.description || null,
        priority: values.priority,
        categoryId: values.categoryId || null,
        dueDate: values.dueDate || null,
      });
      setEditingTodoId(null);
    } else {
      await addTodo({
        title: values.title,
        description: values.description || null,
        priority: values.priority,
        categoryId: values.categoryId || null,
        dueDate: values.dueDate || null,
      });
    }

    resetForm();
  }

  async function handleCreateCategory() {
    const trimmed = categoryName.trim();
    if (!trimmed) {
      return;
    }

    await addCategory(trimmed, categoryColor);
    setCategoryName('');
    setCategoryColor(categoryColors[0]);
  }

  function beginEdit(todoId: string) {
    const todo = todos.find((item) => item.id === todoId);
    if (!todo) {
      return;
    }

    setEditingTodoId(todo.id);
    form.reset({
      title: todo.title,
      description: todo.description ?? '',
      priority: todo.priority,
      categoryId: todo.categoryId ?? '',
      dueDate: todo.dueDate?.slice(0, 10) ?? '',
    });
  }

  function cancelEdit() {
    setEditingTodoId(null);
    resetForm();
  }

  function resetForm() {
    form.reset({
      title: '',
      description: '',
      priority: 'medium',
      categoryId: '',
      dueDate: '',
    });
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">{t.desktopMvp}</p>
          <h1>TodoList</h1>
          <p className="brand-copy">
            {language === 'zh-CN'
              ? '一款面向 Windows 的本地优先、轻量化桌面待办应用。'
              : 'Local-first lightweight desktop todo app for Windows.'}
          </p>
        </div>

        <section className="sidebar-panel">
          <p className="eyebrow">{t.language}</p>
          <div className="language-row">
            <button
              className={`nav-item compact ${language === 'en' ? 'is-active' : ''}`}
              onClick={() => void setLanguage('en')}
              type="button"
            >
              {t.english}
            </button>
            <button
              className={`nav-item compact ${language === 'zh-CN' ? 'is-active' : ''}`}
              onClick={() => void setLanguage('zh-CN')}
              type="button"
            >
              {t.chinese}
            </button>
          </div>
        </section>

        <nav className="nav-list" aria-label="Primary">
          {(['today', 'all', 'upcoming', 'overdue', 'completed'] as TodoFilter[]).map((filter) => (
            <button
              className={`nav-item ${query.filter === filter ? 'is-active' : ''}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filterLabel[filter]}
            </button>
          ))}
        </nav>

        <section className="sidebar-panel">
          <p className="eyebrow">{t.categoryStudio}</p>
          <div className="inline-row">
            <input
              className="text-input"
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder={t.newCategory}
              value={categoryName}
            />
            <button className="secondary-button" onClick={handleCreateCategory} type="button">
              {t.add}
            </button>
          </div>

          <div className="color-row" role="list" aria-label="Category colors">
            {categoryColors.map((color) => (
              <button
                aria-label={`Choose color ${color}`}
                className={`color-swatch ${categoryColor === color ? 'is-selected' : ''}`}
                key={color}
                onClick={() => setCategoryColor(color)}
                style={{ backgroundColor: color }}
                type="button"
              />
            ))}
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <article className="category-card" key={category.id}>
                <button
                  className={`category-chip ${query.categoryId === category.id ? 'is-selected' : ''}`}
                  onClick={() => setCategoryFilter(query.categoryId === category.id ? '' : category.id)}
                  type="button"
                >
                  <span className="category-dot" style={{ backgroundColor: category.color }} />
                  <span>{category.name}</span>
                  <span className="category-count">{countTodosByCategory(todos, category.id)}</span>
                </button>
                <button className="ghost-button" onClick={() => deleteCategory(category.id)} type="button">
                  {t.remove}
                </button>
              </article>
            ))}
          </div>
        </section>
      </aside>

      <section className="workspace">
        <header className="hero-panel">
          <div>
            <p className="eyebrow">{t.desktopMvp}</p>
            <h2>{t.heroTitle}</h2>
            <p className="hero-copy">{t.heroCopy}</p>
          </div>
        </header>

        <section className="panel-grid">
          <article className="metrics-panel">
            <div>
              <span className="metric-value">{metrics.total.toString().padStart(2, '0')}</span>
              <span className="metric-label">{t.totalTodos}</span>
            </div>
            <div>
              <span className="metric-value">{metrics.completed.toString().padStart(2, '0')}</span>
              <span className="metric-label">{t.completed}</span>
            </div>
            <div>
              <span className="metric-value">{metrics.highPriority.toString().padStart(2, '0')}</span>
              <span className="metric-label">{t.highPriority}</span>
            </div>
            <div>
              <span className="metric-value">{metrics.overdue.toString().padStart(2, '0')}</span>
              <span className="metric-label">{t.overdueMetric}</span>
            </div>
          </article>

          <article className="todo-panel form-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">{editingTodo ? t.editTodo : t.createTodo}</p>
                <h3>{editingTodo ? t.updateTask : t.captureTask}</h3>
              </div>
            </div>

            <form className="todo-form" onSubmit={form.handleSubmit(handleSubmit)}>
              <label className="field">
                <span>{t.title}</span>
                <input className="text-input" placeholder={t.title} {...form.register('title')} />
                <small>{form.formState.errors.title?.message}</small>
              </label>

              <label className="field">
                <span>{t.description}</span>
                <textarea className="text-area" placeholder={t.description} {...form.register('description')} />
                <small>{form.formState.errors.description?.message}</small>
              </label>

              <div className="field-grid">
                <label className="field">
                  <span>{t.priority}</span>
                  <select className="text-input" {...form.register('priority')}>
                    <option value="low">{t.low}</option>
                    <option value="medium">{t.medium}</option>
                    <option value="high">{t.high}</option>
                  </select>
                </label>

                <label className="field">
                  <span>{t.category}</span>
                  <select className="text-input" {...form.register('categoryId')}>
                    <option value="">{t.noCategory}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="field">
                <span>{t.dueDate}</span>
                <input className="text-input" type="date" {...form.register('dueDate')} />
              </label>

              <div className="inline-row action-row">
                <button className="primary-button" disabled={isSubmitting} type="submit">
                  {isSubmitting ? t.saving : editingTodo ? t.saveChanges : t.createTask}
                </button>
                {editingTodo ? (
                  <button className="secondary-button" onClick={cancelEdit} type="button">
                    {t.cancel}
                  </button>
                ) : null}
              </div>
            </form>
          </article>

          <article className="todo-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">{t.todoList}</p>
                <h3>{filterLabel[query.filter]}</h3>
              </div>
              <span className="pill">
                {categories.length} {t.categoryCount}
              </span>
            </div>

            <div className="field-grid filters-row">
              <label className="field">
                <span>{t.categoryFilter}</span>
                <select
                  className="text-input"
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  value={query.categoryId}
                >
                  <option value="">{t.allCategories}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>{t.priorityFilter}</span>
                <select
                  className="text-input"
                  onChange={(event) => setPriorityFilter(event.target.value as '' | TodoPriority)}
                  value={query.priority}
                >
                  <option value="">{t.allPriorities}</option>
                  <option value="high">{t.high}</option>
                  <option value="medium">{t.medium}</option>
                  <option value="low">{t.low}</option>
                </select>
              </label>
            </div>

            {error ? <p className="error-banner">{error}</p> : null}

            {isBootstrapping ? <p className="empty-state">{t.loading}</p> : null}

            {!isBootstrapping && visibleTodos.length === 0 ? <p className="empty-state">{t.empty}</p> : null}

            <div className="todo-list">
              {visibleTodos.map((todo) => (
                <article className="todo-card" key={todo.id}>
                  <div className="todo-main">
                    <div className={`status-dot status-${todo.status}`} aria-hidden="true" />
                    <div>
                      <h4>{todo.title}</h4>
                      <p>
                        {resolveCategoryName(todo.categoryId, categories, language)} | {statusLabel[todo.status]}
                      </p>
                    </div>
                  </div>
                  <div className="todo-meta">
                    <span className={`priority-tag priority-${todo.priority}`}>{priorityLabel[todo.priority]}</span>
                    <span className={`due-tag ${getDueTone(todo.dueDate, todo.status)}`}>
                      {formatDueLabel(todo.dueDate, todo.status, language)}
                    </span>
                    <button className="secondary-button" onClick={() => beginEdit(todo.id)} type="button">
                      {t.edit}
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() =>
                        toggleTodoStatus(todo.id, todo.status === 'completed' ? 'pending' : 'completed')
                      }
                      type="button"
                    >
                      {todo.status === 'completed' ? t.reopen : t.complete}
                    </button>
                    <button className="ghost-button" onClick={() => deleteTodo(todo.id)} type="button">
                      {t.delete}
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

function resolveCategoryName(categoryId: string | null, categories: Category[], language: AppLanguage) {
  return categories.find((category) => category.id === categoryId)?.name ?? copy[language].inbox;
}

function countTodosByCategory(todos: { categoryId: string | null }[], categoryId: string) {
  return todos.filter((todo) => todo.categoryId === categoryId).length;
}

function formatDueLabel(dueDate: string | null, status: TodoStatus, language: AppLanguage) {
  const today = new Date().toISOString().slice(0, 10);
  const t = copy[language];

  if (status === 'completed') {
    return t.done;
  }

  if (!dueDate) {
    return t.noDueDate;
  }

  const value = dueDate.slice(0, 10);
  if (value === today) {
    return t.dueToday;
  }

  if (value < today) {
    return `${t.overdueLabel} | ${value}`;
  }

  if (value > today) {
    return `${t.upcomingLabel} | ${value}`;
  }

  return dueDate.slice(0, 10);
}

function getDueTone(dueDate: string | null, status: TodoStatus) {
  const today = new Date().toISOString().slice(0, 10);

  if (status === 'completed' || !dueDate) {
    return '';
  }

  const value = dueDate.slice(0, 10);
  if (value < today) {
    return 'due-overdue';
  }

  if (value === today) {
    return 'due-today';
  }

  return 'due-upcoming';
}
