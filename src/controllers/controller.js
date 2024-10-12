// 行程控制器
const Schedule = require('../models/scheduleModel');

// 创建新行程
exports.createSchedule = async (req, res) => {
    const { title, description, date, background } = req.body;
    try {
        const newSchedule = new Schedule({ title, description, date, background });
        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 获取所有行程
exports.getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 更新行程
exports.updateSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!schedule) return res.status(404).send('Schedule not found');
        res.json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 删除行程
exports.deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!schedule) return res.status(404).send('Schedule not found');
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
