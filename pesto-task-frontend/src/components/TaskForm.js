// src/components/TaskForm.js
import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const TaskForm = ({ onCreateTask }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = () => {
    if (newTask.title.trim() !== '') {
      onCreateTask(newTask);
      setNewTask({ title: '', description: '', status: 'To Do' });
    }
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="status">
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="description">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="button" className="btn btn-primary mt-5" onClick={handleCreateTask}>
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;
