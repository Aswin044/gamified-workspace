import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { useRef, useEffect } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function GradientLineChart({ labels, values }) {
  const chartRef = useRef();

  const data = {
    labels,
    datasets: [
      {
        label: "XP Earned",
        data: values,
        fill: true,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const gradient = chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(79,70,229,0.5)");
          gradient.addColorStop(1, "rgba(79,70,229,0)");
          return gradient;
        },
        borderColor: "#4f46e5",
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.4,
      }
    ]
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line ref={chartRef} data={data} />
    </div>
  );
}
