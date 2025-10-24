import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 完全照抄可用配置的复杂格式
    const sites = Object.values(apiSites).map(site => ({
      key: site.name.replace(/\s+/g, '_'),
      name: site.name,
      type: 3, // 使用type: 3（复杂类型）
      api: "csp_AppGet", // 使用复杂的API类型
      searchable: 1,
      quickSearch: 1,
      ext: {
        url: site.api, // 将原始API放在ext里
        dataKey: "testkey1234567890", // 仿照可用配置的加密字段
        dataIv: "testiv1234567890"
      }
    }));

    // 完全照抄可用配置的所有字段
    const responseData = {
      sites: sites,
      parses: [{"name":"Json聚合","type":3,"url":"Demo"}],
      flags: ["youku","qq","iqiyi","qiyi","letv","sohu","tudou","pptv","mgtv","wasu","bilibili"]
    };
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify(responseData));
    
  } catch (error) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(500).send(JSON.stringify({error:"服务器错误"}));
  }
}