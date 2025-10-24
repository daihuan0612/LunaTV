import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 完全按照示例格式转换sites
    const sites = Object.values(apiSites).map(site => ({
      key: site.name.replace(/\s+/g, '_'),
      name: site.name,
      type: 1, // 使用type: 1（直连类型）
      api: site.api,
      searchable: 1,
      quickSearch: 1,
      filterable: 1,
      changeable: 1,
      playerType: 2
    }));

    // 完全照抄可用的配置格式
    const responseData = {
      sites: sites,
      parses: [
        {
          name: "Json聚合",
          type: 3,
          url: "Demo"
        },
        {
          name: "官方解析", 
          type: 0,
          url: "https://jx.m3u8.tv/jiexi/?url="
        }
      ],
      flags: [
        "youku", "qq", "iqiyi", "qiyi", "letv", "sohu", "tudou", 
        "pptv", "mgtv", "wasu", "bilibili"
      ],
      name: "小苹果TV",
      version: "1.0.0"
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