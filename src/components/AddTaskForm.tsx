import { useState, useRef } from 'react'
import type { Priority, Category } from '../types'

interface Props {
  onAdd: (text: string, priority: Priority, category: Category) => void
}

const priorities: { value: Priority; label: string; idle: string; active: string }[] = [
  {
    value:  'low',
    label:  'Baixa',
    idle:   'bg-night-elevated text-night-muted border-night-border',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  {
    value:  'medium',
    label:  'Média',
    idle:   'bg-night-elevated text-night-muted border-night-border',
    active: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
  {
    value:  'high',
    label:  'Alta',
    idle:   'bg-night-elevated text-night-muted border-night-border',
    active: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  },
]

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'pessoal',  label: 'Pessoal',  emoji: '👤' },
  { value: 'trabalho', label: 'Trabalho', emoji: '💼' },
  { value: 'compras',  label: 'Compras',  emoji: '🛒' },
  { value: 'saúde',    label: 'Saúde',    emoji: '💪' },
  { value: 'outros',   label: 'Outros',   emoji: '📌' },
]

export default function AddTaskForm({ onAdd }: Props) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState<Category>('pessoal')
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, priority, category)
    setText('')
    setExpanded(false)
    inputRef.current?.blur()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-night-surface rounded-2xl border border-night-border p-4 mb-4">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="Adicionar nova tarefa..."
          className="flex-1 bg-night-elevated rounded-xl px-4 py-3 text-base outline-none border border-night-border focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all placeholder:text-night-dim text-night-text"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-4 py-3 font-bold text-lg disabled:opacity-30 active:scale-95 transition-all"
        >
          +
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 task-enter">
          <div>
            <p className="text-xs font-semibold text-night-muted uppercase tracking-widest mb-2">Prioridade</p>
            <div className="flex gap-2">
              {priorities.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                    priority === p.value ? p.active : p.idle
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-night-muted uppercase tracking-widest mb-2">Categoria</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={`flex-shrink-0 py-2 px-3 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                    category === c.value
                      ? 'bg-violet-500/10 text-violet-400 border-violet-500/30'
                      : 'bg-night-elevated text-night-muted border-night-border'
                  }`}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
