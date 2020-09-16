<?php


require_once 'task.php';
require_once 'config.php'; //加载配置
require_once 'admin_tool.php'; //加载管理员工具
require_once 'tool.php'; //加载普通工具
require_once "LovelyCat.php"; //加载预制机器人库

$task = new task();

$rows = $task->getUnSendTaskList();

if (empty($rows)) {
    echo '['.date('Y-m-d H:i:s').'] No Access Data';
    exit();
}

foreach ($rows as $row) {
    $wxData = [
        'from_wxid' => $row['wx_id'],
        'robot_wxid' => $row['robot_id'],
        'key' => $row['key'],
        'msg' => $row['content']
    ];


    $cssasutd_wxbot = new lovelyCat($config, $wxData);
    $cssasutd_wxbot->config = $config; //写入配置
    $cssasutd_wxbot->ckey = $config[ 'ckey' ]; //设置密钥


    $result = command( $cssasutd_wxbot );

    if ($result['state'] !== false) {
        // 修改状态
        $changeResult = $task->changeStatus($row['id']);
    } else {
        echo $result['msg'];
        exit();
    }

}



echo '['.date('Y-m-d H:i:s').'] Send Success !';
exit();