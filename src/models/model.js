// 
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    background: { type: String },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
