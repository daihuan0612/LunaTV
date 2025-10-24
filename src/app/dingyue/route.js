import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // 拼接根目录 data.json 的绝对路径
    const __dirname = path.resolve(); 
    const filePath = path.join(__dirname, 'data.json');
    
    // 读取文件
    const data = await readFile(filePath, 'utf-8');
    
    // 返回 JSON
    return new Response(data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
