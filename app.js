const { sendResponse, AppError } = require("./helpers/utils");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log(`MongoDB connected ${mongoURI}`))
  .catch((err) => console.log(err));

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use((req, res, next) => {
  const err = new AppError(404, "Not Found", "Bad Request");
  next(err);
});

app.use((err, req, res, next) => {
  console.log("ERROR", err);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    err.isOperaional ? err.errorType : "Internal Sever Error"
  );
});

const taskRouter = require("./routes/task.api");
app.use("/api/task", taskRouter);

const userRouter = require("./routes/user.api");
app.use("/api/user", userRouter);

module.exports = app;
