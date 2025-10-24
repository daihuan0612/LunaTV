export default function handler(req, res) {
  // 直接返回URL数组
  const responseData = [
    "https://api.1080zyku.com/inc/api_mac10.php",
    "https://360zy.com/api.php/provide/vod"
  ];
  
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(JSON.stringify(responseData));
}
