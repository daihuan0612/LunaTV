const fs = require('fs');
const path = require('path');

// 设置 public 文件夹路径
const publicDir = path.join(__dirname, 'public');
const dataPath = path.join(publicDir, 'data.json');
const outputPath = path.join(publicDir, 'dingyue.json');

// 读取源文件并生成新的 JSON
function buildDingyue() {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(rawData);

        // 这里可以加入你原来的转换逻辑，比如过滤、格式化等
        const transformed = data.map(item => ({
            name: item.name,
            api: item.api,
            adult: item.adult
        }));

        // 将生成的 JSON 写入 public 文件夹
        fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2), 'utf8');
        console.log('dingyue.json 已生成，影视仓可直接拉取');
    } catch (err) {
        console.error('生成 dingyue.json 失败:', err);
    }
}

// 立即执行一次生成
buildDingyue();

// 监听 data.json 改动，自动更新 dingyue.json
fs.watchFile(dataPath, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        console.log('检测到 data.json 修改，自动更新 dingyue.json...');
        buildDingyue();
    }
});
