import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onUpdate, showProject = false }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-sm">No tasks here</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          showProject={showProject}
        />
      ))}
    </div>
  )
}
