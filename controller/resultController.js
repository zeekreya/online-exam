const mongoose = require("mongoose");
const ResultModel = require("../model/resultModel");

const getResult = async (req, res) => {
  try {
    const query = req.query;
    const resultData = await ResultModel.find(query).lean().exec();
    res.json({
      success: true,
      message: "Result fetched successfully",
      Data: resultData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const getExamResult = async (req, res) => {
  try {
    const userId = req.query?.userId;
    const examId = req.query?.examId;

    let query = {};
    if (userId) {
      query.userId = new mongoose.Types.ObjectId(userId);
    }
    if (examId) {
      query.examId = new mongoose.Types.ObjectId(examId);
    }

    let resultData = await ResultModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "questions",
          localField: "question",
          foreignField: "_id",
          as: "question",
        },
      },
      {
        $unwind: {
          path: "$question",
        },
      },
      {
        $group: {
          _id: {
            examId: "$examId",
            userId: "$userId",
          },
          data: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "exams",
          localField: "_id.examId",
          foreignField: "_id",
          as: "examData",
        },
      },
      {
        $unwind: {
          path: "$examData",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: {
          path: "$userData",
        },
      },
    ]).exec();

    res.json({
      success: true,
      message: "Result fetched successfully",
      data: resultData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const saveResult = async (req, res) => {
  try {
    const bodyData = req.body;
    const resultData = new ResultModel(resultData);
    await resultData.save();
    res.json({
      success: true,
      message: "Result saved successfully",
      Data: resultData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const updateResult = async (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const resultData = await ResultModel.findOneAndUpdate(query, body, {
      new: true,
    })
      .lean()
      .exec();
    res.json({
      success: true,
      message: "Result updated successfully",
      Data: resultData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const deleteResult = async (req, res) => {
  try {
    const query = req.query;
    const resultData = await ResultModel.findOneAndDelete(query).lean().exec();
    res.json({
      success: true,
      message: "Result deleted successfully",
      Data: resultData,
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
  getResult,
  saveResult,
  updateResult,
  deleteResult,
  getExamResult,
};
