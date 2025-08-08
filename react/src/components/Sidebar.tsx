import { Link, useLocation } from 'react-router-dom'
import '../css/App.css'

const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/tracking', label: 'Invoice', icon: '📈' },
    { path: '/analysis', label: 'Receipt', icon: '📊' },
    { path: '/school', label: 'Bank Statement', icon: '🎓' },
    { path: '/trading', label: 'Payroll', icon: '💹' },
    { path: '/course', label: 'Inventory', icon: '📚' },
    { path: '/report', label: 'Financial Report', icon: '📝' },
    { path: '/qa', label: 'Q&A', icon: '❓' },
    { path: '/announcements', label: 'Announcements', icon: '📢' },
]

export default function Sidebar() {
    const location = useLocation()
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span className="sidebar-logo-main">RAG</span>
                <span className="sidebar-logo-sub">Accounting</span>
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