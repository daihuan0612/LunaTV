import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 转换为影视仓标准格式
    const sites = Object.values(apiSites).map(site => ({
      key: site.name,
      name: site.name,
      type: site.is_adult ? 1 : 0,
      api: site.api,
      searchable: 1,
      quickSearch: 1,
      filterable: 1,
      categories: site.is_adult ? ["成人专区"] : ["电影", "电视剧", "综艺", "动漫"]
    }));

    // 完整的影视仓配置
    const responseData = {
      sites: sites,
      lives: [
        {
          group: "小苹果TV",
          channels: [
            {
              name: "资源站点",
              urls: ["about:blank"]
            }
          ]
        }
      ],
      parses: [
        {
          name: "通用解析",
          type: 0,
          url: ""
        }
      ],
      flags: [
        "youku", "qq", "iqiyi", "qiyi", "letv", "sohu", "tudou", 
        "pptv", "mgtv", "wasu"
      ],
      ijk: [
        {
          group: "软解码",
          options: [
            { category: 4, name: "opensles", value: "0" },
            { category: 4, name: "framedrop", value: "1" },
            { category: 4, name: "start-on-prepared", value: "1" }
          ]
        }
      ],
      ads: []
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