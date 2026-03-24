import { useParams, Link } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import { useProjects } from '../hooks/useProjects'
import TaskList from '../components/TaskList'
import AddTaskForm from '../components/AddTaskForm'

export default function ProjectDetailView() {
  const { projectId } = useParams()
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks({ projectId })
  const { projects } = useProjects()

  const project = projects.find((p) => p.id === projectId)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-1">
        <Link to="/projects" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Projects
        </Link>
        <span className="text-sm text-gray-300">/</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {project?.name ?? 'Project'}
      </h1>
      <div className="space-y-4">
        <AddTaskForm onAdd={addTask} defaultProjectId={projectId} showProjectPicker={false} />
        {loading ? (
          <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
        ) : (
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      </div>
    </div>
  )
}
