import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import InboxView from './views/InboxView'
import TodayView from './views/TodayView'
import ProjectsView from './views/ProjectsView'
import ProjectDetailView from './views/ProjectDetailView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <InboxView /> },
      { path: 'today', element: <TodayView /> },
      { path: 'projects', element: <ProjectsView /> },
      { path: 'projects/:projectId', element: <ProjectDetailView /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
