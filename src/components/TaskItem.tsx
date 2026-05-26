import { useState } from 'react'
import type { Task } from '../types'

interface Props {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const priorityDot: Record<Task['priority'], string> = {
  low:    'bg-emerald-400',
  medium: 'bg-amber-400',
  high:   'bg-rose-500',
}

const categoryEmoji: Record<Task['category'], string> = {
  pessoal:  '👤',
  trabalho: '💼',
  compras:  '🛒',
  'saúde':  '💪',
  outros:   '📌',
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [showActions, setShowActions] = useState(false)

  function submitEdit() {
    if (editText.trim()) {
      onEdit(task.id, editText)
    } else {
      setEditText(task.text)
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="bg-night-surface rounded-2xl border border-violet-500/30 p-4 task-enter">
        <input
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') submitEdit()
            if (e.key === 'Escape') { setEditText(task.text); setEditing(false) }
          }}
          onBlur={submitEdit}
          autoFocus
          className="w-full bg-night-elevated rounded-xl px-4 py-3 text-base outline-none border border-violet-500/50 ring-2 ring-violet-500/10 text-night-text"
        />
      </div>
    )
  }

  return (
    <div
      className={`bg-night-surface rounded-2xl border border-night-border p-4 transition-all ${
        task.completed ? 'opacity-50' : 'hover:border-night-dim/60'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all active:scale-90 ${
            task.completed
              ? 'bg-violet-600 border-violet-600'
              : 'border-night-dim hover:border-violet-500'
          }`}
        >
          {task.completed && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0" onClick={() => setShowActions(!showActions)}>
          <p className={`text-base leading-snug ${task.completed ? 'line-through text-night-dim' : 'text-night-text'}`}>
            {task.text}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`w-2 h-2 rounded-full ${priorityDot[task.priority]}`} />
            <span className="text-xs text-night-muted">
              {categoryEmoji[task.category]} {task.category}
            </span>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-1 task-enter">
            <button
              onClick={() => { setEditing(true); setShowActions(false) }}
              className="p-2 text-night-muted hover:text-violet-400 active:scale-90 transition-all rounded-lg hover:bg-violet-500/10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-night-muted hover:text-rose-400 active:scale-90 transition-all rounded-lg hover:bg-rose-500/10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
