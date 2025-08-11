// import { useEffect, useState } from "react";
// import { addTask, getTasks, deleteTask } from "../firebase/firestore";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   async function fetchTasks() {
//     const allTasks = await getTasks();
//     setTasks(allTasks);
//   }

//   async function handleAdd() {
//     if (!input.trim()) return;
//     await addTask({ text: input, createdAt: new Date() });
//     setInput("");
//     fetchTasks();
//   }

//   async function handleDelete(id) {
//     await deleteTask(id);
//     fetchTasks();
//   }

//   return (
//     <div>
//       <h1>Tasks</h1>
//       <input value={input} onChange={(e) => setInput(e.target.value)} />
//       <button onClick={handleAdd}>Add</button>

//       <ul>
//         {tasks.map((t) => (
//           <li key={t.id}>
//             {t.text} <button onClick={() => handleDelete(t.id)}>❌</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import GoalTracker from "../components/GoalTracker";
import HabitTracker from "../components/HabitTracker";
import StatsChart from "../components/StatsChart";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard-content">
        <div className="tracker-row">
          <TaskList />
          <GoalTracker />
          <HabitTracker />
        </div>

        <div className="stats-section">
          <StatsChart />
        </div>
      </div>
    </div>
  );
}


