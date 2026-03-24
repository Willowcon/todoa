import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomTabs from './BottomTabs'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomTabs />
    </div>
  )
}
