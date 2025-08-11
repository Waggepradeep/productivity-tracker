import { useState, useEffect } from "react";
import { addHabit, getHabits, toggleHabitDone, deleteHabit } from "../firebase/firestore";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddHabit() {
    if (!newHabit.trim()) return;
    await addHabit(newHabit.trim());
    setNewHabit("");
    fetchHabits();
  }

  async function handleToggleHabit(id, completed) {
    await toggleHabitDone(id, completed);
    fetchHabits();
  }

  async function handleDeleteHabit(id) {
    await deleteHabit(id);
    fetchHabits();
  }

  return (
    <div className="section habit-section">
      <h2>Habit Tracker</h2>
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
            <button onClick={() => handleDeleteHabit(habit.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
