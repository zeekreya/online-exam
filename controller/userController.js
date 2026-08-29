const UserModel = require("../model/userModel");
const ExamModel = require("../model/examModel");
const ResultModel = require("../model/resultModel");
const dayjs = require("dayjs");

const getUser = async (req, res) => {
  try {
    const query = req.query;
    const userData = await UserModel.find(query).lean().exec();
    res.json({
      success: true,
      message: "User fetched successfully",
      data: userData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const saveUser = async (req, res) => {
  try {
    const bodyData = req.body;
    const userData = new UserModel(bodyData);
    await userData.save();
    res.json({
      success: true,
      message: "User saved successfully",
      data: userData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const userData = await UserModel.findOneAndUpdate(query, body, {
      new: true,
    })
      .lean()
      .exec();
    res.json({
      success: true,
      message: "User updated successfully",
      data: userData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const query = req.query;
    const userData = await UserModel.findOneAndDelete(query).lean().exec();
    res.json({
      success: true,
      message: "User deleted successfully",
      data: userData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const getDashboardData = async (req, res) => {
  try {
    let examCount = await ExamModel.countDocuments();
    let questionCount = await ResultModel.countDocuments();
    let userCount = await UserModel.countDocuments({ userType: "student" });
    let upComingExam = await ExamModel.find({
      startTime: { $gt: dayjs().startOf("day"), $lte: dayjs().endOf("day") },
    })
      .lean()
      .exec();

    let response = {
      examCount: examCount,
      questionCount: questionCount,
      userCount: userCount,
      upComingExam: upComingExam
    };
    res.json({
      success: true,
      message: "Read Dashboard data successfully",
      data: response,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
module.exports = {
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  getDashboardData,
};
