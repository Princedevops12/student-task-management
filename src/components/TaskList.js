import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, viewMode, onEditTask, onDeleteTask, onToggleStatus }) => {
  if (tasks.length === 0) {
    return <div className="no-tasks">No tasks found. Add your first task!</div>;
  }

  if (viewMode === 'table') {
    return (
      <div className="task-table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className={task.completed ? 'completed' : ''}>
                <td>{task.title}</td>
                <td>
                  <span className={`status-badge ${task.status}`}>
                    {task.status}
                  </span>
                </td>
                <td>{new Date(task.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="action-btn toggle-btn"
                    onClick={() => onToggleStatus(task.id)}
                  >
                    {task.completed ? 'Mark Pending' : 'Mark Complete'}
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEditTask(task.id, { title: prompt('Edit task:', task.title) || task.title })}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="task-cards">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
