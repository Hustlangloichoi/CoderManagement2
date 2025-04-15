const express = require("express");
const router = express.Router();
const {createTask, getAllTasks, }taskController = require("../controllers/taskController"); //destruction

// Middleware to check if the user is authenticated (optional, can be added later)

//create
router.post("/", taskController.createTask);
//get tasks with filter
router.get("/", taskController.getAllTasks);
// get task by id
router.get("/:id", taskController.getTaskById);
// assign task to user or unassign
router.put("/:id/assign", taskController.assignTask);
// update status of task
router.put("/:id/status", taskController.updateTaskStatus);
// delete task (soft delete)
router.delete("/:id", taskController.softDeleteTask);

module.exports = router;
