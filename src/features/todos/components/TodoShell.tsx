import type { TodoPriority, TodoStatus } from '@/types/todo';

type TodoPreview = {
  id: string;
  title: string;
  dueLabel: string;
  priority: TodoPriority;
  status: TodoStatus;
  category: string;
};

const previewTodos: TodoPreview[] = [
  {
    id: '1',
    title: '完成 Tauri + React 工程初始化',
    dueLabel: '今天',
    priority: 'high',
    status: 'pending',
    category: '开发',
  },
  {
    id: '2',
    title: '设计 SQLite 表结构与迁移方案',
    dueLabel: '明天',
    priority: 'medium',
    status: 'pending',
    category: '架构',
  },
  {
    id: '3',
    title: '补充 Todo MVP 交互细节',
    dueLabel: '已完成',
    priority: 'low',
    status: 'completed',
    category: '产品',
  },
];

const priorityLabel: Record<TodoPriority, string> = {
  low: '低',
  medium: '中',
  high: '高',
};

const statusLabel: Record<TodoStatus, string> = {
  pending: '进行中',
  completed: '已完成',
};

export function TodoShell() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">Desktop MVP</p>
          <h1>TodoList</h1>
          <p className="brand-copy">本地优先、轻量化的 Windows 待办工具。</p>
        </div>

        <nav className="nav-list" aria-label="Primary">
          <button className="nav-item is-active" type="button">
            今天
          </button>
          <button className="nav-item" type="button">
            全部待办
          </button>
          <button className="nav-item" type="button">
            已完成
          </button>
          <button className="nav-item" type="button">
            设置
          </button>
        </nav>
      </aside>

      <section className="workspace">
        <header className="hero-panel">
          <div>
            <p className="eyebrow">MVP Scaffold</p>
            <h2>今天聚焦 3 个关键任务</h2>
            <p className="hero-copy">
              当前已完成工程骨架初始化。下一阶段将接入 SQLite、Store 和 Tauri command。
            </p>
          </div>

          <button className="primary-button" type="button">
            新建待办
          </button>
        </header>

        <section className="panel-grid">
          <article className="metrics-panel">
            <div>
              <span className="metric-value">03</span>
              <span className="metric-label">今日待办</span>
            </div>
            <div>
              <span className="metric-value">01</span>
              <span className="metric-label">已完成</span>
            </div>
            <div>
              <span className="metric-value">02</span>
              <span className="metric-label">高优先级</span>
            </div>
          </article>

          <article className="todo-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Preview List</p>
                <h3>基础列表骨架</h3>
              </div>
              <span className="pill">Ready for data layer</span>
            </div>

            <div className="todo-list">
              {previewTodos.map((todo) => (
                <article className="todo-card" key={todo.id}>
                  <div className="todo-main">
                    <div className={`status-dot status-${todo.status}`} aria-hidden="true" />
                    <div>
                      <h4>{todo.title}</h4>
                      <p>
                        {todo.category} · {statusLabel[todo.status]}
                      </p>
                    </div>
                  </div>
                  <div className="todo-meta">
                    <span className={`priority-tag priority-${todo.priority}`}>
                      {priorityLabel[todo.priority]}
                    </span>
                    <span className="due-tag">{todo.dueLabel}</span>
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
