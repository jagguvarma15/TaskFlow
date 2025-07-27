import React, { useState } from 'react';

const TopBar = ({ className, aiStatus, onMenuClick, onAIClick, aiPanelOpen }) => {
  const [notifications] = useState([
    { id: 1, type: 'suggestion', message: 'You have 3 overdue tasks', priority: 'high' },
    { id: 2, type: 'insight', message: 'Your productivity is 15% higher today', priority: 'medium' }
  ]);

  const getAIStatusIndicator = () => {
    const statusConfig = {
      ready: { 
        color: 'bg-green-500', 
        text: 'AI Ready', 
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        )
      },
      thinking: { 
        color: 'bg-yellow-500 pulse-ai', 
        text: 'AI Thinking', 
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        )
      },
      error: { 
        color: 'bg-red-500', 
        text: 'AI Error', 
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      }
    };
    
    return statusConfig[aiStatus] || statusConfig.ready;
  };

  const statusIndicator = getAIStatusIndicator();

  return (
    <header className={`${className} bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm`}>
      {/* Left Section - Logo & Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="btn btn-ghost p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="gradient-text text-heading font-bold">TaskFlow</div>
          <div className="text-ai text-small hidden sm:block">AI-Powered Productivity</div>
        </div>
      </div>

      {/* Center Section - AI Status & Quick Actions */}
      <div className="flex items-center gap-4">
        {/* AI Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50">
          <div className={`w-2 h-2 rounded-full ${statusIndicator.color}`}></div>
          <span className="text-small font-medium text-gray-700">{statusIndicator.text}</span>
        </div>

        {/* Quick AI Prompts */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="btn btn-ghost text-small px-3 py-1 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </button>
          <button className="btn btn-ghost text-small px-3 py-1 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analyze Productivity
          </button>
          <button className="btn btn-ghost text-small px-3 py-1 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule Time
          </button>
        </div>
      </div>

      {/* Right Section - Notifications & User */}
      <div className="flex items-center gap-3">
        {/* Notification Center */}
        <div className="relative">
          <button className="btn btn-ghost p-2 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {/* AI Panel Toggle */}
        <button
          onClick={onAIClick}
          className={`btn ${aiPanelOpen ? 'btn-ai' : 'btn-ghost'} p-2`}
          aria-label="Toggle AI Assistant"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* User Avatar with Productivity Score */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block text-right">
            <div className="text-small font-medium text-gray-900">John Doe</div>
            <div className="text-micro text-gray-500">Productivity: 87%</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-small font-medium">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar; 