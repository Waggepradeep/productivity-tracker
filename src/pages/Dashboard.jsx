import { useState } from "react";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import GoalTracker from "../components/GoalTracker";
import HabitTracker from "../components/HabitTracker";
import StatsChart from "../components/StatsChart";

export default function Dashboard() {
  const [stats, setStats] = useState({ tasks: 0, goals: 0, habits: 0 });

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard-content">
        <div className="tracker-row">
          <TaskList onCountChange={(count) => setStats((prev) => ({ ...prev, tasks: count }))} />
          <GoalTracker onCountChange={(count) => setStats((prev) => ({ ...prev, goals: count }))} />
          <HabitTracker onCountChange={(count) => setStats((prev) => ({ ...prev, habits: count }))} />
        </div>

        <div className="stats-section">
          <StatsChart stats={stats} />
        </div>
      </div>
    </div>
  );
}
