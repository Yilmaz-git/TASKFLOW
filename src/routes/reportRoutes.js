
const express = require("express");
const router = express.Router();

const {
    getCompletedTasks,
    getPendingTasks,
    getSummary
} = require("../controllers/reportController");


// Get completed task count
router.get("/completed", getCompletedTasks);

router.get("/pending", getPendingTasks);

// Get general task summary
router.get("/summary", getSummary);

module.exports = router;
