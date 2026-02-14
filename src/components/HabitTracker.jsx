import { useState, useEffect } from "react";
import { addHabit, deleteHabit, subscribeToHabits, toggleHabitDone } from "../firebase/firestore";

function mapTrackerError(err) {
  if (err?.message === "Not authenticated") return "Please log in again.";
  if (err?.message?.includes("not configured")) return "App configuration is incomplete.";
  return "Something went wrong. Please try again.";
}

export default function HabitTracker({ onCountChange }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToHabits(
      (data) => {
        setHabits(data);
        onCountChange?.(data.length);
      },
      (err) => setError(mapTrackerError(err))
    );
    return () => unsubscribe();
  }, [onCountChange]);

  async function handleAddHabit() {
    const name = newHabit.trim();
    if (!name) return;

    try {
      await addHabit(name);
      setNewHabit("");
    } catch (err) {
      setError(mapTrackerError(err));
    }
  }

  async function handleToggleHabit(id, completed) {
    try {
      await toggleHabitDone(id, completed);
    } catch (err) {
      setError(mapTrackerError(err));
    }
  }

  async function handleDeleteHabit(id) {
    try {
      await deleteHabit(id);
    } catch (err) {
      setError(mapTrackerError(err));
    }
  }

  return (
    <div className="section habit-section">
      <h2>Habit Tracker</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter new habit..."
        />
        <button onClick={handleAddHabit}>Add</button>
      </div>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <button
              type="button"
              className={habit.completed ? "completed habit-toggle" : "habit-toggle"}
              aria-pressed={habit.completed}
              onClick={() => handleToggleHabit(habit.id, habit.completed)}
            >
              {habit.name}
            </button>
            <button onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
