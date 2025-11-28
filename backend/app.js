const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const employeeRoutes = require("./routes/employee.routes");
const taskRoutes = require("./routes/task.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

// Allow frontend access
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));

app.use(bodyParser.json());

// prefix APIs
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/analytics", analyticsRoutes);

// simple health
app.get("/api/ping", (req, res) => res.json({ status: "ok" }));

module.exports = app;
