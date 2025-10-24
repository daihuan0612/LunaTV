import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 按照完整示例格式转换sites
    const sites = Object.values(apiSites).map(site => ({
      key: site.name.replace(/\s+/g, '_').toLowerCase(), // 小写+下划线
      name: site.name,
      type: 3,
      api: site.api
    }));

    // 完全按照官方示例格式
    const responseData = {
      sites: sites,
      parses: [
        {
          name: "官方解析",
          type: 1,
          url: ""
        }
      ],
      rules: [],
      flags: [
        "qq", "youku", "iqiyi", "letv", "sohu", "tudou", "pptv", "mgtv"
      ]
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
      error: "服务器错误"
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}