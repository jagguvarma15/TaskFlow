import React from 'react';

const Sidebar = ({ currentView, onViewChange }) => {  
  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      badge: '3',
      icon: (
        <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      )
    },
    {
      id: 'projects',
      name: 'Projects',
      badge: '2',
      icon: (
        <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      id: 'calendar',
      name: 'Calendar',
      badge: '1',
      icon: (
        <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: (
        <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: (
        <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const aiSuggestions = [
    { text: 'Review overdue items', priority: 'high' },
    { text: 'Plan tomorrow\'s tasks', priority: 'medium' },
    { text: 'Analyze productivity trends', priority: 'low' }
  ];

  const todaysMetrics = {
    tasksCompleted: 7,
    totalTasks: 10,
    focusTime: '2.5 hrs',
    productivity: '87%'
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Navigation</h3>
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onViewChange(item.id);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </a>
          ))}
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">AI Insights</h3>
          <div className="card">
            <div className="card-body">
              <div className="text-xs text-neutral-500 font-medium mb-3">Today's Overview</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tasks</span>
                  <span className="font-semibold">{todaysMetrics.tasksCompleted}/{todaysMetrics.totalTasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Focus Time</span>
                  <span className="font-semibold">{todaysMetrics.focusTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Productivity</span>
                  <span className="font-semibold text-secondary">{todaysMetrics.productivity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-section">
          <h3 className="nav-section-title">Quick Actions</h3>
          <button className="btn btn-primary w-full">
            <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Get AI Insights
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar; 