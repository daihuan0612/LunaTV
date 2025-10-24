export async function GET() {
  // 确保在任何情况下都返回有效的JSON
  const responseData = {
    "sites": [
      {
        "key": "1080zyku",
        "name": "TV-1080资源", 
        "url": "https://api.1080zyku.com",
        "type": 0
      },
      {
        "key": "360zy",
        "name": "TV-360资源",
        "url": "https://360zy.com", 
        "type": 0
      }
    ],
    "version": "1.0.0",
    "name": "小苹果TV"
  };

  try {
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, max-age=0',
      },
    });
  } catch (error) {
    // 即使JSON.stringify出错也返回JSON
    return new Response(JSON.stringify({
      "error": "服务器内部错误",
      "sites": []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }
}