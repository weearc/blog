---
title: php入门到入土1
tags:
  - php
  - archlinux
categories: php
abbrlink: 33109
date: 2018-11-28 16:42:32
---
入土是不可能入土的
<!--more-->
## 环境配置
### 软件安装
首先先安装PHP，php-fpm以及nginx。
```bash
pacman -S php php-fpm nginx
```
安装完成以后，记得配置好vscode对应的相关插件
> 注意一点，arch系的nginx配置虽然与其他发行版大同小异，但是初始可写目录不同。即初始化的目录虽然在/usr/share/nginx/html，但是实际上可写可读目录为/srv/nginx

### 配置文件修改
安装完必要工具，修改配置文件。
```
#位置/etc/nginx
user http http;
worker_processes 1;

event {
        worker_connections 1024;
}

http {
        include             mime.type;
        default_type    application/octet-stream;
        sendfile            on;
        keepalive_timeout   65;
        server {
                listen          80;
                server_name     localhost;
                root                   /srv/nginx;
                location    /   {
                        index   index.html  index.htm   index.php;
                }
                error_page      500 502 503 504 /50x.html;
                location    =   /50x.html   {
                        root        /usr/share/nginx/html;
                }
                loaction    ~   \.php$  {
                        fastcgi_pass    unix:/run/php-fpm/php-fpm.sock;
                        fastcgi_index   index.php;
                        include             fastcgi.conf;
                }
        }
}
```
