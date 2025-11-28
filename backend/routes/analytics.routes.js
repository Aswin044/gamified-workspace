const express = require("express");
const router = express.Router();
const controller = require("../controllers/analytics.controller");

// SUMMARY ANALYTICS
router.get("/", controller.getAnalytics);

// XP PER MONTH GRAPH
router.get("/xp-months", controller.getXPPerMonth);

module.exports = router;