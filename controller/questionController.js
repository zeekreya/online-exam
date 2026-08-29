const QuestionModel = require("../model/questionModel");
const ExamModel = require("../model/examModel");

const getQuestion = async (req, res) => {
  try {
    const query = req.query;
    const questionData = await QuestionModel.find(query)
      .populate("examName")
      .lean()
      .exec();
    res.json({
      success: true,
      message: "Question fetched successfully",
      data: questionData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const saveQuestion = async (req, res) => {
  try {
    const bodyData = req.body;
    const questionData = new QuestionModel(bodyData);
    await questionData.save();
    await ExamModel.findByIdAndUpdate(
      { _id: bodyData?.examName },
      { $push: { questions: questionData?._id } },
    );
    res.json({
      success: true,
      message: "Question saved successfully",
      data: questionData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const updateQuestion = async (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const questionData = await QuestionModel.findOneAndUpdate(query, body, {
      new: true,
    })
      .lean()
      .exec();
    res.json({
      success: true,
      message: "Question updated successfully",
      data: questionData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const query = req.query;
    const questionData = await QuestionModel.findOneAndDelete(query)
      .lean()
      .exec();
    res.json({
      success: true,
      message: "Question deleted successfully",
      data: questionData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
module.exports = { getQuestion, saveQuestion, updateQuestion, deleteQuestion };
