//
const Schedule = require('../models/scheduleModel');

//
exports.getCompletedSchedules = async () => {
    return await Schedule.find({ completed: true });
};
