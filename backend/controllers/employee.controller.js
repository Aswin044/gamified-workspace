const Employee = require("../models/employee");
const Task = require("../models/Task");

async function listEmployees(req, res) {
  try {
    const employees = await Employee.findAll({ include: [{ model: Task, as: "tasks" }] });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getEmployee(req, res) {
  try {
    const emp = await Employee.findByPk(req.params.id, { include: [{ model: Task, as: "tasks" }] });
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createEmployee(req, res) {
  try {
    const { name, email, role } = req.body;
    const emp = await Employee.create({ name, email, role });
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateEmployee(req, res) {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    const { name, email, role } = req.body;
    await emp.update({ name, email, role });
    res.json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteEmployee(req, res) {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    await emp.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function leaderboard(req, res) {
  try {
    const employees = await Employee.findAll({ order: [["total_xp", "DESC"]], limit: 20 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  leaderboard
};
