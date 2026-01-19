import React, { useState } from 'react';
import './AddTaskForm.css';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        completed: false,
        status: 'pending',
        userId: 1, // Default user ID
        created_at: new Date().toISOString()
      });
      setTitle('');
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="task-input"
          required
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
