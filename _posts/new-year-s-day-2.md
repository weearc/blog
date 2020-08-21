---
title: 新年折腾记---从Manjaro迁移到Arch
tags:
  - archlinux
  - linux
categories:
  - archlinux
abbrlink: 30549
date: 2019-02-06 17:48:04
---

新的一年，热爱折腾的我当然是从折腾开始新的一年了....

<!--more-->

在经过了各位arch大佬和Gentoo大佬一年的洗礼...我终于决定从Manjaro切换到Arch Linux了（没十足的把握千万别学我，Manjaro其实是个非常好的发行版，其实我也没啥把握就是了....）。

准备迁移过程中考虑了两个问题：

1. 我那快1800个软件包要怎么办
1. 最初选择manjaro，主要是看中了manjaro对于内核切换的便利，以及方便的附加驱动的安装

有关第一个问题，可以通过备份一遍软件列表来解决，但是有关问题二，就要比较头痛了，习惯了方便的一键切换再反过来熟悉一下这种方式未免有点“仿古”的感觉...

那么正常来做迁移，首先需要备份一下软件列表，根据[archwiki](https://wiki.archlinux.org/index.php/Pacman/Tips_and_tricks#Install_packages_from_a_list)，我们需要用pacman导出一份列表，这里注意一下arch和manjaro的关系：manjaro的源，可以理解为大于arch的，也就是说对于arch的仓库，manjaro的一众自己的工具等都是“多余的”，但是介于我从aur也安了一部分包来看，aur和自己打包安装的那部分也要考虑进去。

因此在原有系统中执行：

```bash
#Qqen选项备份的是除了aur和自己打包安装的以外的包
pacman -Qqen > listQqen.txt 
#Qqem选项备份的是aur中的和自己打包安装的包，可以理解为Qqen的补集
pacman -Qqem > listQqem.txt
```

这两个列表保存在主目录就好，之后会用到。

然后还是基础系统的安装，直接base和base-devel两个包组外加iw、wpa_supplicant两个包解决，然后走一遍常规的过程。

这个时候我们再考虑一下，对于manjaro是在源里的软件，对于arch应该是如同aur里的，因为我也使用了相当多archcn的包，因此记得添加archcn源。

然后执行：

```bash
 #获取arch中的存在的包
 pacman -S --needed $(comm -12 <(pacman -Slq | sort) <(sort listQqen.txt))
 #获取aur里的包
 yaourt  -S --needed $(comm -12 <(pacman -Slq | sort) <(sort Qqem.txt))
```

这时候剩下的包就是manjaro专有的了，如果你愿意的话也可以和我一样直接clone [manjaro](https://gitlab.manjaro.org/explore/groups)的那些包的源代码然后自己编译安装，这之后记得把相关的服务启动了，然后就大功告成了。重启一下看看是不是熟悉的界面又回来了。

后记：

貌似很多用arch的用户还在有着对manjaro的鄙视链啊.....但是有一点不得不说，就是该承认的非常用户友好的特性还是承认吧，都是linux用户互怼没啥好处。