import React from "react";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";

export default function App() {
  const [page, setPage] = React.useState("dashboard");

  return (
    <div className="app">
      <nav className="topnav">
        <h1>Gamified Workspace</h1>
        <div>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("tasks")}>Tasks</button>
          <button onClick={() => setPage("analytics")}>Analytics</button>
        </div>
      </nav>

      <main className="container">
        {page === "dashboard" && <Dashboard />}
        {page === "tasks" && <Tasks />}
        {page === "analytics" && <Analytics />}

      </main>
    </div>
  );
}
