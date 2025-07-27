import React from 'react';

const Analytics = ({ onAIAction, aiStatus }) => {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Productivity Analytics</h3>
        </div>
        <div className="card-body">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Advanced Analytics</h3>
              <p className="text-neutral-500 mb-4">AI-powered insights and charts are being developed</p>
              <button 
                className="btn btn-primary"
                onClick={() => onAIAction('generate_report', { source: 'analytics' })}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 