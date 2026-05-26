import { useState, useEffect } from 'react'
import type { Task, Priority, Category } from '../types'

const STORAGE_KEY = 'todo-marlon-tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(text: string, priority: Priority, category: Category) {
    const task: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
    }
    setTasks(prev => [task, ...prev])
  }

  function toggleTask(id: string) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function editTask(id: string, text: string) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, text: text.trim() } : t))
    )
  }

  function clearCompleted() {
    setTasks(prev => prev.filter(t => !t.completed))
  }

  return { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted }
}
