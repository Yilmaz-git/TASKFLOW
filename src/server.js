const taskRoutes = require("./routes/taskRoutes");

const reportRoutes = require("./routes/reportRoutes");

const express = require("express");

const app = express();

const PORT = 3000;

const logger = require("./middleware/logger");

// To read JSON data
app.use(express.json());

app.use(logger);

app.use("/api/tasks", taskRoutes);

app.use("/api/reports", reportRoutes);

// Main address
app.get("/", (req, res) => {
    res.send("TASKFLOW API is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
