# 掘金自动签到

1. 需要去掘金官网。首页，抓包， 找到`/check_in_rules`这个接口，然后把后面的字符串（以`aid=`开头）复制保存。 这个就是 cookie
2. 打开控制台，在存储的cookie中找到  sessionId  这个胡原始股sessionId
3. 轻服务里部署一下， 然后定时任务就行