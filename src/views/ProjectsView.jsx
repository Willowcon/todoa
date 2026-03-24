import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'

export default function ProjectsView() {
  const { projects, loading, addProject, deleteProject } = useProjects()
  const [name, setName] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    await addProject(name.trim())
    setName('')
    setShowForm(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + New Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors"
          >
            Create
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">No projects yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-indigo-400" />
                <span className="text-sm font-medium text-gray-900">{p.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{p.tasks?.[0]?.count ?? 0} tasks</span>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (confirm(`Delete "${p.name}"? Tasks will be moved to Inbox.`))
                      deleteProject(p.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
