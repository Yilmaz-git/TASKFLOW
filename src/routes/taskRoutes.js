
const express = require("express");

const router = express.Router();

const validateTask = require("../middleware/validateTask");

const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// List all tasks
router.get("/", getAllTasks);

// Get a task by ID
router.get("/:id", getTaskById);

// Create a new task
router.post("/", validateTask, createTask);

// Update a task
router.put("/:id", validateTask, updateTask);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;
