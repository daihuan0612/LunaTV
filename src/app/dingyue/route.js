import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 按照示例格式转换sites
    const sites = Object.values(apiSites).map(site => ({
      key: site.name.replace(/\s+/g, '_'), // 替换空格为下划线
      name: site.name,
      type: site.is_adult ? 3 : 0, // 按照示例使用 type: 3
      api: site.api,
      searchable: 1,
      quickSearch: 1
    }));

    // 完全按照示例格式
    const responseData = {
      sites: sites,
      parses: [
        {
          name: "默认解析",
          url: ""
        }
      ]
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