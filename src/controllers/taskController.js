
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

const readTasks = async () => {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
};

const writeTasks = async (tasks) => {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
};

// List all tasks with filters
const getAllTasks = async (req, res) => {
    try {
        let tasks = await readTasks();
const { status, priority, search, page, limit, sortBy, order } = req.query;
        

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (priority) {
            tasks = tasks.filter(task => task.priority === priority);
        }

// Search tasks by title or description
        if (search) {
    if (typeof search !== "string") {
        return res.status(400).json({
            message: "Search must be a string"
        });
    }

    tasks = tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );
}

// Sorting
const allowedSortFields = ["title", "priority", "createdAt"];

if (sortBy) {
    if (!allowedSortFields.includes(sortBy)) {
        return res.status(400).json({
            message: "Invalid sort field"
        });
    }

if (order && !["asc", "desc"].includes(order)) {
    return res.status(400).json({
        message: "Order must be asc or desc"
    });
}

    const sortOrder = order === "desc" ? -1 : 1;

tasks.sort((a, b) => {
    if (sortBy === "priority") {
        const priorityOrder = {
            low: 1,
            medium: 2,
            high: 3
        };

        return (priorityOrder[a.priority] - priorityOrder[b.priority]) * sortOrder;
    }

    return a[sortBy].localeCompare(b[sortBy]) * sortOrder;
});
}

// Pagination
// Pagination validation
const currentPage = page === undefined ? 1 : Number(page);
const itemsPerPage = limit === undefined ? 10 : Number(limit);

if (!Number.isInteger(currentPage) || currentPage < 1) {
    return res.status(400).json({
        message: "Page must be a positive integer"
    });
}

if (!Number.isInteger(itemsPerPage) || itemsPerPage < 1 || itemsPerPage > 100) {
    return res.status(400).json({
        message: "Limit must be an integer between 1 and 100"
    });
}

const startIndex = (currentPage - 1) * itemsPerPage;

const paginatedTasks = tasks.slice(
    startIndex,
    startIndex + itemsPerPage
);

        res.status(200).json({
    totalTasks: tasks.length,
    currentPage,
    totalPages: Math.ceil(tasks.length / itemsPerPage),
    tasks: paginatedTasks
});

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(t => t.id === Number(req.params.id));

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const tasks = await readTasks();

        const newTask = {
            id: tasks.length > 0
                ? Math.max(...tasks.map(t => t.id)) + 1
                : 1,
            title: req.body.title,
            description: req.body.description,
            assignee: req.body.assignee,
            priority: req.body.priority,
            status: req.body.status || "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        tasks.push(newTask);
        await writeTasks(tasks);

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(t => t.id === Number(req.params.id));

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { title, description, assignee, priority, status } = req.body;

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (assignee !== undefined) task.assignee = assignee;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;

        task.updatedAt = new Date().toISOString();

        await writeTasks(tasks);

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(
            t => t.id === Number(req.params.id)
        );

        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }

        const deletedTask = tasks.splice(taskIndex, 1)[0];
        await writeTasks(tasks);

        res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Export controller functions
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
