const priorityStyles = {
  1: 'bg-red-100 text-red-700',
  2: 'bg-orange-100 text-orange-700',
  3: 'bg-blue-100 text-blue-700',
  4: 'bg-gray-100 text-gray-500',
}

const priorityBorder = {
  1: 'border-red-400 hover:bg-red-50',
  2: 'border-orange-400 hover:bg-orange-50',
  3: 'border-blue-400 hover:bg-blue-50',
  4: 'border-gray-300 hover:bg-gray-50',
}

export default function TaskItem({ task, onToggle, onDelete, showProject }) {
  const formatDate = (d) => {
    if (!d) return null
    const date = new Date(d + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diff = (date - today) / 86400000
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Tomorrow'
    if (diff === -1) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const isOverdue = task.due_date && new Date(task.due_date + 'T00:00:00') < new Date(new Date().toDateString())

  return (
    <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-gray-50 ${task.completed ? 'opacity-50' : ''}`}>
      <button
        onClick={() => onToggle(task.id, !task.completed)}
        className={`shrink-0 w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center ${
          task.completed
            ? 'bg-gray-400 border-gray-400'
            : priorityBorder[task.priority]
        }`}
      >
        {task.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {task.due_date && (
            <span className={`text-xs ${isOverdue && !task.completed ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
              {formatDate(task.due_date)}
            </span>
          )}
          {showProject && task.projects?.name && (
            <span className="text-xs text-gray-400">
              {task.due_date && '·'} {task.projects.name}
            </span>
          )}
        </div>
      </div>

      <span className={`shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded ${priorityStyles[task.priority]}`}>
        P{task.priority}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="shrink-0 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  )
}
