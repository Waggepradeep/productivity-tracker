import { useState, useEffect } from "react";
import { addHabit, deleteHabit, subscribeToHabits, toggleHabitDone } from "../firebase/firestore";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToHabits(
      (data) => setHabits(data),
      (err) => setError(err.message)
    );
    return () => unsubscribe();
  }, []);

  async function handleAddHabit() {
    const name = newHabit.trim();
    if (!name) return;

    try {
      await addHabit(name);
      setNewHabit("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggleHabit(id, completed) {
    try {
      await toggleHabitDone(id, completed);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteHabit(id) {
    try {
      await deleteHabit(id);
    } catch (err) {
      setError(err.message);
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
            <span
              className={habit.completed ? "completed" : ""}
              onClick={() => handleToggleHabit(habit.id, habit.completed)}
              style={{ cursor: "pointer" }}
            >
              {habit.name}
            </span>
            <button onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
