// src/components/TaskForm.js
import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import UserProfile from './ProfileDetails';

const TaskForm = ({ onCreateTask }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
  const [validationErrors, setValidationErrors] = useState({ title: false, description: false });
  const [userDetails, setUserDetails] = useState({
    name: 'Yogesh Abnave',
    email: 'iamyogeshabnave@gmail.com',
    address: 'Flat No-11, Triveni Nagar S.No-173/B, Bhekrai Nagar, Phursungi, Tal-Haveli, Dist-Pune.'
  });
  
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
    // Clear validation errors when input changes
    setValidationErrors({ ...validationErrors, [e.target.name]: false });
  };

  const handleCreateTask = () => {
    const errors = {};

    if (newTask.title.trim() === '') {
      errors.title = true;
    }

    if (newTask.description.trim() === '') {
      errors.description = true;
    }

    if (Object.keys(errors).length === 0) {
      onCreateTask(newTask);
      setNewTask({ title: '', description: '', status: 'To Do' });
    } else {
      // Set validation errors
      setValidationErrors(errors);
    }
  };
  const handleUpdateUser = (updatedUser) => {
    setUserDetails(updatedUser);
  };

  return (
    <div>
  <div className="header-bar">
        <UserProfile userDetails={userDetails} onUpdateUser={handleUpdateUser} />
      </div>
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
            {validationErrors.title && (
              <Alert variant="danger" className="mt-2 custom-alert">
                <strong>Error:</strong> Title is required.
              </Alert>
            )}
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
          required
        />
        {validationErrors.description && (
          <Alert variant="danger" className="mt-2 custom-alert">
            <strong>Error:</strong> Description is required.
          </Alert>
        )}
      </Form.Group>

      <Button
        variant="primary"
        type="button"
        className="btn btn-primary mt-3"
        onClick={handleCreateTask}
      >
        Add Task
      </Button>
    </Form>
    </div>
  );
};

export default TaskForm;
