import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 生成影视仓支持的JSON格式
    const lives = Object.values(apiSites).map(site => ({
      name: site.name,
      url: site.detail || (() => {
        try {
          return new URL(site.api).origin;
        } catch (e) {
          return site.api;
        }
      })(),
      type: site.is_adult ? 1 : 0,
      group: site.is_adult ? "成人专区" : "影视资源"
    }));

    // 返回影视仓标准格式
    const responseData = {
      version: 1,
      name: "小苹果TV",
      author: "小苹果", 
      data: lives,
      updateTime: new Date().getTime(),
      total: lives.length
    };
    
    return new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
    
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: "服务器错误"
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}