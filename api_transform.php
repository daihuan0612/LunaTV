<?php
// 设置文件路径，这里假设 data.json 文件和 api_transform.php 在同一目录下
$data_file = __DIR__ . '/data.json';

// 检查文件是否存在
if (!file_exists($data_file)) {
    echo json_encode(['error' => 'data.json 文件不存在'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// 获取并解析 data.json 文件内容
$original_json = file_get_contents($data_file);
$data = json_decode($original_json, true);

// 如果 JSON 解析失败
if ($data === null) {
    echo json_encode(['error' => '解析 data.json 文件失败'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// 处理 JSON 数据，确保符合影视仓的格式要求
if (isset($data['api_site'])) {
    foreach ($data['api_site'] as $key => &$site) {
        // 确保每个接口的数据都存在必要字段
        $site['api'] = $site['api'] ?? '';
        $site['name'] = $site['name'] ?? '';
        $site['detail'] = $site['detail'] ?? '';

        // 确保 is_adult 字段为布尔值
        $site['is_adult'] = !empty($site['is_adult']) && $site['is_adult'] !== 'false' && $site['is_adult'] !== 0 ? true : false;
    }
}

// 确保缓存时间存在，如果没有则设置默认 7200 秒
$data['cache_time'] = $data['cache_time'] ?? 7200;

// 返回 JSON 格式，符合影视仓要求
header('Content-Type: application/json; charset=utf-8');
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
