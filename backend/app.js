const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const employeeRoutes = require("./routes/employee.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// prefix APIs
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

// simple health
app.get("/api/ping", (req, res) => res.json({ status: "ok" }));

module.exports = app;
const analyticsRoutes = require("./routes/analytics.routes");
app.use("/api/analytics", analyticsRoutes);

