import type { FilterTab } from '../types'

interface Props {
  active: FilterTab
  onChange: (tab: FilterTab) => void
  totalActive: number
  totalCompleted: number
}

const tabs: { value: FilterTab; label: string }[] = [
  { value: 'todas',      label: 'Todas'      },
  { value: 'ativas',     label: 'Ativas'     },
  { value: 'concluídas', label: 'Concluídas' },
]

export default function FilterBar({ active, onChange, totalActive, totalCompleted }: Props) {
  const counts: Record<FilterTab, number> = {
    todas:       totalActive + totalCompleted,
    ativas:      totalActive,
    'concluídas': totalCompleted,
  }

  return (
    <div className="flex bg-night-elevated rounded-2xl p-1 mb-4 border border-night-border">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
            active === tab.value
              ? 'bg-night-surface text-violet-400 border border-night-border shadow-sm'
              : 'text-night-muted hover:text-night-text'
          }`}
        >
          {tab.label}
          {counts[tab.value] > 0 && (
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              active === tab.value
                ? 'bg-violet-500/15 text-violet-400'
                : 'bg-night-border text-night-muted'
            }`}>
              {counts[tab.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
