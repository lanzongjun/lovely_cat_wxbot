<?php

class task
{

    private $db_config = array(
        'host'     => '139.129.93.219',
        'username' => 'blue',
        'password' => 'blue1341',
        'db'       => 'lovely_cat'
    );

    private $post_type_map = array(
        1 => '文案',
        2 => '图文',
        3 => '图片'
    );

    private $status_map = array(
        0 => '未发送',
        1 => '已发送'
    );

    private $conn;

    public function __construct() {
        //连接数据库方式
        $this->conn = new mysqli(
            $this->db_config['host'],
            $this->db_config['username'],
            $this->db_config['password'],
            $this->db_config['db']
        );

        //check connection (检查PHP是否连接上MYSQL)
        if ($this->conn->connect_errno) {

            printf("Connect failed: %s\n", $this->conn->connect_error);

            exit();

        }

        mysqli_query($this->conn, "set names utf8");
    }

    public function getList()
    {
        //查询代码

        $sql = "SELECT * FROM task WHERE is_deleted = 0";

        $query = $this->conn->query($sql);

        $returnData = [];
        while($row = $query->fetch_assoc()){

            $row['post_type_msg'] = $this->post_type_map[$row['post_type']];
            $row['status_msg'] = $this->status_map[$row['status']];
            $returnData[] =  $row;

        }

        //查询代码

        //释放结果集+关闭MySQL连接

        $query->free_result();

        $this->conn->close();

        return $returnData;
    }

    public function add($params)
    {
        // 插入数据
        $sql = "INSERT INTO `task` (`wx_id`, `robot_id`, `post_type`, `event_type`, `msg_type`, `send_time`, `key`, `content`, `status`) VALUES (
'{$params['from_wxid']}', 
'{$params['robot_wxid']}', 
'{$params['post_type']}', 
'{$params['type']}', 
'{$params['msg_type']}', 
'{$params['send_time']}', 
'{$params['key']}', 
'{$params['msg']}', 
'0')";

        // 发送sql 语句
        if($this->conn->query($sql) === TRUE){
            $result = array(
                'state' => true,
                'msg'   => "新记录添加成功!"
            );
        }else {
            $result = array(
                'state' => false,
                'msg'   => "新记录添加失败，错误信息:" . $this->conn->error
            );
        }

        // 关闭连接
        $this->conn->close();


        return $result;
    }

    public function edit($params)
    {

        if ($params['post_type'] == 1) {
            // 文案
            $content = json_encode(array(
                '命令' => '群发文案',
                '参数' => $params['content']
            ),JSON_UNESCAPED_UNICODE);
        } elseif ($params['post_type'] == 2) {
            // 图文
            $content = json_encode(array(
                '命令' => '群发图文',
                '参数' => array(
                    '链接标题' => $params['msg_title'],
                    '链接内容' => $params['msg_content'],
                    '跳转链接' => $params['msg_url'],
                    '图片链接' => $params['msg_pic'],
                )
            ),JSON_UNESCAPED_UNICODE);
        } else {
            // 图片
            $content = json_encode(array(
                '命令' => '群发图片',
                '参数' => $params['msg_content']
            ),JSON_UNESCAPED_UNICODE);
        }

        // 更新数据
        $sql = "UPDATE task SET send_time = '{$params['send_time']}', content = '{$content}' WHERE id = {$params['id']}";

        // 发送sql 语句
        if($this->conn->query($sql) === TRUE){
            $result = array(
                'state' => true,
                'msg'   => "记录更新成功!"
            );
        }else {
            $result = array(
                'state' => false,
                'msg'   => "记录更新失败，错误信息:" . $this->conn->error
            );
        }

        // 关闭连接
        $this->conn->close();

        return $result;
    }

    public function delete($params)
    {
        // 更新数据
        $sql = "UPDATE task SET is_deleted = 1 WHERE id = {$params['id']}";

        // 发送sql 语句
        if($this->conn->query($sql) === TRUE){
            $result = array(
                'state' => true,
                'msg'   => "记录删除成功!"
            );
        }else {
            $result = array(
                'state' => false,
                'msg'   => "记录删除失败，错误信息:" . $this->conn->error
            );
        }

        // 关闭连接
        $this->conn->close();

        return $result;
    }

    public function getUnSendTaskList()
    {
        // 修改时区
        $now = date('Y-m-d H:i:s', strtotime('+8 hour'));

        //查询代码
        $sql = "SELECT * FROM task WHERE send_time <= '{$now}' and status = 0 and  is_deleted = 0";

        $query = $this->conn->query($sql);

        $returnData = [];
        while($row = $query->fetch_assoc()){
            $returnData[] =  $row;

        }

        //查询代码

        //释放结果集+关闭MySQL连接

        return $returnData;
    }

    public function changeStatus($id)
    {
        // 更新数据
        $sql = "UPDATE task SET status = 1 WHERE id = {$id}";

        // 发送sql 语句
        if($this->conn->query($sql) === TRUE){
            $result = array(
                'state' => true,
                'msg'   => "记录修改成功!"
            );
        }else {
            $result = array(
                'state' => false,
                'msg'   => "记录修改失败，错误信息:" . $this->conn->error
            );
        }

        // 关闭连接
        $this->conn->close();

        return $result;
    }
}