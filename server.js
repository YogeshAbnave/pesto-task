// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const path = require('path');
// const { Task } = require('./taskModel');
const tasksCollection = require('./config');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

connectToDatabase();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, this is your API!' });
});


app.post('/tasks', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({ error: 'Title and status are required' });
    }

    const newTaskRef = tasksCollection.doc(); // Automatically generates a unique ID
    const taskId = newTaskRef.id;

    const newTaskData = {
      id: taskId,
      title,
      description,
      status,
    };

    await newTaskRef.set(newTaskData);

    res.status(201).json(newTaskData);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Read all tasks
app.get('/tasks', async (req, res) => {
  try {
    const snapshot = await tasksCollection.get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Read a single task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskSnapshot = await tasksCollection.doc(taskId).get();

    if (!taskSnapshot.exists()) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const taskData = { id: taskSnapshot.id, ...taskSnapshot.data() };
    res.json(taskData);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Error fetching task' });
  }
});

// Update a task by ID
app.patch('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    // Check if at least one field is provided
    if (!title && !description && !status) {
      return res.status(400).json({ error: 'At least one field (title, description, or status) is required for update' });
    }

    // Create an object with only provided fields
    const updatedTaskData = {};
    if (title !== undefined) updatedTaskData.title = title;
    if (description !== undefined) updatedTaskData.description = description;
    if (status !== undefined) updatedTaskData.status = status;

    // Update the document with the provided fields
    await tasksCollection.doc(taskId).set(updatedTaskData, { merge: true });

    // Fetch the updated task data from Firestore
    const updatedTaskSnapshot = await tasksCollection.doc(taskId).get();
    const tasks = { id: updatedTaskSnapshot.id, ...updatedTaskSnapshot.data() };

    res.json({ id: updatedTaskSnapshot.id, ...updatedTaskSnapshot.data() });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});



// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    await tasksCollection.doc(taskId).delete();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
