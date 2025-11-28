const app = require("./app");
const sequelize = require("./config/db");
const Employee = require("./models/employee");
const Task = require("./models/Task");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Import simulation script
    const simulateYear = require("./utils/simulateYear");

    // Seed employees if none exist
    const count = await Employee.count();
    if (count === 0) {
      await Employee.bulkCreate([
        { name: "Arun Kumar", email: "arun@example.com", role: "Engineer", xp: 30, total_xp: 30 },
        { name: "Priya Sharma", email: "priya@example.com", role: "Designer", xp: 60, total_xp: 60 },
        { name: "Rahul Gupta", email: "rahul@example.com", role: "Product", xp: 10, total_xp: 10 },
        { name: "Sahana Rao", email: "sahana@example.com", role: "Engineer", xp: 0, total_xp: 0 },
        { name: "Vikram Iyer", email: "vikram@example.com", role: "Engineer", xp: 0, total_xp: 0 },
        { name: "Neha Verma", email: "neha@example.com", role: "Designer", xp: 0, total_xp: 0 },
        { name: "Karthik N", email: "karthik@example.com", role: "Marketing", xp: 0, total_xp: 0 },
        { name: "Divya R", email: "divya@example.com", role: "Marketing", xp: 0, total_xp: 0 },
        { name: "Manish T", email: "manish@example.com", role: "Support", xp: 0, total_xp: 0 },
        { name: "Ayesha M", email: "ayesha@example.com", role: "Support", xp: 0, total_xp: 0 }
    ]);

    }

    // Run the year simulation ONLY ONCE
    console.log("Starting 1-year simulation...");
    await simulateYear();
    console.log("Simulation completed!");

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();
