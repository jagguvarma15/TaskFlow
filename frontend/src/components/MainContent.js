import React from 'react';

// View Components
import Dashboard from './views/Dashboard';
import TaskBoard from './views/TaskBoard';
import Calendar from './views/Calendar';
import Analytics from './views/Analytics';
import Settings from './views/Settings';

const MainContent = ({ currentView, onAIAction, aiStatus }) => {
  const renderView = () => {
    switch(currentView) {
      case 'projects':
        return <TaskBoard onAIAction={onAIAction} aiStatus={aiStatus} />;
      case 'calendar':
        return <Calendar onAIAction={onAIAction} aiStatus={aiStatus} />;
      case 'analytics':
        return <Analytics onAIAction={onAIAction} aiStatus={aiStatus} />;
      case 'settings':
        return <Settings onAIAction={onAIAction} aiStatus={aiStatus} />;
      default:
        return <Dashboard onAIAction={onAIAction} aiStatus={aiStatus} />;
    }
  };

  const getViewTitle = () => {
    switch(currentView) {
      case 'projects': return 'Projects';
      case 'calendar': return 'Calendar';
      case 'analytics': return 'Analytics';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const getViewSubtitle = () => {
    switch(currentView) {
      case 'projects': return 'Manage and track your project progress';
      case 'calendar': return 'Schedule and organize your time';
      case 'analytics': return 'Insights into your productivity patterns';
      case 'settings': return 'Customize your TaskFlow experience';
      default: return 'Your AI-powered productivity overview';
    }
  };

  return (
    <main className="main-content">
      <div className="main-header">
        <h1 className="main-title">{getViewTitle()}</h1>
        <p className="main-subtitle">{getViewSubtitle()}</p>
      </div>
      
      <div className="main-body">
        {renderView()}
      </div>
    </main>
  );
};

export default MainContent; 