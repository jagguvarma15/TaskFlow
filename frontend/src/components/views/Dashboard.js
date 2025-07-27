import React, { useState } from 'react';

const Dashboard = ({ onAIAction, aiStatus }) => {
  const [insights] = useState({
    productivityScore: 87,
    focusTime: 2.5,
    completionRate: 70,
    trend: 'up'
  });

  const upcomingDeadlines = [
    { id: 1, title: 'Design Review', daysLeft: 2, priority: 'high' },
    { id: 2, title: 'Report Draft', daysLeft: 5, priority: 'medium' },
    { id: 3, title: 'Team Meeting Prep', daysLeft: 1, priority: 'low' }
  ];

  const aiRecommendations = [
    {
      id: 1,
      type: 'action',
      title: 'Optimize Morning Routine',
      description: 'Your peak productivity is 9-11 AM. Schedule important tasks then.',
      impact: 'high'
    },
    {
      id: 2,
      type: 'insight',
      title: 'Take More Breaks',
      description: 'You work 3.2 hours without breaks. Consider 15-min breaks every 90 mins.',
      impact: 'medium'
    }
  ];

  const todaysMetrics = {
    tasksCompleted: 7,
    totalTasks: 10,
    focusTime: '2.5 hrs',
    productivity: '87%'
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">Tasks Today</h3>
            <p className="text-2xl font-bold text-neutral-900">
              {todaysMetrics.tasksCompleted}/{todaysMetrics.totalTasks}
            </p>
            <p className="text-xs text-secondary">↗ 15% better</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">Focus Time</h3>
            <p className="text-2xl font-bold text-neutral-900">{todaysMetrics.focusTime}</p>
            <p className="text-xs text-secondary">↗ +30 mins</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">Productivity</h3>
            <p className="text-2xl font-bold text-neutral-900">{todaysMetrics.productivity}</p>
            <p className="text-xs text-secondary">↗ Peak performance</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">AI Status</h3>
            <p className="text-2xl font-bold text-primary">Ready</p>
            <p className="text-xs text-neutral-500">3 insights available</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">AI Recommendations</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    rec.impact === 'high' ? 'bg-secondary' : 'bg-primary'
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-900 mb-1">{rec.title}</h4>
                    <p className="text-sm text-neutral-600">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="btn btn-primary w-full mt-4"
              onClick={() => onAIAction('get_more_insights', { source: 'dashboard' })}
            >
              Get More AI Insights
            </button>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Upcoming Deadlines</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">{deadline.title}</h4>
                    <p className="text-sm text-neutral-500">{deadline.daysLeft} days left</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    deadline.priority === 'high' ? 'bg-red-100 text-red-700' :
                    deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {deadline.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              className="btn btn-secondary flex items-center gap-2"
              onClick={() => onAIAction('create_task', { source: 'dashboard' })}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Task
            </button>
            
            <button 
              className="btn btn-secondary flex items-center gap-2"
              onClick={() => onAIAction('analyze_day', { source: 'dashboard' })}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Analyze Day
            </button>
            
            <button 
              className="btn btn-secondary flex items-center gap-2"
              onClick={() => onAIAction('schedule_focus', { source: 'dashboard' })}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Schedule Focus
            </button>
            
            <button 
              className="btn btn-secondary flex items-center gap-2"
              onClick={() => onAIAction('optimize_workflow', { source: 'dashboard' })}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Optimize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 