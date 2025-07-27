import React from 'react';

const TaskBoard = ({ onAIAction, aiStatus }) => {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Project Board</h3>
        </div>
        <div className="card-body">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Coming Soon</h3>
              <p className="text-neutral-500 mb-4">Project management boards are being developed</p>
              <button 
                className="btn btn-primary"
                onClick={() => onAIAction('create_project', { source: 'taskboard' })}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard; 