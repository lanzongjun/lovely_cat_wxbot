<?php

require_once 'task.php';

$task = new task();

$action = $_POST['action'];

$result = $task->$action($_POST);

echo json_encode($result);