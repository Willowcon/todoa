import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('projects')
      .select('*, tasks(count)')
      .order('created_at', { ascending: true })
    setProjects(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const addProject = async (name) => {
    const { data } = await supabase.from('projects').insert({ name }).select().single()
    if (data) setProjects((prev) => [...prev, { ...data, tasks: [{ count: 0 }] }])
    return data
  }

  const deleteProject = async (id) => {
    await supabase.from('projects').delete().eq('id', id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return { projects, loading, addProject, deleteProject, refetch: fetchProjects }
}
