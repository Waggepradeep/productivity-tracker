import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { subscribeToGoals, subscribeToHabits, subscribeToTasks } from "../firebase/firestore";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsChart() {
  const [stats, setStats] = useState({ tasks: 0, goals: 0, habits: 0 });

  useEffect(() => {
    const unsubs = [
      subscribeToTasks((tasks) => setStats((prev) => ({ ...prev, tasks: tasks.length })), console.error),
      subscribeToGoals((goals) => setStats((prev) => ({ ...prev, goals: goals.length })), console.error),
      subscribeToHabits((habits) => setStats((prev) => ({ ...prev, habits: habits.length })), console.error)
    ];

    return () => {
      unsubs.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const data = {
    labels: ["Statistics"],
    datasets: [
      {
        label: "Tasks",
        data: [stats.tasks],
        backgroundColor: "#36A2EB"
      },
      {
        label: "Goals",
        data: [stats.goals],
        backgroundColor: "#FF6384"
      },
      {
        label: "Habits",
        data: [stats.habits],
        backgroundColor: "#FFCE56"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Your Activity Stats" }
    }
  };

  return <Bar data={data} options={options} />;
}
