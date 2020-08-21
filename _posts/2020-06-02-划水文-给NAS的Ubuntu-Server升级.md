---
title: '[划水文] 给NAS的Ubuntu Server升级'
toc: false
mathjax: false
tags:
  - Ubuntu
  - 升级
categories:
  - 玩赏
abbrlink: 60365
date: 2020-06-02 16:41:51
---

在给 NAS 升级系统之前我是很忐忑的,毕竟以前有过 Ubuntu 升级滚挂的经历(桌面版)，稍微查了一下似乎没有给 Ubuntu Server 升级的，那我就自己水一篇算了，过程比桌面版稳定很多也不容易出现什么问题。

<!--more-->

首先你可能需要确定一下现在的 Ubuntu 版本：

```bash
cat /etc/os-release
```

大多数 Linux 发行版都可以通过这个方式确定版本号和具体发行版。比如以下三个（我的 NAS、笔记本和救援系统）：

```bash
# os-relase examples
# Ubuntu Server 20.04 LTS
NAME="Ubuntu"
VERSION="20.04 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
# Arch Linux Rolling
NAME="Arch Linux"
PRETTY_NAME="Arch Linux"
ID=arch
BUILD_ID=rolling
ANSI_COLOR="38;2;23;147;209"
HOME_URL="https://www.archlinux.org/"
DOCUMENTATION_URL="https://wiki.archlinux.org/"
SUPPORT_URL="https://bbs.archlinux.org/"
BUG_REPORT_URL="https://bugs.archlinux.org/"
LOGO=archlinux
# OpenSUSE Tumbleweed
NAME="openSUSE Tumbleweed"
VERSION="20200528"
ID="opensuse-tumbleweed"
ID_LIKE="opensuse suse"
VERSION_ID="20200528"
PRETTY_NAME="openSUSE Tumbleweed"
ANSI_COLOR="0;32"
CPE_NAME="cpe:/o:opensuse:tumbleweed:20200528"
BUG_REPORT_URL="https://bugs.opensuse.org"
HOME_URL="https://www.opensuse.org/"
LOGO="distributor-logo"
```

看到 `VERSION` 那行了吗？括号里那个是 Ubuntu 的版本号和发行代号。记住这个，很重要。然后我们前往 [Ubuntu Wiki](https://wiki.ubuntu.com/Releases) 查看一下可选升级的发行代号，虽然怎么升级都差不太多，但是最好还是从 LTS 到 LTS 版本比较好，毕竟服务器系统稳定是第一位的。

接下来和升级 Debian Stable 一样，我们要查看一下现在的 `apt sourceslist` :

```bash
cat /etc/apt/sources.list
-------------------------
# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://mirrors.cqu.edu.cn/ubuntu bionic main restricted
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic main restricted

## Major bug fix updates produced after the final release of the
## distribution.
deb http://mirrors.cqu.edu.cn/ubuntu bionic-updates main restricted
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic-updates main restricted

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team. Also, please note that software in universe WILL NOT receive any
## review or updates from the Ubuntu security team.
deb http://mirrors.cqu.edu.cn/ubuntu bionic universe
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic universe
deb http://mirrors.cqu.edu.cn/ubuntu bionic-updates universe
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic-updates universe

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free licence. Please satisfy yourself as to
## your rights to use the software. Also, please note that software in
## multiverse WILL NOT receive any review or updates from the Ubuntu
## security team.
deb http://mirrors.cqu.edu.cn/ubuntu bionic multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic multiverse
deb http://mirrors.cqu.edu.cn/ubuntu bionic-updates multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic-updates multiverse

## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://mirrors.cqu.edu.cn/ubuntu bionic-backports main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic-backports main restricted universe multiverse

## Uncomment the following two lines to add software from Canonical's
## 'partner' repository.
## This software is not part of Ubuntu, but is offered by Canonical and the
## respective vendors as a service to Ubuntu users.
# deb http://archive.canonical.com/ubuntu bionic partner
# deb-src http://archive.canonical.com/ubuntu bionic partner

deb http://mirrors.cqu.edu.cn/ubuntu bionic-security main restricted
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic-security main restricted
deb http://mirrors.cqu.edu.cn/ubuntu bionic-security universe
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic-security universe
deb http://mirrors.cqu.edu.cn/ubuntu bionic-security multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu bionic-security multiverse
```

看到 `bionic` 了吗？那个是我们现在的代号，我选择升级的 `20.04 LTS` 发型代号为 `Focal Fossa` 所以直接用新的发行代号替换旧的就行。

操作如下：

```bash
# 备份 sources.list
cp /etc/apt/sources.list  /etc/apt/sources.list.bak
# 替换发行代号
sed -i 's/bionic/focal/g' /etc/apt/sources.list
```

可以再 `cat` 一下，此时文件内容变为：

```bash
# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://mirrors.cqu.edu.cn/ubuntu focal main restricted
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal main restricted

## Major bug fix updates produced after the final release of the
## distribution.
deb http://mirrors.cqu.edu.cn/ubuntu focal-updates main restricted
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal-updates main restricted

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team. Also, please note that software in universe WILL NOT receive any
## review or updates from the Ubuntu security team.
deb http://mirrors.cqu.edu.cn/ubuntu focal universe
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal universe
deb http://mirrors.cqu.edu.cn/ubuntu focal-updates universe
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal-updates universe

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free licence. Please satisfy yourself as to
## your rights to use the software. Also, please note that software in
## multiverse WILL NOT receive any review or updates from the Ubuntu
## security team.
deb http://mirrors.cqu.edu.cn/ubuntu focal multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal multiverse
deb http://mirrors.cqu.edu.cn/ubuntu focal-updates multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal-updates multiverse

## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://mirrors.cqu.edu.cn/ubuntu focal-backports main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal-backports main restricted universe multiverse

## Uncomment the following two lines to add software from Canonical's
## 'partner' repository.
## This software is not part of Ubuntu, but is offered by Canonical and the
## respective vendors as a service to Ubuntu users.
# deb http://archive.canonical.com/ubuntu focal partner
# deb-src http://archive.canonical.com/ubuntu focal partner

deb http://mirrors.cqu.edu.cn/ubuntu focal-security main restricted
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal-security main restricted
deb http://mirrors.cqu.edu.cn/ubuntu focal-security universe
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal-security universe
deb http://mirrors.cqu.edu.cn/ubuntu focal-security multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu focal-security multiverse
```

接下来我们 `apt update` 一下更新缓存，然后执行 `apt upgrade` 进行升级。这个阶段可能会报错，不用理会。更新完重启系统，会发现此时还在旧版，但是这次可以进行升级了，直接执行 `apt upgrade` 进行升级，期间会提示包括 `ssh_config` 文件之类的需要进行修改，此时保留旧的配置文件即可，剩下的一路回车直至升级完成。即可完成跨版本升级。

祝使用愉快！

