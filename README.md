# TASKFLOW

A task management REST API developed using Node.js and Express.js.

## Technologies
- Node.js
- Express.js
- JavaScript
- JSON

## Installation

Clone the repository:
git clone YOUR_GITHUB_REPOSITORY_URL


Install dependencies:
npm install


## Usage

Start the development server:
npm run dev

The server runs at `http://localhost:3000`.

## API Endpoints

**Tasks**
- `GET /api/tasks` – List all tasks
- `GET /api/tasks/:id` – Get a task by ID
- `POST /api/tasks` – Create a task
- `PUT /api/tasks/:id` – Update a task
- `DELETE /api/tasks/:id` – Delete a task

**Reports**
- `GET /api/reports/completed` – Completed task count
- `GET /api/reports/pending` – Pending task count
- `GET /api/reports/summary` – General task summary

## Features
- Task CRUD operations
- Task filtering and searching
- Sorting and pagination
- Input validation
- Request logging
- Task reports

## Data Storage

Task data is stored in `src/data/tasks.json`.

## Testing

API endpoints are tested using Postman.