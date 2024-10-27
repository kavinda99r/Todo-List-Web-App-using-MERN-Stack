const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST create a new task
router.post('/', async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title });
  await task.save();
  res.status(201).json(task);
});

// PUT mark task as completed
router.put('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (task) {
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;
