import React, { useState } from 'react';

const AIChatPanel = ({ status, onAction }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your TaskFlow AI assistant. I can help you create tasks, analyze productivity, and optimize your workflow. What would you like to work on?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickActions = [
    { 
      label: 'Create Task', 
      action: 'create_task',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      label: 'Analyze Day', 
      action: 'analyze_day',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');

    // Trigger AI action
    onAction('chat', { message });

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: `I understand you want to ${message}. Let me help you with that. Based on your current workflow, I recommend breaking this down into smaller, manageable tasks.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    onAction(action, { source: 'quick_action' });
  };

  return (
    <aside className="ai-panel">
      <div className="ai-panel-header">
        <div>
          <h3 className="ai-panel-title">TaskFlow AI</h3>
          <p className="text-xs text-neutral-500">Your productivity partner</p>
        </div>
        <div className="ai-status">
          <div className="ai-status-dot"></div>
          <span className="text-xs">{status === 'thinking' ? 'Thinking...' : 'Ready'}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs rounded-lg p-3 ${
                msg.type === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-100 text-neutral-700'
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.type === 'user' ? 'text-blue-100' : 'text-neutral-400'
                }`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-neutral-200">
          <p className="text-xs font-medium text-neutral-500 mb-2">Quick Actions</p>
          <div className="flex gap-2">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                className="btn btn-secondary text-xs px-3 py-2"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || status === 'thinking'}
              className="btn btn-primary px-3 py-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AIChatPanel; 