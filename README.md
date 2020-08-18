# 基于**可爱猫**的微信机器人api

本php程序基于**可爱猫框架**：  
官网：http://www.keaimao.com  
github：https://github.com/www-keaimao-com/sdk_http_php

## 目前程序功能：  
1.群聊之间消息转发，因为微信群人数上限500，可以通过创建多个群然后用机器人同步消息的方式来变相地突破上限。（**灵感来自于维基百科中文社群**）  
2.管理员或者管理员群中可以直接对机器人发布指令。

## 支持的指令：  
### 短指令：  
|指令|功能|
|:----:|:----:|
|群列表|返回所有群聊的名称与id|
|通信测试|发起一次请求，测试通信是否正常|
### json格式指令：  
格式：{"指令":"","参数":""}  
#### 支持的指令：   
|指令|参数|例|功能|
|:----:|:----:|:----:|:----:|
|成员列表|指定群id|{"指令":"成员列表","参数":"1467862@chatroom"}|返回指定群聊的成员列表|
|公告|公告内容|{"指令":"公告","参数":"这是一则公告！"}|更改所有主群（config.php里定义）的公告|
|群发|群发消息内容|{"指令":"群发","参数":"这是一条群发消息！"}|向所有主群（config.php里定义）群发消息|

## 使用注意：  
使用前自行编辑config_sample.php并更名为config.php