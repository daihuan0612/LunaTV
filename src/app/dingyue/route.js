import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 完全照抄sites格式
    const sites = Object.values(apiSites).map(site => ({
      key: site.name.replace(/\s+/g, '_'),
      name: site.name,
      type: 1,
      api: site.api,
      searchable: 1,
      quickSearch: 1,
      filterable: 1,
      changeable: 1
    }));

    // 完全照抄 - 包括所有字段和格式
    const responseData = {
      sites: sites,
      parses: [{"name":"Json聚合","type":3,"url":"Demo"},{"name":"官方解析","type":0,"url":"https://jx.m3u8.tv/jiexi/?url="}],
      flags: ["youku","qq","iqiyi","qiyi","letv","sohu","tudou","pptv","mgtv","wasu","bilibili"]
    };
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(JSON.stringify(responseData));
    
  } catch (error) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(500).send(JSON.stringify({success:false,error:"服务器错误"}));
  }
}