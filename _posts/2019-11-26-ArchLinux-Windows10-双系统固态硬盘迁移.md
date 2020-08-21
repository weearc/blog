---
title: ArchLinux + Windows10 双系统固态硬盘迁移
toc: false
mathjax: false
tags:
  - archlinux
  - 系统迁移
categories:
  - archlinux
abbrlink: 25676
date: 2019-11-26 20:22:54
---

盼星星盼月亮终于拿到了心心念念的固态硬盘，终于能够有畅快淋漓的体验了。

<!--more-->

既然固态硬盘体验这么好，那为啥以前非要买那么写机械？因为我是仓鼠症患者，买的硬盘全部拿去存电影了.......

那到固态以后其实就没什么好说的，之前光驱位以及主硬盘位都有机械硬盘，光驱位上的盘作为纯粹的数据盘挂载在 Arch 下面。所以就算单独拿下来去给 NAS 挂着也没什么大问题。那么最终就还是主硬盘位的机械硬盘去了光驱位，新买的固态上了主硬盘位。

其实在迁移前我很纠结要不要重装windows，本意上是不想重新安装的，一大堆专业软件和自己配置的环境重新弄起来费时费力而且真的要命。那么就还是决定使用软件做系统迁移。先把最麻烦的windows的部分解决。Linux 反而是一向最容易迁移的了。

## 迁移windows10

下载 aomei 无损分区助手PE版本，配合wepe做好系统迁移，这个时候会一并把esp分区迁移过来，所以 linux 下就不需要重建了。有的电脑可能会遇到说是内存不足，那就老老实实重装吧。

## 迁移ArchLinux

在windows下面如果没有了 Aomei这样的工具，那么迁移起来说实在说的是极其痛苦的，尤其现在ghost还不能用。Arch就要轻松很多。只需要用到 `rsync` 即可。

在旧的Arch下面给新硬盘剩余空间分好区，然后直接把新的根分区挂载在 `/mnt` 其余比如 `/home` `/boo/efi` 也依次挂载好。终端中执行以下命令：

```bash
rsync -aAXv /* /mnt/. --exclude={/dev/*,/proc/*,/sys/*,/tmp/*,/var/tmp/*,/run/*,/mnt/*,/home/*,/media/*,/lost+found,/boot/*}
```

命令参数详情请参阅 `rsync` 的手册部分。然后排除掉 “运行态”的部分，对所有目录进行重建，文件按照归档进行迁移。执行以后大功告成一半。

由于我需要将原来的根分区删掉分给 home , 因此进入 Livecd 对旧分区进行删除操作，然后将分区移动到空间头部。完成后执行：

```bash
arch-chroot /mnt
```

参照当初安装 Arch 的步骤进行，执行：

``` bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi/ --recheck
```

重新安装grub。并配置grub：

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

在此之前记得删除掉旧的esp分区。至此基本大功告成。最后记得检查一下 `/etc/fstab` 以免启动时出现问题。

耗时4个小时两个系统迁移完毕，windows用了三个多小时，Arch用了40分钟不到。