const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Employee = require("./employee");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: "pending" }, // pending/ongoing/completed
  difficulty: { type: DataTypes.STRING, defaultValue: "easy" }, // easy/medium/hard
  xp_reward: { type: DataTypes.INTEGER, defaultValue: 0 }
});

// associations:
Employee.hasMany(Task, { foreignKey: "employeeId", as: "tasks" });
Task.belongsTo(Employee, { foreignKey: "employeeId", as: "employee" });

module.exports = Task;
