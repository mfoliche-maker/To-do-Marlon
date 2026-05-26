import type { FilterTab } from '../types'

interface Props {
  active: FilterTab
  onChange: (tab: FilterTab) => void
  totalActive: number
  totalCompleted: number
}

const tabs: { value: FilterTab; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'ativas', label: 'Ativas' },
  { value: 'concluídas', label: 'Concluídas' },
]

export default function FilterBar({ active, onChange, totalActive, totalCompleted }: Props) {
  const counts: Record<FilterTab, number | null> = {
    todas: totalActive + totalCompleted,
    ativas: totalActive,
    'concluídas': totalCompleted,
  }

  return (
    <div className="flex bg-slate-200 rounded-2xl p-1 mb-4">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
            active === tab.value
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          {tab.label}
          {counts[tab.value] !== null && counts[tab.value]! > 0 && (
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              active === tab.value ? 'bg-blue-100 text-blue-600' : 'bg-slate-300 text-slate-500'
            }`}>
              {counts[tab.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
