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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsChart({ stats }) {
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
