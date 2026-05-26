export type Priority = 'low' | 'medium' | 'high'
export type Category = 'pessoal' | 'trabalho' | 'compras' | 'saúde' | 'outros'
export type FilterTab = 'todas' | 'ativas' | 'concluídas'

export interface Task {
  id: string
  text: string
  completed: boolean
  priority: Priority
  category: Category
  createdAt: number
}
