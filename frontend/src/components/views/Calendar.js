import React from 'react';

const Calendar = ({ onAIAction, aiStatus }) => {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Calendar View</h3>
        </div>
        <div className="card-body">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Calendar Integration</h3>
              <p className="text-neutral-500 mb-4">Smart scheduling features are being developed</p>
              <button 
                className="btn btn-primary"
                onClick={() => onAIAction('schedule_time', { source: 'calendar' })}
              >
                Schedule Time Block
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 