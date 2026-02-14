import { useState, useEffect } from "react";
import { addTask, deleteTask, subscribeToTasks } from "../firebase/firestore";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToTasks(
      (data) => setTasks(data),
      (err) => setError(err.message)
    );
    return () => unsubscribe();
  }, []);

  async function handleAddTask() {
    const text = taskInput.trim();
    if (!text) return;

    try {
      await addTask({ text, createdAt: Date.now() });
      setTaskInput("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
    } catch (err) {
      setError(err.message);
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
