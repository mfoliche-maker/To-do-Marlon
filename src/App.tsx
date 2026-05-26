import { useState, useMemo } from 'react'
import { useTasks } from './hooks/useTasks'
import type { FilterTab } from './types'
import AddTaskForm from './components/AddTaskForm'
import TaskItem from './components/TaskItem'
import FilterBar from './components/FilterBar'

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted } = useTasks()
  const [filter, setFilter] = useState<FilterTab>('todas')
  const [search, setSearch] = useState('')

  const active = tasks.filter(t => !t.completed)
  const completed = tasks.filter(t => t.completed)

  const filtered = useMemo(() => {
    let list = filter === 'ativas' ? active : filter === 'concluídas' ? completed : tasks
    if (search.trim()) {
      list = list.filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    }
    return list
  }, [tasks, filter, search, active, completed])

  const progress = tasks.length > 0 ? Math.round((completed.length / tasks.length) * 100) : 0

  return (
    <div className="min-h-svh bg-night-bg flex flex-col">
      <header className="relative px-4 pt-12 pb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/70 via-[#100d1f]/80 to-night-bg" />
        <div className="header-glow absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-violet-600/25 blur-3xl pointer-events-none" />

        <div className="max-w-md mx-auto relative">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-night-text tracking-tight">Minhas Tarefas</h1>
          </div>
          <p className="text-violet-300/70 text-sm ml-[42px]">
            {active.length === 0
              ? completed.length > 0 ? 'Tudo concluído! 🎉' : 'Sem tarefas ainda'
              : `${active.length} tarefa${active.length !== 1 ? 's' : ''} pendente${active.length !== 1 ? 's' : ''}`}
          </p>

          {tasks.length > 0 && (
            <div className="mt-5">
              <div className="flex justify-between text-xs text-night-muted mb-2">
                <span>Progresso</span>
                <span className="text-violet-400 font-semibold tabular-nums">{progress}%</span>
              </div>
              <div className="bg-night-elevated rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-700 to-violet-400 rounded-full h-1.5 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 py-4 max-w-md mx-auto w-full pb-8">
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-night-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar tarefas..."
            className="w-full bg-night-elevated rounded-2xl pl-9 pr-4 py-3 text-base outline-none border border-night-border focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 text-night-text placeholder:text-night-dim transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-night-muted active:scale-90 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <AddTaskForm onAdd={addTask} />

        <FilterBar
          active={filter}
          onChange={setFilter}
          totalActive={active.length}
          totalCompleted={completed.length}
        />

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-night-muted">
              <div className="text-5xl mb-3">
                {search ? '🔍' : filter === 'concluídas' ? '🎉' : '📝'}
              </div>
              <p className="text-base font-medium">
                {search
                  ? 'Nenhuma tarefa encontrada'
                  : filter === 'concluídas'
                  ? 'Nenhuma tarefa concluída'
                  : filter === 'ativas'
                  ? 'Nenhuma tarefa pendente'
                  : 'Adicione sua primeira tarefa!'}
              </p>
            </div>
          ) : (
            filtered.map(task => (
              <div key={task.id} className="task-enter">
                <TaskItem
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              </div>
            ))
          )}
        </div>

        {completed.length > 0 && filter !== 'ativas' && (
          <button
            onClick={clearCompleted}
            className="mt-4 w-full py-3 text-sm text-night-muted font-medium border border-night-border rounded-2xl bg-night-surface active:bg-night-elevated active:scale-[0.99] transition-all hover:border-violet-500/25 hover:text-night-text"
          >
            Limpar concluídas ({completed.length})
          </button>
        )}
      </main>
    </div>
  )
}
