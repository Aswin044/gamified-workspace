import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Filler, Tooltip, Legend);

export default function GradientLineChart({ labels, values }) {
  const chartRef = useRef(null);

  const data = {
    labels,
    datasets: [
      {
        label: "XP Earned",
        data: values,
        fill: true,
        tension: 0.4,
        borderColor: "#6366f1",
        pointRadius: 0,
        borderWidth: 3,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.5)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0.05)");
          return gradient;
        }
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e1e2f",
        titleColor: "#fff",
        bodyColor: "#c0c6ff",
        borderColor: "#6366f1",
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: { color: "#8b92b7" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#8b92b7" },
        grid: { color: "#1f2337" }
      }
    }
  };

  return (
    <div style={{ padding: "20px", background: "rgba(255,255,255,0.05)", borderRadius: "12px" }}>
      <h3 style={{ marginBottom: "10px" }}>XP Earned Per Month</h3>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
