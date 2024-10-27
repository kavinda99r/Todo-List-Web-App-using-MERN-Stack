import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const { data } = await axios.get("http://localhost:5000/api/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a task
  const addTask = async (title) => {
    const { data } = await axios.post("http://localhost:5000/api/tasks", {
      title,
    });
    setTasks([...tasks, data]);
    toast.success("Task added successfully");
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    const { data } = await axios.put(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.map((task) => (task._id === id ? data : task)));
    toast.info("Task updated");
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
    toast.error("Task deleted");
  };

  // Count total and completed tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className="App">
      <h1>Todo List</h1>
      {/* Display task counts */}
      <div className="task-counts">
        <p className="total-task">Total Tasks: {totalTasks}</p>
        <p className="completed-task">Completed Tasks: {completedTasks}</p>
      </div>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
