const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Middleware to check if the user is authenticated (optional, can be added later)

//create
router.post("/", userController.createUser);
//get users with filter
router.get("/", userController.getAllUsers);
// get user by name
router.get("/name/:name", userController.searchUserByName);
// get all tasks of a user
router.get("/:id/tasks", userController.getUserTasks);

module.exports = router;
