import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useProjects } from '../hooks/useProjects'

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  }`

export default function Sidebar() {
  const { projects, addProject } = useProjects()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    await addProject(name.trim())
    setName('')
    setShowForm(false)
  }

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-gray-50/50 h-screen sticky top-0">
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">ToDoA</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <NavLink to="/" end className={navLinkClass}>
          <InboxIcon />
          Inbox
        </NavLink>
        <NavLink to="/today" className={navLinkClass}>
          <CalendarIcon />
          Today
        </NavLink>
        <NavLink to="/projects" end className={navLinkClass}>
          <FolderIcon />
          Projects
        </NavLink>

        <div className="pt-6 pb-2 px-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Projects</span>
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="px-1 pb-2">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onBlur={() => { if (!name.trim()) setShowForm(false) }}
            />
          </form>
        )}

        {projects.map((p) => (
          <NavLink key={p.id} to={`/projects/${p.id}`} className={navLinkClass}>
            <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
            <span className="truncate">{p.name}</span>
            <span className="ml-auto text-xs text-gray-400">{p.tasks?.[0]?.count ?? 0}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

function InboxIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-17.5 0V6.75A2.25 2.25 0 014.5 4.5h15A2.25 2.25 0 0121.75 6.75v6.75m-19.5 0v4.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25v-4.5" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0A2.25 2.25 0 004.5 15h15a2.25 2.25 0 002.25-2.25m-19.5 0v4.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25v-4.5m-19.5-6V8.25A2.25 2.25 0 014.5 6h3.879a1.5 1.5 0 011.06.44l1.122 1.12a1.5 1.5 0 001.06.44H19.5a2.25 2.25 0 012.25 2.25v1.5" />
    </svg>
  )
}
