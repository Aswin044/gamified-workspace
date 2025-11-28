import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import GradientLineChart from "../components/GradientLineChart";

export default function Analytics() {
  const [data, setData] = useState({
    tasksToday: 0,
    xpWeek: 0
  });

  const [xpMonths, setXpMonths] = useState([]);

  useEffect(() => {
    // Fetch XP per month (for gradient chart)
    api.get("/analytics/xp-months").then((res) => {
      setXpMonths(res.data.months);
    });

    // Fetch summary data (tasks today, xp week)
    api.get("/analytics").then((res) => {
      setData({
        tasksToday: res.data.tasksToday,
        xpWeek: res.data.xpWeek
      });
    });
  }, []);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="analytics">
      <h2>Analytics Dashboard</h2>

      {/* Stats Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tasks Completed Today</h3>
          <p className="big-number">{data.tasksToday}</p>
        </div>

        <div className="stat-card">
          <h3>XP Earned This Week</h3>
          <p className="big-number">{data.xpWeek}</p>
        </div>
      </div>

      {/* Gradient Line Chart */}
      <div className="chart-card">
        <GradientLineChart labels={monthNames} values={xpMonths} />
      </div>
    </div>
  );
}
