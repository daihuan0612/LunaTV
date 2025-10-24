// 读取data.json文件，提供影视仓支持的网站首页地址
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    // 读取data.json文件
    const dataPath = join(process.cwd(), 'data.json');
    const jsonData = JSON.parse(readFileSync(dataPath, 'utf8'));
    const apiSites = jsonData.api_site;

    // 生成影视仓支持的M3U格式，包含网站首页地址
    let m3uContent = "#EXTM3U\n";
    m3uContent += "# 小苹果TV资源站\n";
    m3uContent += `# 更新时间: ${new Date().toLocaleString()}\n`;
    m3uContent += `# 资源数量: ${Object.keys(apiSites).length}\n\n`;
    
    Object.values(apiSites).forEach(site => {
      // 使用detail字段中的网站地址，如果没有就使用api的域名
      let websiteUrl = site.detail;
      if (!websiteUrl || websiteUrl === "") {
        // 从api URL提取基础域名作为备用
        try {
          const url = new URL(site.api);
          websiteUrl = url.origin;
        } catch (e) {
          websiteUrl = site.api;
        }
      }
      
      const group = site.is_adult ? "成人资源" : "普通资源";
      m3uContent += `#EXTINF:-1 group-title="${group}",${site.name}\n`;
      m3uContent += `${websiteUrl}\n\n`;
    });
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(m3uContent);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('服务器错误');
  }
}