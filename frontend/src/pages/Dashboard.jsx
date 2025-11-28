import React from "react";
import api from "../api/apiClient";
import EmployeeCard from "../components/EmployeeCard";
import Leaderboard from "../components/Leaderboard";

export default function Dashboard() {
  const [employees, setEmployees] = React.useState([]);
  const [leaderboard, setLeaderboard] = React.useState([]);

  async function fetchData() {
    try {
      const [empRes, lbRes] = await Promise.all([api.get("/employees"), api.get("/employees/leaderboard")]);
      setEmployees(empRes.data || []);
      setLeaderboard(lbRes.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    fetchData();
    const t = setInterval(fetchData, 5000); // auto refresh small interval
    return () => clearInterval(t);
  }, []);

  return (
    <div className="dashboard">
      <div className="left-col">
        <h2>Employees</h2>
        <div className="cards">
          {employees.map(emp => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      </div>

      <div className="right-col">
        <Leaderboard list={leaderboard} />
      </div>
    </div>
  );
}
