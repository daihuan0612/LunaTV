import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 转换为影视仓标准格式 - 包含urls字段
    const sites = Object.values(apiSites).map(site => ({
      name: site.name,
      url: site.detail || (() => {
        try {
          const urlObj = new URL(site.api);
          return urlObj.origin;
        } catch (e) {
          // 如果URL解析失败，尝试提取基础URL
          const match = site.api.match(/^(https?:\/\/[^\/]+)/);
          return match ? match[1] : site.api;
        }
      })(),
      type: site.is_adult ? 1 : 0,
      group: site.is_adult ? "成人专区" : "影视资源"
    }));

    // 影视仓最可能兼容的格式
    const responseData = {
      urls: sites,  // 关键字段
      version: "1.0.0",
      name: "小苹果TV资源库",
      author: "小苹果",
      updateTime: new Date().toISOString(),
      total: sites.length
    };
    
    return new Response(JSON.stringify(responseData, null, 2), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
    
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: "服务器错误",
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}