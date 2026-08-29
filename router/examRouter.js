const express = require("express");
const examRouter = express.Router();
const {
  getExam,
  saveExam,
  updateExam,
  deleteExam,
  takeExam,
  submitExam,
} = require("../controller/examController");

examRouter.get("/", getExam);
examRouter.post("/", saveExam);
examRouter.put("/", updateExam);
examRouter.delete("/", deleteExam);
examRouter.post("/take-exam", takeExam);
examRouter.post("/submit-exam", submitExam);

module.exports = examRouter;
