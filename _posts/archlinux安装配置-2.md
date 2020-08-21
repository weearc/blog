---
title: archlinux安装配置(2)
tags:
  - archlinux
  - linux
categories: 
  - archlinux
  - kde
abbrlink: 60769
date: 2018-07-02 21:21:49
---
上一次我们配置了基础系统，这一次我们需要进行进一步的配置以使这个系统能够进行日称使用，至少来讲，不能出大问题。我们在上次的安装中已经结束了基础环境的配置。但是仍然需要后续的一些准备。
<!--more-->
# 后期处理

> 先不要弹出安装设备并重启

## chroot 部分
执行：
```
arch-chroot /mnt
```
进入已经安装完成的系统。此时，系统默认的shell程式应该是Bash。因此能够进行一些操作。

首先修改时区：

执行：

```
tzselect
```

接下来跟着向导进行时区的修改。

然后执行：

```
echo "主机名" >> /etc/hostname
```

来创建hostname。

并执行：

```
nano /etc/hosts
```

修改hosts。

一个基础的hosts文件看起来应该是这样：

```
# Static table lookup for hostnames.
# See hosts(5) for details.
127.0.0.1       localhost
::1                  localhost
127.0.1.1       你的hostname.localdomain       你的hostname
```

接下来修改locale:

```
nano /etc/locale.gen
```

为了保险起见，locale.conf 我们不做任何更改。

找到`en_US.UTF8` ，取消注释并执行：

```
locale-gen
```

生成locale。

接下来执行：

```
passwd root
```
来修改root账户的密码。
> 输入密码时不会有任何显示，这是一种安全措施，请不要慌张。

接下来我们需要安装引导程序，此时可以直接执行：
```
pacman -S grub os-prober efibootmgr
```
来安装相关的工具和程式。
```
grub-install --target=x86_64-efi  --directory=esp分区
```
但是个人来讲更加推荐使用rEFInd程序代替之，一则是界面更加美观，二则是确实省心不少。需要安装rEFInd,执行：
```
pacman -S refind-efi
```
安装过程中会自动寻找操作系统的引导项(EFI)，无须担心。

```
refind-install
```

接下来重启，并取出安装设备。从引导程序引导进入新系统。

## 重启后的操作
重启后，应该可以直接看到提示输入用户名，键入：root，回车，并输入密码。登录到新系统。 

注：我的个人建议是chroot下安装iw，dialog等工具，预防进入系统没网的尴尬。

# 桌面环境安装

如果是稍微老一点的教程，可能会推荐先把显卡驱动什么准备好再安装桌面环境。但是我这里将直接讲解桌面环境的安装。因为基本上官方支持的桌面环境都是把我们需要提前安装的那些组件作为依赖来安装的。
首先我们需要选择自己所需要的桌面环境。为什么我不在这里推荐一个？因为每个人喜好不同，各个桌面环境的体验也大不相同，需要知道自己的需求才能选择得相对舒服。

## GNOME
GNOME是GNU基金会的亲儿子，全称The GNU Network Object Model Environment（GNU对地网络模型）。听起来高大上，但是其实是非常容易亲近和理解的。就是安装完能看到的整个视觉上的界面和底层诸多逻辑。
在Archlinux想要安装GNOME非常简单。只需要执行：

```
pacman -S gnome gnome-extra
```
即可完成GNOME全部套件的安装。如果仅需要基础的Shell那么只安装GNOME包组即可。
> 这里区分一个概念:包和包组</br>
> 简单的说，包就是单个软件，而包组从字面上理解就是一些包的集合。

## KDE(KDE PLASMA)

更新：

由于长达一年多用回了KDE，因此后文也会着重讲解KDE的基础配置。