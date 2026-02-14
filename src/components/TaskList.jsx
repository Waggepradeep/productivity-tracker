import { useState, useEffect } from "react";
import { addTask, deleteTask, subscribeToTasks } from "../firebase/firestore";

function mapTrackerError(err) {
  if (err?.message === "Not authenticated") return "Please log in again.";
  if (err?.message?.includes("not configured")) return "App configuration is incomplete.";
  return "Something went wrong. Please try again.";
}

export default function TaskList({ onCountChange }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToTasks(
      (data) => {
        setTasks(data);
        onCountChange?.(data.length);
      },
      (err) => setError(mapTrackerError(err))
    );
    return () => unsubscribe();
  }, [onCountChange]);

  async function handleAddTask() {
    const text = taskInput.trim();
    if (!text) return;

    try {
      await addTask({ text });
      setTaskInput("");
    } catch (err) {
      setError(mapTrackerError(err));
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
    } catch (err) {
      setError(mapTrackerError(err));
    }
  }

  return (
    <div className="section task-section">
      <h2>Tasks</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
