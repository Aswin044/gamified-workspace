const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/task.controller");

router.get("/", ctrl.listTasks);
router.post("/", ctrl.createTask);
router.put("/:id", ctrl.updateTask);
router.delete("/:id", ctrl.deleteTask);
router.post("/:id/complete", ctrl.completeTask);

module.exports = router;
