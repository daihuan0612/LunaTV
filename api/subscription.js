// 读取data.json文件，提供影视仓支持的JSON格式
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 转换为影视仓支持的JSON格式
    const subscriptionData = {
      code: 200,
      msg: "success",
      data: {
        sites: Object.entries(apiSites).map(([key, site]) => ({
          key: key,
          name: site.name,
          api: site.api,
          is_adult: site.is_adult,
          detail: site.detail || ""
        }))
      },
      timestamp: Date.now()
    };
    
    // 设置JSON响应头
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    
    res.json(subscriptionData);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      code: 500,
      msg: "服务器错误",
      data: null,
      timestamp: Date.now()
    });
  }
}