import React, { useState } from 'react';
import './App.css';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AIChatPanel from './components/AIChatPanel';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [aiStatus, setAiStatus] = useState('ready'); // ready, thinking, error

  const handleAIAction = (action, context) => {
    setAiStatus('thinking');
    // Simulate AI processing
    setTimeout(() => {
      setAiStatus('ready');
      console.log('AI Action:', action, context);
    }, 2000);
  };

  return (
    <div className="app-layout">
      {/* Clean Header */}
      <Header 
        aiStatus={aiStatus}
        onAIAction={handleAIAction}
      />

      {/* Clean Sidebar Navigation */}
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content Area */}
      <MainContent 
        currentView={currentView}
        onAIAction={handleAIAction}
        aiStatus={aiStatus}
      />

      {/* AI Assistant Panel */}
      <AIChatPanel 
        status={aiStatus}
        onAction={handleAIAction}
      />
    </div>
  );
}

export default App; 