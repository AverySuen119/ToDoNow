const express = require('express');
const multer = require('multer');
const Schedule = require('../models/Schedule');
const router = express.Router();

// 配置 multer 用于处理文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// 创建新计划
router.post('/add', upload.single('backgroundImage'), async (req, res) => {
  const { title, description, tasks, reminderTime } = req.body;
  let backgroundImage = null;
  
  if (req.file) {
    backgroundImage = req.file.path; // 上传的图片路径
  }

  try {
    const newSchedule = new Schedule({
      title,
      description,
      tasks: JSON.parse(tasks), // 转换任务为对象数组
      reminderTime,
      backgroundImage
    });

    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ error: 'Error creating schedule' });
  }
});

// 获取所有计划
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching schedules' });
  }
});

// 更新计划
router.put('/update/:id', async (req, res) => {
  const { title, description, tasks, reminderTime } = req.body;
  
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { title, description, tasks: JSON.parse(tasks), reminderTime },
      { new: true }
    );
    res.json(updatedSchedule);
  } catch (err) {
    res.status(500).json({ error: 'Error updating schedule' });
  }
});

// 删除计划
router.delete('/delete/:id', async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting schedule' });
  }
});

module.exports = router;
