const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const Schedule = require('./models/Schedule');
const scheduleRoutes = require('./routes/schedule');

const app = express();

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/scheduleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 中间件
app.use(express.json());
app.use('/uploads', express.static('uploads')); // 静态资源提供服务
app.use('/schedules', scheduleRoutes);

// 定时任务，检查是否有提醒任务
cron.schedule('* * * * *', async () => {
  const now = new Date();
  try {
    const schedules = await Schedule.find({ reminderTime: { $lte: now } });
    schedules.forEach((schedule) => {
      console.log(`Reminder: You have a schedule titled "${schedule.title}"`);
      // 在这里实现推送通知逻辑
    });
  } catch (err) {
    console.error('Error checking reminders:', err);
  }
});

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

