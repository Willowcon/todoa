import { NavLink } from 'react-router-dom'

const tabClass = ({ isActive }) =>
  `flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
    isActive ? 'text-indigo-600' : 'text-gray-400'
  }`

export default function BottomTabs() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] z-50">
      <NavLink to="/" end className={tabClass}>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-17.5 0V6.75A2.25 2.25 0 014.5 4.5h15A2.25 2.25 0 0121.75 6.75v6.75m-19.5 0v4.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25v-4.5" />
        </svg>
        Inbox
      </NavLink>
      <NavLink to="/today" className={tabClass}>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12V12.75z" />
        </svg>
        Today
      </NavLink>
      <NavLink to="/projects" className={tabClass}>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0A2.25 2.25 0 004.5 15h15a2.25 2.25 0 002.25-2.25m-19.5 0v4.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25v-4.5m-19.5-6V8.25A2.25 2.25 0 014.5 6h3.879a1.5 1.5 0 011.06.44l1.122 1.12a1.5 1.5 0 001.06.44H19.5a2.25 2.25 0 012.25 2.25v1.5" />
        </svg>
        Projects
      </NavLink>
    </nav>
  )
}
