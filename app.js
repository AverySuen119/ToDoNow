const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// 导入路由
const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedule');

// 加载环境变量
dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 路由
app.use('/auth', authRoutes);
app.use('/schedules', scheduleRoutes);

// 连接 MongoDB 数据库
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 服务器监听端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
