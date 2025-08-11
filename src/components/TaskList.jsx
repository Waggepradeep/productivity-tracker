// src/components/TaskList.jsx
import { useState, useEffect } from "react";
import { addTask, getTasks, deleteTask } from "../firebase/firestore";
import { auth } from "../firebase/config";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    if (!auth.currentUser) return;
    getTasks().then(setTasks).catch(console.error);
  }, []);

  async function handleAddTask() {
    if (!taskInput.trim()) return;
    await addTask({ text: taskInput, createdAt: Date.now() });
    setTasks(await getTasks());
    setTaskInput("");
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    setTasks(await getTasks());
  }

  return (
    <div className="section task-section">
      <h2>Tasks</h2>
      <div>
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => handleDeleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
