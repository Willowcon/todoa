import { useState, useEffect, useRef } from 'react'
import { useProjects } from '../hooks/useProjects'

export default function EditTaskModal({ task, onSave, onClose }) {
  const { projects } = useProjects()
  const [title, setTitle] = useState(task.title)
  const [priority, setPriority] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.due_date ?? '')
  const [projectId, setProjectId] = useState(task.project_id)
  const [tag, setTag] = useState(task.tag ?? '')
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
    titleRef.current?.select()
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const updates = {}
    if (title.trim() !== task.title) updates.title = title.trim()
    if (priority !== task.priority) updates.priority = priority
    if ((dueDate || null) !== (task.due_date || null)) updates.due_date = dueDate || null
    if ((projectId || null) !== (task.project_id || null)) updates.project_id = projectId || null
    if ((tag || null) !== (task.tag || null)) updates.tag = tag || null
    if (Object.keys(updates).length > 0) {
      onSave(task.id, updates)
    }
    onClose()
  }

  const inputClass = 'text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md border border-gray-200 rounded-xl p-4 bg-white shadow-lg space-y-3"
      >
        <h2 className="text-sm font-semibold text-gray-900">Edit task</h2>

        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent border-b border-gray-200 pb-1 focus:border-indigo-400"
        />

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <select value={priority} onChange={(e) => setPriority(Number(e.target.value))} className={inputClass}>
            <option value={1}>P1 - Urgent</option>
            <option value={2}>P2 - High</option>
            <option value={3}>P3 - Medium</option>
            <option value={4}>P4 - Low</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClass}
          />

          <select value={tag} onChange={(e) => setTag(e.target.value)} className={inputClass}>
            <option value="">No tag</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>

          <select
            value={projectId ?? ''}
            onChange={(e) => setProjectId(e.target.value || null)}
            className={inputClass}
          >
            <option value="">No project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
