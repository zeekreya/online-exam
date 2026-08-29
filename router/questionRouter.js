const express = require('express');
const questionRouter = express.Router();
const {getQuestion, saveQuestion, updateQuestion, deleteQuestion} = require('../controller/questionController')

questionRouter.get('/', getQuestion);
questionRouter.post('/', saveQuestion);
questionRouter.put('/', updateQuestion);
questionRouter.delete('/', deleteQuestion);

module.exports = questionRouter;