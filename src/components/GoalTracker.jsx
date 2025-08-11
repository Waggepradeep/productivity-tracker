// src/components/GoalTracker.jsx
import { useState, useEffect } from "react";
import { addGoal, getGoals, deleteGoal } from "../firebase/firestore";
import { auth } from "../firebase/config";

export default function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState("");

  useEffect(() => {
    if (!auth.currentUser) return;
    getGoals().then(setGoals).catch(console.error);
  }, []);

  async function handleAddGoal() {
    if (!goalInput.trim()) return;
    await addGoal({ text: goalInput, createdAt: Date.now() });
    setGoals(await getGoals());
    setGoalInput("");
  }

  async function handleDeleteGoal(id) {
    await deleteGoal(id);
    setGoals(await getGoals());
  }

  return (
    <div className="section goal-section">
      <h2>Goals</h2>
      <div>
        <input
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          placeholder="New Goal"
        />
        <button onClick={handleAddGoal}>Add</button>
      </div>
      <ul>
        {goals.map((g) => (
          <li key={g.id}>
            {g.text}
            <button onClick={() => handleDeleteGoal(g.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
