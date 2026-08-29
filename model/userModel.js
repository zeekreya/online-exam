const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    userType: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true },
);
const User = mongoose.model("user", userSchema);
module.exports = User;
