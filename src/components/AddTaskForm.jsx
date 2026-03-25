import { useState } from 'react'
import { useProjects } from '../hooks/useProjects'

export default function AddTaskForm({ onAdd, defaultProjectId = null, defaultDueDate = null, showProjectPicker = true }) {
  const { projects } = useProjects()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(4)
  const [dueDate, setDueDate] = useState(defaultDueDate ?? '')
  const [projectId, setProjectId] = useState(defaultProjectId)
  const [tag, setTag] = useState('')
  const [expanded, setExpanded] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await onAdd({
      title: title.trim(),
      priority,
      due_date: dueDate || null,
      project_id: projectId,
      tag: tag || null,
    })
    setTitle('')
    setPriority(4)
    setDueDate(defaultDueDate ?? '')
    setTag('')
    setProjectId(defaultProjectId)
    setExpanded(false)
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-gray-300 text-lg">+</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="Add a task..."
          className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
        />
        {expanded && (
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        )}
      </div>

      {expanded && (
        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100">
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={1}>P1 - Urgent</option>
            <option value={2}>P2 - High</option>
            <option value={3}>P3 - Medium</option>
            <option value={4}>P4 - Low</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">No tag</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>

          {showProjectPicker && (
            <select
              value={projectId ?? ''}
              onChange={(e) => setProjectId(e.target.value || null)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">No project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
        </div>
      )}
    </form>
  )
}
