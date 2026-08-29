require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router/userRouter');
const examRouter = require('./router/examRouter');
const questionRouter = require('./router/questionRouter');
const resultRouter = require('./router/resultRouter');
const app = express();

app.use(cors("*"));
app.use(express.json());


mongoose.connect(process.env.DB_URL).then(() => {
    console.log("MongoDb connected successfully ");
}).catch((error) =>{
    console.log("MongoDb connection failed",error );
});

app.use('/user', router);
app.use('/exam', examRouter);
app.use('/question', questionRouter);
app.use('/result', resultRouter);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});