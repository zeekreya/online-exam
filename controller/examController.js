const ExamModel = require("../model/examModel");
const ResultModel = require("../model/resultModel");

const getExam = async (req, res) => {
  try {
    const query = req.query;
    const examData = await ExamModel.find(query)
      .populate("questions")
      .lean()
      .exec();
    res.json({
      success: true,
      message: "Exam fetched successfully",
      data: examData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const saveExam = async (req, res) => {
  try {
    const bodyData = req.body;
    const examData = new ExamModel(bodyData);
    await examData.save();
    res.json({
      success: true,
      message: "Exam saved successfully",
      data: examData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const updateExam = async (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const examData = await ExamModel.findOneAndUpdate(query, body, {
      new: true,
    })
      .lean()
      .exec();
    res.json({
      success: true,
      message: "Exam updated successfully",
      data: examData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const deleteExam = async (req, res) => {
  try {
    const query = req.query;
    const examData = await ExamModel.findOneAndDelete(query).lean().exec();
    res.json({
      success: true,
      message: "Exam deleted successfully",
      data: examData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const takeExam = async (req, res) => {
  try {
    const examId = req.body.examId;
    const userId = req.body.userId;
    let result = [];

    let examData = await ExamModel.findOne({ _id: examId }).lean().exec();
    for (let i = 0; i < examData?.questions?.length; i++) {
      result.push({
        examId: examId,
        userId: userId,
        question: examData?.questions?.[i],
      });
    }

    let checkResult = await ResultModel.find({
      examId: examId,
      userId: userId,
    })
      .lean()
      .exec();

    if (checkResult?.length == 0) {
      let resultData = await ResultModel.create(result);

      res.json({
        success: true,
        message: "Exam started successfully",
        data: [],
      });
    } else {
      res.json({
        success: false,
        message: "Exam already submitted",
        data: [],
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
const submitExam = async (req, res) => {
  try {
    const examId = req.query.examId;
    const userId = req.query.userId;
    let questions = req?.body;
    console.log(questions);

    for (let i = 0; i < questions?.length; i++) {
      await ResultModel.findOneAndUpdate(
        {
          examId: examId,
          userId: userId,
          question: questions?.[i]?.questionId,
        },
        {
          userResponse: questions?.[i]?.response,
          isSubmitted: true,
        },
      ).exec();
    }

    res.json({
      success: true,
      message: "Exam submitted successfully",
      data: [],
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
  getExam,
  saveExam,
  updateExam,
  deleteExam,
  takeExam,
  submitExam,
};
