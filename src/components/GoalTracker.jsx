import { useState, useEffect } from "react";
import { addGoal, deleteGoal, subscribeToGoals } from "../firebase/firestore";

export default function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToGoals(
      (data) => setGoals(data),
      (err) => setError(err.message)
    );
    return () => unsubscribe();
  }, []);

  async function handleAddGoal() {
    const text = goalInput.trim();
    if (!text) return;

    try {
      await addGoal({ text, createdAt: Date.now() });
      setGoalInput("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteGoal(id) {
    try {
      await deleteGoal(id);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="section goal-section">
      <h2>Goals</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <input
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          placeholder="New Goal"
        />
        <button onClick={handleAddGoal}>Add</button>
      </div>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.text}
            <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
