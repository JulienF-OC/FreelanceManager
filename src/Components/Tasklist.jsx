import React, { useState } from 'react';
import './TaskList.css';

export default function TaskList({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const toggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), label: newTask.trim(), done: false }]);
    setNewTask('');
  };

  return (
    <div className="task-list-wrap fade-up fade-up-4">
      <div className="card-header">
        <h2>Tâches à Faire</h2>
        <span className="task-count">{tasks.filter(t => !t.done).length} restantes</span>
      </div>
      <div className="task-list">
        {tasks.map((t) => (
          <div
            key={t.id}
            className={`task-item${t.done ? ' done' : ''}`}
            onClick={() => toggle(t.id)}
          >
            <div className={`task-check${t.done ? ' checked' : ''}`}>
              {t.done && <span>✓</span>}
            </div>
            <span className="task-label">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="task-add">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Ajouter une tâche..."
          className="task-input"
        />
        <button className="task-add-btn" onClick={addTask}>+</button>
      </div>
    </div>
  );
}