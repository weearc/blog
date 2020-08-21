---
title: 搭建私人图床并使用
tags:
  - archlinux
categories:
  - 博客配套
abbrlink: 61150
date: 2019-02-02 23:27:37
---

其实还是挺好用的？但是，由于图床挂掉，此文内容基本已废，将就看倒还可以。

<!--more-->

![0bd162d9f2d3572c94bb080b8b13632763d0c388.jpg](http://picb.weearc.top/images/2019/02/02/0bd162d9f2d3572c94bb080b8b13632763d0c388.jpg)

如图所见！锵锵锵，自建了一个新图床。至于为什么这么做，主要还是因为腾讯云更改了收费及免费的条款，并且已有的vps不好好利用的话实在是资源浪费，所以决定自己建立一个算了。

## VPS准备

因为是要用作图库的VPS所以建议还是选择一个靠谱一些的服务商比较好，国内阿里云以及腾讯云都可以（毕竟学生优惠www）。如果可以的话建议选择storge instance之类的类型，特点是价格便宜并且硬盘空间很大。构架建议选择KVM，极度不推荐openVZ的机器。系统选择任意linux发行版都可以，既然都有能力弄主机，就别说连基础linux的操作都不会。

## 环境配置

由于我们要使用的图床程序是[chevereto](https://chevereto.com/) ,按照[官方文档](https://chevereto.com/docs/requirements)的说明，使用LNMP是比较合适的。[![261b794faf0d9cee7a8b90c41d544ab7.png](http://picb.weearc.top/images/2019/02/03/261b794faf0d9cee7a8b90c41d544ab7.png)](http://picb.weearc.top/image/Wah)

这里选择[LNMP一键包](https://lnmp.org/download.html)（其实也是我懒了）。LNMP那么容易配置就不细讲述了。主要需要注意的是[phpMyAdmin](https://www.phpmyadmin.net/)的一些坑。

[![e865198482f4b22ae431bdc369ab3e79.md.png](http://picb.weearc.top/images/2019/02/03/e865198482f4b22ae431bdc369ab3e79.md.png)](http://picb.weearc.top/image/gdo)

这个地方如果未选择相匹配的MySQL版本会导致无法远程连接到phpMyAdmin。因此请在选择版本时多加注意。***另外安装完成时记得把/home/wwwroot/default/下的几个文件备份并清除。***

## 安装chevereto

这里我使用的是脚本安装方式，仍然是将脚本放到网站根目录即可。

> 注意：记得检查脚本的所有者以及权限


```bash
ls -lash 
chmod a+x index.php
```

> 如果正常的话你会得到index.php的所有者和组为**www**，权限为775或者777。

所有步骤跟着向导就好，没有需要特殊注意的地方。

但是有一个地方需要注意以下，在新建mysql账户时请选择本机域（大概是这个，是localhost）这个地方以前在部署owncloud时就踩过，到现在才弄得比较明白。至此站点部署完毕。

