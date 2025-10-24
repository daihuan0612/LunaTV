export async function GET() {
  try {
    // 先硬编码几个测试数据，确保基础功能正常
    const testData = {
      urls: [
        {
          name: "测试资源1",
          url: "https://api.1080zyku.com",
          type: 0,
          group: "测试资源"
        },
        {
          name: "测试资源2", 
          url: "https://360zy.com",
          type: 0,
          group: "测试资源"
        }
      ],
      version: "1.0.0",
      name: "小苹果TV测试",
      total: 2
    };
    
    return new Response(JSON.stringify(testData), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: "服务器错误: " + error.message
    }), {
      status: 500,
    });
  }
}