import { useTasks } from '../hooks/useTasks'
import TaskList from '../components/TaskList'
import AddTaskForm from '../components/AddTaskForm'

const today = new Date().toISOString().split('T')[0]

export default function TodayView() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks({ dueToday: true })

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-baseline gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Today</h1>
        <span className="text-sm text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <div className="space-y-4">
        <AddTaskForm onAdd={addTask} defaultDueDate={today} />
        {loading ? (
          <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
        ) : (
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} showProject />
        )}
      </div>
    </div>
  )
}
