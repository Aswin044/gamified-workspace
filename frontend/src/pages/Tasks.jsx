import React from "react";
import api from "../api/apiClient";

export default function Tasks() {
  const [tasks, setTasks] = React.useState([]);
  const [employees, setEmployees] = React.useState({});
  const [form, setForm] = React.useState({ title: "", difficulty: "easy", employeeId: "" });

  async function fetchAll() {
    try {
      const [tres, eres] = await Promise.all([api.get("/tasks"), api.get("/employees")]);
      setTasks(tres.data || []);
      const map = {};
      (eres.data || []).forEach(e => (map[e.id] = e));
      setEmployees(map);
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => { fetchAll(); }, []);

  async function createTask(e) {
    e.preventDefault();
    try {
      await api.post("/tasks", form);
      setForm({ title: "", difficulty: "easy", employeeId: "" });
      fetchAll();
    } catch (err) { console.error(err); }
  }

  async function completeTask(id) {
    try {
      await api.post(`/tasks/${id}/complete`);
      fetchAll();
    } catch (err) { console.error(err); }
  }

  return (
    <div className="tasks-page">
      <div className="task-form">
        <h3>Create Task</h3>
        <form onSubmit={createTask}>
          <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title:e.target.value})} required />
          <select value={form.difficulty} onChange={e => setForm({...form, difficulty:e.target.value})}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select value={form.employeeId} onChange={e => setForm({...form, employeeId:e.target.value})} required>
            <option value="">Assign to...</option>
            {Object.values(employees).map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
          </select>
          <button type="submit">Create</button>
        </form>
      </div>

      <div className="task-list">
        <h3>Tasks</h3>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={`task ${task.status}`}>
              <div>
                <strong>{task.title}</strong>
                <div className="muted">{task.difficulty} • {task.xp_reward} XP</div>
                <div className="muted">Assigned to: {task.employee ? task.employee.name : "—"}</div>
              </div>
              <div>
                {task.status !== "completed" && <button onClick={() => completeTask(task.id)}>Complete</button>}
                <span className="status">{task.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
