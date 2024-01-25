// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://node-express-api-bd790.firebaseapp.com/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      const response = await axios.post('https://node-express-api-bd790.firebaseapp.com/tasks', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  const handleUpdateStatus = async (task, newStatus) => {
    try {
      const response = await axios.patch(`https://node-express-api-bd790.firebaseapp.com/tasks/${task.id}`, {
        status: newStatus,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await axios.delete(`https://node-express-api-bd790.firebaseapp.com/tasks/${task.id}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h1>Task Management App</h1>
          <TaskForm onCreateTask={handleCreateTask} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TaskList tasks={tasks} onUpdateStatus={handleUpdateStatus} onDelete={handleDeleteTask} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
