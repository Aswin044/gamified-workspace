const Employee = require("../models/employee");
const Task = require("../models/Task");
const { calculateXP, applyXPAndLevel } = require("./xpCalculator");

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function simulateYear() {
  console.log("Simulating 1 year of data...");

  const employees = await Employee.findAll();
  if (employees.length === 0) {
    console.log("❗ No employees found. Cannot simulate tasks.");
    return;
  }

  const difficulties = ["easy", "medium", "hard"];
  const today = new Date();

  // Loop for last 365 days
  for (let i = 0; i < 365; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const taskCount = Math.floor(Math.random() * 5) + 1; // 1 to 5 tasks/day

    for (let t = 0; t < taskCount; t++) {
      const employee = randomChoice(employees);
      const difficulty = randomChoice(difficulties);
      const xp = calculateXP(difficulty);

      // Create the task
      await Task.create({
        title: `Task ${t + 1} on ${date.toDateString()}`,
        description: "Auto-generated task",
        difficulty,
        xp_reward: xp,
        status: "completed",
        employeeId: employee.id,
        createdAt: date,
        updatedAt: date
      });

      // Apply XP and Level Up
      const { employee: updatedEmployee } = applyXPAndLevel(employee, xp);
      await updatedEmployee.save();
    }
  }

  console.log("✔ Year simulation complete!");
}

module.exports = simulateYear;
