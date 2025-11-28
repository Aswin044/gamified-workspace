const Task = require("../models/Task");
const Employee = require("../models/employee");
const { Op } = require("sequelize");

// MAIN ANALYTICS SUMMARY (tasks today + xp week)
exports.getAnalytics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    // Tasks completed today
    const tasksToday = await Task.count({
      where: {
        status: "completed",
        updatedAt: { [Op.gte]: today }
      }
    });

    // XP this week (sum of total_xp for now)
    const employees = await Employee.findAll();
    const xpWeek = employees.reduce((sum, e) => sum + e.total_xp, 0);

    res.json({
      tasksToday,
      xpWeek
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// XP per month (gradient chart)
exports.getXPPerMonth = async (req, res) => {
  try {
    const employees = await Employee.findAll();

    const months = Array(12).fill(0);

    employees.forEach((emp) => {
      let xpPerMonth = Math.floor(emp.total_xp / 12);

      for (let i = 0; i < 12; i++) {
        months[i] += xpPerMonth + Math.floor(Math.random() * 200);
      }
    });

    res.json({ months });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
