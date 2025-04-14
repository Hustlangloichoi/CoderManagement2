const Task = require("../models/Task");
const taskController = {};

// Tạo task mới
taskController.createTask = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    const newTask = new Task({ name, description, status });
    await newTask.save();
    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách tất cả task
taskController.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find(req.query);
    return res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
};

// Lấy chi tiết task theo ID
taskController.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
};

// Gán task cho user hoặc bỏ gán
taskController.assignTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.assignedTo = userId || null; // lấy 1 trong 2 (gán hoặc bỏ gán)
    await task.save();
    return res
      .status(200)
      .json({ message: "Task assigned successfully", task });
  } catch (err) {
    next(err);
  }
};

// Cập nhật trạng thái task
taskController.updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.status === "done" && status !== "archive") {
      return res
        .status(400)
        .json({ message: "Task archived, no rolling back" });
    }

    task.status = status;
    await task.save();
    return res
      .status(200)
      .json({ message: "Task status updated successfully", task });
  } catch (err) {
    next(err);
  }
};

// Xóa mềm task
taskController.softDeleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isDeleted = true; // đánh dấu là đã xóa mềm
    await task.save();
    return res.status(200).json({ message: "Task deleted successfully", task });
  } catch (err) {
    next(err);
  }
};

module.exports = taskController;
