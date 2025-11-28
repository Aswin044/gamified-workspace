const Task = require("../models/Task");
const Employee = require("../models/employee");
const { calculateXP, applyXPAndLevel } = require("../utils/xpCalculator");

async function listTasks(req, res) {
  try {
    const tasks = await Task.findAll({ include: [{ model: Employee, as: "employee" }] });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createTask(req, res) {
  try {
    const { title, description, difficulty, employeeId } = req.body;
    const xp_reward = calculateXP(difficulty);
    const task = await Task.create({ title, description, difficulty, xp_reward, employeeId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    const { title, description, difficulty, status, employeeId } = req.body;
    const xp_reward = difficulty ? calculateXP(difficulty) : task.xp_reward;
    await task.update({ title, description, difficulty, status, xp_reward, employeeId });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Mark completed and give XP to employee
async function completeTask(req, res) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (task.status === "completed") {
      return res.status(400).json({ error: "Task already completed" });
    }

    const employee = await Employee.findByPk(task.employeeId);
    if (!employee) return res.status(404).json({ error: "Assigned employee not found" });

    // mark task completed
    await task.update({ status: "completed" });

    const xpToAdd = task.xp_reward || calculateXP(task.difficulty);
    const result = applyXPAndLevel(employee, xpToAdd);
    await result.employee.save();

    res.json({ task, employee: result.employee, leveledUp: result.leveledUp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
};
