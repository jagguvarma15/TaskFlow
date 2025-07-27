import React from 'react';

const Header = ({ aiStatus, onAIAction }) => {
  const getAIStatusDisplay = () => {
    switch(aiStatus) {
      case 'thinking':
        return { text: 'AI Thinking...', color: 'var(--secondary)' };
      case 'error':
        return { text: 'AI Error', color: 'var(--error)' };
      default:
        return { text: 'AI Ready', color: 'var(--secondary)' };
    }
  };

  const statusDisplay = getAIStatusDisplay();

  return (
    <header className="header">
      <div className="header-left">
        <div>
          <h1 className="header-title">TaskFlow</h1>
          <p className="header-subtitle">AI-powered Productivity</p>
        </div>
      </div>
      
      <div className="header-right">
        <div className="ai-status">
          <div className="ai-status-dot"></div>
          <span style={{ color: statusDisplay.color }}>{statusDisplay.text}</span>
        </div>
        
        <button 
          className="btn btn-primary"
          onClick={() => onAIAction('analyze', { type: 'productivity' })}
        >
          <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Quick Analysis
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={() => onAIAction('schedule', { type: 'optimize' })}
        >
          <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Schedule Time
        </button>
      </div>
    </header>
  );
};

export default Header; 