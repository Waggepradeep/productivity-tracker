import { useState, useEffect } from "react";
import { addGoal, deleteGoal, subscribeToGoals } from "../firebase/firestore";

function mapTrackerError(err) {
  if (err?.message === "Not authenticated") return "Please log in again.";
  if (err?.message?.includes("not configured")) return "App configuration is incomplete.";
  return "Something went wrong. Please try again.";
}

export default function GoalTracker({ onCountChange }) {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToGoals(
      (data) => {
        setGoals(data);
        onCountChange?.(data.length);
      },
      (err) => setError(mapTrackerError(err))
    );
    return () => unsubscribe();
  }, [onCountChange]);

  async function handleAddGoal() {
    const text = goalInput.trim();
    if (!text) return;

    try {
      await addGoal({ text });
      setGoalInput("");
    } catch (err) {
      setError(mapTrackerError(err));
    }
  }

  async function handleDeleteGoal(id) {
    try {
      await deleteGoal(id);
    } catch (err) {
      setError(mapTrackerError(err));
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
