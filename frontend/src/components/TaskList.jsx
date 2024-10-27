import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './TaskList.css';

const TaskList = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
          <label className="task-title">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleComplete(task._id)}
              className="checkbox"
            />
            {task.title}
          </label>
          <div className="task-actions">
            <button onClick={() => deleteTask(task._id)} className="delete-button">
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
