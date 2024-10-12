const mongoose = require('mongoose');

// 定义行程计划的数据模型
const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tasks: [
    {
      time: { type: String },   // 任务的时间
      description: { type: String }, // 任务描述
      completed: { type: Boolean, default: false } // 任务是否完成
    }
  ],
  backgroundImage: { type: String }, // 自定义背景图片
  reminderTime: { type: Date },  // 用户设置的提醒时间
  createdAt: { type: Date, default: Date.now }
});

// 创建模型
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
