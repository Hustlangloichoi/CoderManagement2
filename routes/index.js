const { sendResponse, AppError } = require("../helpers/utils");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json("Welcome to the API");
});

router.get("/template/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
