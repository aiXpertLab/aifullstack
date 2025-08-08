import { Link, useLocation } from 'react-router-dom'
import '../css/App.css'

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/tracking', label: 'Tracking', icon: '📈' },
  { path: '/analysis', label: 'Analysis', icon: '📊' },
  { path: '/school', label: 'School', icon: '🎓' },
  { path: '/report', label: 'Report', icon: '📝' },
  { path: '/qa', label: 'Q&A', icon: '❓' },
  { path: '/trading', label: 'Trading', icon: '💹' },
  { path: '/course', label: 'Course', icon: '📚' },
  { path: '/announcements', label: 'Announcements', icon: '📢' },
]

export default function Sidebar() {
  const location = useLocation()
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-main">MEI+TOU</span>
        <span className="sidebar-logo-sub">美+投</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'sidebar-link active' : 'sidebar-link'}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
} 