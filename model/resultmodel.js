const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exam",
      reuired: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userResponse: {
      type: Number,
      default: 0,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
const result = mongoose.model("result", resultSchema);
module.exports = result;
