import { useTasks } from '../hooks/useTasks'
import TaskList from '../components/TaskList'
import AddTaskForm from '../components/AddTaskForm'

export default function InboxView() {
  const { tasks, loading, addTask, updateTask, toggleTask, deleteTask } = useTasks({ projectId: null })

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inbox</h1>
      <div className="space-y-4">
        <AddTaskForm onAdd={addTask} defaultProjectId={null} showProjectPicker={false} />
        {loading ? (
          <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
        ) : (
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
        )}
      </div>
    </div>
  )
}
