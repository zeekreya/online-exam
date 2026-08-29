const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    }],
    startTime: {
        type: Date,
        required: true,
        defaoult: Date.now
    }
}, {timestamps:true});
const exam = mongoose.model('exam', examSchema);
module.exports = exam;