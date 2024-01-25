// src/components/TaskList.js
import React from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';

const TaskList = ({ tasks, onUpdateStatus, onDelete }) => {
  return (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <div>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <Badge variant="info">{task.status}</Badge>
          </div>
          <div className="d-flex align-items-center mb-3">
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus(task, e.target.value)}
              className="mr-2"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <Button
              variant="danger"
              onClick={() => onDelete(task)}
            >
              Delete
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;
