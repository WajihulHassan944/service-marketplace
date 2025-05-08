import React from 'react';
import './ProjectTimeline.css';

const steps = [
  { id: 1, title: 'Order placed', time: '2 minutes ago', completed: true },
  { id: 2, title: 'Max submitted the requirements', time: '1 minute ago', completed: true },
  { id: 3, title: 'Jodie completes the work', current: true, subtasks: [
    'Design brief',
    'Draft slides',
    'Full presentation first pass',
    'Final presentation deliverable'
  ]},
  { id: 4, title: 'Max reviews and approves the work' },
  { id: 5, title: 'Project complete' },
];

export default function ProjectTimeline() {
  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Project Timeline</h2>
      <ol className="timeline-list">
        {steps.map((step, index) => (
          <li key={index} className={`timeline-item ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
            <div className="timeline-icon">
              {step.completed ? '✓' : step.current ? '●' : ''}
            </div>
            <div className="timeline-content">
              <h3>{step.title}</h3>
              {step.time && <p className="timeline-time">{step.time}</p>}

              {step.current && step.subtasks && (
                <div className="subtasks">
                  {step.subtasks.map((task, i) => (
                    <label key={i} className="subtask-label">
                      <input type="checkbox" />
                      {task}
                    </label>
                  ))}
                  <p className="timeline-due">Due in 9 days 23 hours</p>
                  <button className="submit-btn">Submit Work</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
