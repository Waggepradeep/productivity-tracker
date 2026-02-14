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
