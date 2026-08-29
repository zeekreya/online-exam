const express = require('express');
const resultRouter = express.Router();
const {getResult, saveResult, updateResult, deleteResult, getExamResult} = require('../controller/resultController')

resultRouter.get('/', getResult);
resultRouter.post('/', saveResult);
resultRouter.put('/', updateResult);
resultRouter.delete('/', deleteResult);
resultRouter.get('/exam-result', getExamResult);

module.exports = resultRouter;