const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 返回 data.json 数据
router.get('/api/data', (req, res) => {
  const dataPath = path.join(__dirname, '../../data.json'); // data.json 放在项目根目录
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('读取 data.json 失败:', err);
      return res.status(500).json({ error: '读取数据失败' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (e) {
      console.error('解析 JSON 失败:', e);
      res.status(500).json({ error: 'JSON 解析失败' });
    }
  });
});

module.exports = router;
