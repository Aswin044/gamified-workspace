import React from "react";
import XPBar from "./XPBar";

export default function EmployeeCard({ employee, onClick }) {
  return (
    <div className="card" onClick={() => onClick && onClick(employee)}>
      <div className="card-left">
        <div className="avatar">{(employee.name || "").slice(0,1)}</div>
      </div>
      <div className="card-right">
        <h3>{employee.name}</h3>
        <p className="muted">{employee.role || "—"}</p>
        <XPBar xp={employee.xp} level={employee.level} />
      </div>
      <div className="card-right-stats">
        <div className="total-xp">{employee.total_xp} XP</div>
      </div>
    </div>
  );
}
