import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      // Transform API data to match our structure
      const transformedTasks = data.slice(0, 10).map(task => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        status: task.completed ? 'completed' : 'pending',
        userId: task.userId,
        created_at: new Date().toISOString() // Dummy date since API doesn't provide
      }));
      setTasks(transformedTasks);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now() // Simple ID generation
    };
    setTasks(prevTasks => [task, ...prevTasks]);
  };

  const editTask = (id, updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: task.completed ? 'pending' : 'completed'
            }
          : task
      )
    );
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Student Task Manager</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        <AddTaskForm onAddTask={addTask} />

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
          >
            Card View
          </button>
          <button
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table View
          </button>
        </div>

        <TaskList
          tasks={tasks}
          viewMode={viewMode}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onToggleStatus={toggleTaskStatus}
        />
      </div>
    </div>
  );
};

export default Dashboard;
