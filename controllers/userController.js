const User = require("../models/User");
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { name, role = "employee" } = req.body;
    const newUser = new User({ name, role });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    next(err);
  }
};

userController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(req.query);
    return res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

userController.searchUserByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const users = await User.find({ name: { $regex: name, $options: "i" } });
    return res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

// Lấy tất cả task của một user
userController.getUserTasks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("tasks");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ tasks: user.tasks });
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
