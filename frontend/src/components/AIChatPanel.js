import React, { useState, useRef, useEffect } from 'react';

const AIChatPanel = ({ status, onAction }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your TaskFlow AI assistant. I can help you create tasks, analyze productivity, and optimize your workflow. What would you like to work on?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message = inputValue) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I understand you want to ${message.toLowerCase()}. Let me help you with that. Based on your current workflow, I recommend breaking this down into smaller, manageable tasks.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      'create_task': 'Create a new task',
      'analyze_day': 'Analyze my productivity for today',
      'schedule_time': 'Help me schedule focused work time',
      'review_goals': 'Review my weekly goals'
    };
    
    handleSendMessage(actionMessages[action] || action);
    onAction(action, { source: 'ai_chat' });
  };

  const quickActions = [
    { id: 'create_task', label: 'Create Task', icon: 'plus', color: 'blue' },
    { id: 'analyze_day', label: 'Analyze Day', icon: 'chart', color: 'green' },
    { id: 'schedule_time', label: 'Schedule Time', icon: 'clock', color: 'purple' },
    { id: 'review_goals', label: 'Review Goals', icon: 'target', color: 'orange' }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = () => {
    switch(status) {
      case 'thinking':
        return (
          <div className="ai-thinking">
            <div className="thinking-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        );
      case 'ready':
        return <div className="status-indicator ready"></div>;
      case 'error':
        return <div className="status-indicator error"></div>;
      default:
        return <div className="status-indicator"></div>;
    }
  };

  return (
    <div className="ai-chat-panel">
      {/* Header */}
      <div className="chat-header">
        <div className="ai-avatar">
          <svg className="ai-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ai-info">
          <h3 className="ai-title">TaskFlow AI</h3>
          <p className="ai-subtitle">Your productivity partner</p>
        </div>
        <div className="status-container">
          {getStatusIcon()}
          <span className="status-text">{status}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-content">
                <p>{message.content}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai typing">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h4 className="quick-actions-title">Quick Actions</h4>
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className={`quick-action-btn ${action.color}`}
              onClick={() => handleQuickAction(action.id)}
            >
              <div className="action-icon">
                {action.icon === 'plus' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                  </svg>
                )}
                {action.icon === 'chart' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                )}
                {action.icon === 'clock' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                )}
                {action.icon === 'target' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                )}
              </div>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={status === 'thinking'}
          />
          <button
            className="send-button"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || status === 'thinking'}
          >
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel; 