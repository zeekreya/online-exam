const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      reuired: true,
    },
    optionOne: {
      type: String,
      required: true,
    },
    optionTwo: {
      type: String,
      required: true,
    },
    optionThree: {
      type: String,
      required: true,
    },
    optionFour: {
      type: String,
      required: true,
    },
    correctOption: {
      type: String,
      required: true,
    },
    examName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exam",
    },
  },
  { timestamps: true },
);
const question = mongoose.model("question", questionSchema);
module.exports = question;
