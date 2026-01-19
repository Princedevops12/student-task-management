import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <h3 className="task-title">{task.title}</h3>
      <div className="task-meta">
        <span className={`task-status ${task.status}`}>{task.status}</span>
        <span>{new Date(task.created_at).toLocaleDateString()}</span>
      </div>
      <div className="task-actions">
        <button
          className="toggle-btn"
          onClick={() => onToggleStatus(task.id)}
        >
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button
          className="edit-btn"
          onClick={() => onEdit(task.id, { title: prompt('Edit task:', task.title) || task.title })}
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
