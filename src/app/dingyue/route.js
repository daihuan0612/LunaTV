export default function handler(req, res) {
  // 绝对最简单的配置 - 只包含必需字段
  const responseData = {
    sites: [{
      key: "1080zyku",
      name: "TV-1080资源",
      type: 1,
      api: "https://api.1080zyku.com/inc/api_mac10.php"
    }]
  };
  
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(JSON.stringify(responseData));
}