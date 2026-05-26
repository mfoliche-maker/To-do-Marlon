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
    <div className="min-h-svh bg-slate-100 flex flex-col">
      <header className="bg-blue-600 text-white px-4 pt-12 pb-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Minhas Tarefas</h1>
          <p className="text-blue-200 text-sm">
            {active.length === 0
              ? completed.length > 0 ? 'Tudo concluído!' : 'Sem tarefas ainda'
              : `${active.length} tarefa${active.length !== 1 ? 's' : ''} pendente${active.length !== 1 ? 's' : ''}`}
          </p>

          {tasks.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-blue-200 mb-1">
                <span>Progresso</span>
                <span>{progress}%</span>
              </div>
              <div className="bg-blue-500 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 py-4 max-w-md mx-auto w-full pb-8">
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar tarefas..."
            className="w-full bg-white rounded-2xl pl-9 pr-4 py-3 text-base outline-none border border-transparent focus:border-blue-300 shadow-sm placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 active:scale-90 transition-all"
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
            <div className="text-center py-12 text-slate-400">
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
            className="mt-4 w-full py-3 text-sm text-slate-500 font-medium border border-slate-200 rounded-2xl bg-white active:bg-slate-50 active:scale-[0.99] transition-all"
          >
            Limpar concluídas ({completed.length})
          </button>
        )}
      </main>
    </div>
  )
}
