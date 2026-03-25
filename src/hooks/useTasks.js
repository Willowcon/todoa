import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useTasks(filter = {}) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('tasks')
      .select('*, projects(name)')
      .order('completed')
      .order('priority', { ascending: true })
      .order('created_at', { ascending: false })

    if (filter.projectId !== undefined) {
      if (filter.projectId === null) {
        query = query.is('project_id', null)
      } else {
        query = query.eq('project_id', filter.projectId)
      }
    }

    if (filter.dueToday) {
      const today = new Date().toISOString().split('T')[0]
      query = query.eq('due_date', today)
    }

    const { data } = await query
    setTasks(data ?? [])
    setLoading(false)
  }, [filter.projectId, filter.dueToday])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const addTask = async ({ title, priority = 4, due_date = null, project_id = null, tag = null }) => {
    const { data } = await supabase
      .from('tasks')
      .insert({ title, priority, due_date, project_id, tag })
      .select('*, projects(name)')
      .single()
    if (data) setTasks((prev) => [data, ...prev])
    return data
  }

  const updateTask = async (id, updates) => {
    const { data } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select('*, projects(name)')
      .single()
    if (data) setTasks((prev) => prev.map((t) => (t.id === id ? data : t)))
    return data
  }

  const toggleTask = async (id, completed) => {
    await supabase.from('tasks').update({ completed }).eq('id', id)
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    )
  }

  const deleteTask = async (id) => {
    await supabase.from('tasks').delete().eq('id', id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return { tasks, loading, addTask, updateTask, toggleTask, deleteTask, refetch: fetchTasks }
}
