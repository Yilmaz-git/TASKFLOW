
const validateTask = (req, res, next) => {
    const { title, description, assignee, priority, status } = req.body;

    const errors = [];

    // Required fields for creating a task
    if (req.method === "POST") {
        if (title === undefined || title === null || title === "") {
            errors.push("Title is required");
        }

        if (description === undefined || description === null || description === "") {
            errors.push("Description is required");
        }

        if (assignee === undefined || assignee === null || assignee === "") {
            errors.push("Assignee is required");
        }

        if (priority === undefined || priority === null || priority === "") {
            errors.push("Priority is required");
        }

    }

    // Validate string fields
    if (title !== undefined &&
        (typeof title !== "string" || !title.trim())) {
        errors.push("Title must be a non-empty string");
    }

    if (description !== undefined &&
        (typeof description !== "string" || !description.trim())) {
        errors.push("Description must be a non-empty string");
    }

    if (assignee !== undefined &&
        (typeof assignee !== "string" || !assignee.trim())) {
        errors.push("Assignee must be a non-empty string");
    }

    // Validate priority
    if (priority !== undefined &&
        !["low", "medium", "high"].includes(priority)) {
        errors.push("Priority must be low, medium or high");
    }

    // Validate status
    if (status !== undefined &&
        !["pending", "in-progress", "completed"].includes(status)) {
        errors.push("Status must be pending, in-progress or completed");
    }

    // Return validation errors
    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation failed",
            errors
        });
    }

    next();
};

module.exports = validateTask;
