// 读取data.json文件，提供影视仓支持的JSON格式
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 转换为影视仓支持的标准JSON格式
    const sitesArray = Object.entries(apiSites).map(([key, site]) => ({
      key: key,
      name: site.name,
      api: site.api,
      type: site.is_adult ? 1 : 0, // 0-普通 1-成人
      visible: 1,
      extra: site.detail || ""
    }));

    // 影视仓标准响应格式
    const subscriptionData = {
      success: true,
      data: sitesArray,
      message: "小苹果TV订阅源",
      version: "1.0"
    };
    
    // 设置JSON响应头
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    
    res.json(subscriptionData);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      data: null,
      message: "服务器错误",
      version: "1.0"
    });
  }
}