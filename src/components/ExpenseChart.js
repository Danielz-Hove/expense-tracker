import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components for Bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ExpenseChart = () => {
  const data = {
    labels: ["Rent", "Food", "Utilities", "Entertainment", "Other"],
    datasets: [
      {
        label: "Expenses ($)",
        data: [500, 300, 200, 150, 100],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Ensure the aspect ratio is maintained
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw}`; // Display value with a dollar sign
          },
        },
      },
    },
  };

  return (
   <div className="w-full h-[500px] overflow-hidden px-4 sm:px-8 lg:px-12">
      <h2 className="text-center text-xl text-blue-700 font-bold mb-4">Expense Breakdown</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
