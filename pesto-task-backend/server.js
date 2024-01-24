// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const { Task } = require('./taskModel');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

connectToDatabase();

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ error: 'Title and status are required' });
  }

  try {
    const newTask = await Task.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task status' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
