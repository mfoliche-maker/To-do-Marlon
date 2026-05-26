import { useState, useRef } from 'react'
import type { Priority, Category } from '../types'

interface Props {
  onAdd: (text: string, priority: Priority, category: Category) => void
}

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Baixa', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'medium', label: 'Média', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'high', label: 'Alta', color: 'bg-red-100 text-red-700 border-red-200' },
]

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'pessoal', label: 'Pessoal', emoji: '👤' },
  { value: 'trabalho', label: 'Trabalho', emoji: '💼' },
  { value: 'compras', label: 'Compras', emoji: '🛒' },
  { value: 'saúde', label: 'Saúde', emoji: '💪' },
  { value: 'outros', label: 'Outros', emoji: '📌' },
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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-4 mb-4">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="Adicionar nova tarefa..."
          className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-base outline-none border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-blue-600 text-white rounded-xl px-4 py-3 font-semibold disabled:opacity-40 active:scale-95 transition-all"
        >
          +
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3 task-enter">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Prioridade</p>
            <div className="flex gap-2">
              {priorities.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                    priority === p.value
                      ? p.color + ' border-current shadow-sm'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Categoria</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={`flex-shrink-0 py-2 px-3 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                    category === c.value
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
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
