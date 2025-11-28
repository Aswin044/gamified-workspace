import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import GradientLineChart from "../components/GradientLineChart";

export default function Analytics() {
  const [xpMonths, setXpMonths] = useState([]);

  useEffect(() => {
    api.get("/analytics/xp-months").then((res) => {
      setXpMonths(res.data.months);
    });
  }, []);

  const labels = xpMonths.map((m) => m.month);
  const values = xpMonths.map((m) => m.total_xp);

  return (
    <div className="analytics">
      <h2>XP Analytics</h2>

      <div className="chart-card">
        <h3>XP Progress Over The Year</h3>
        <GradientLineChart labels={labels} values={values} />
      </div>
    </div>
  );
}
