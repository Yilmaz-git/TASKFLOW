
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

// Read tasks from JSON file
const readTasks = async () => {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
};

// Get completed task count
const getCompletedTasks = async (req, res) => {
    try {
        const tasks = await readTasks();

        const completedTasks = tasks.filter(
            task => task.status === "completed"
        );

        res.status(200).json({
            completedTasks: completedTasks.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get pending task count
const getPendingTasks = async (req, res) => {
    try {
        const tasks = await readTasks();

        const pendingTasks = tasks.filter(
            task => task.status === "pending"
        );

        res.status(200).json({
            pendingTasks: pendingTasks.length
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get general task summary
const getSummary = async (req, res) => {
    try {
        const tasks = await readTasks();

        const summary = {
            totalTasks: tasks.length,
            completedTasks: tasks.filter(
                task => task.status === "completed"
            ).length,
            pendingTasks: tasks.filter(
                task => task.status === "pending"
            ).length,
            inProgressTasks: tasks.filter(
                task => task.status === "in-progress"
            ).length
        };

        res.status(200).json(summary);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getCompletedTasks,
    getPendingTasks,
    getSummary
};