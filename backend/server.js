const app = require("./app");
const sequelize = require("./config/db");
const Employee = require("./models/employee");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Seed minimum employees only when empty
    const count = await Employee.count();
    if (count === 0) {
      console.log("Seeding employees...");
      await Employee.bulkCreate([
        { name: "Arun Kumar", email: "arun@example.com", role: "Engineer", xp: 30, total_xp: 30 },
        { name: "Priya Sharma", email: "priya@example.com", role: "Designer", xp: 60, total_xp: 60 },
        { name: "Rahul Gupta", email: "rahul@example.com", role: "Product", xp: 10, total_xp: 10 },
        { name: "Sahana Rao", email: "sahana@example.com", role: "Engineer", xp: 5, total_xp: 5 },
        { name: "Vikram Iyer", email: "vikram@example.com", role: "Engineer", xp: 15, total_xp: 15 },
        { name: "Neha Verma", email: "neha@example.com", role: "Designer", xp: 20, total_xp: 20 },
        { name: "Karthik N", email: "karthik@example.com", role: "Marketing", xp: 0, total_xp: 0 },
        { name: "Divya R", email: "divya@example.com", role: "Marketing", xp: 0, total_xp: 0 },
        { name: "Manish T", email: "manish@example.com", role: "Support", xp: 0, total_xp: 0 },
        { name: "Ayesha M", email: "ayesha@example.com", role: "Support", xp: 0, total_xp: 0 }
      ]);
    }

    // IMPORTANT: Skip simulation during deployment
    if (process.env.NODE_ENV !== "production" && process.env.RUN_SIMULATION === "true") {
      console.log("Starting 1-year simulation...");
      const simulateYear = require("./utils/simulateYear");
      await simulateYear();
      console.log("Simulation completed!");
    } else {
      console.log("Skipping simulation (production mode or RUN_SIMULATION not set)");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
