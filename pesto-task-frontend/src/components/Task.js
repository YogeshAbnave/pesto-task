// src/Task.js
import React from 'react';

const Task = ({ task, onUpdateStatus, onDelete }) => {
  return (
    <div>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>
        <select value={task.status} onChange={(e) => onUpdateStatus(task, e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button onClick={() => onDelete(task)}>Delete</button>
    </div>
  );
};

export default Task;
