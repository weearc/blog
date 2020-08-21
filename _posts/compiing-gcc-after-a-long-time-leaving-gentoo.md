---
title: 编译安装gcc6.1
tags:
  - linux
  - archlinux
categories:
  - archlinux
abbrlink: 51180
date: 2019-01-23 18:12:53
---

俗话说得好，一回生二回熟，但是时间长了也怕忘。离开了Gentoo那么久也懒得手动编译，但是偶尔也要复习一下为好。

<!--more-->

## 源码获取

这个应该是最简单的了，只要你能找到个镜像站，里面镜像列表都差不多有GNU，里面有诸多项目的源代码，gcc源码也不例外。怎么获取，请自己看着办。

## 展开源码

正常操作

```bash
tar xvf gcc6.1.tar.xz
```

## 定位到源码目录

```bash
cd gcc6.1/
```

建立编译的工作目录：

```bash
makedir build
```

建立工作目录的好处是可以避免编译过程中的中间文件污染源码（大概）。

## 查看编译选项

先简单观察一下Archlinux的gcc编译选项

> gcc 8.2.1

```bash
使用内建 specs。
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-pc-linux-gnu/8.2.1/lto-wrapper
目标：x86_64-pc-linux-gnu
配置为：/build/gcc/src/gcc/configure --prefix=/usr --libdir=/usr/lib --libexecdir=/usr/lib --mandir=/usr/share/man --infodir=/usr/share/info --with-bugurl=https://bugs.archlinux.org/ --enable-languages=c,c++,ada,fortran,go,lto,objc,obj-c++ --enable-shared --enable-threads=posix --enable-libmpx --with-system-zlib --with-isl --enable-__cxa_atexit --disable-libunwind-exceptions --enable-clocale=gnu --disable-libstdcxx-pch --disable-libssp --enable-gnu-unique-object --enable-linker-build-id --enable-lto --enable-plugin --enable-install-libiberty --with-linker-hash-style=gnu --enable-gnu-indirect-function --enable-multilib --disable-werror --enable-checking=release --enable-default-pie --enable-default-ssp --enable-cet=auto
线程模型：posix
gcc 版本 8.2.1 20181127 (GCC) 
```

> gcc 7.4.1

```bash
使用内建 specs。
COLLECT_GCC=gcc-7
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-pc-linux-gnu/7.4.1/lto-wrapper
目标：x86_64-pc-linux-gnu
配置为：/build/gcc7/src/gcc/configure --prefix=/usr --libdir=/usr/lib --libexecdir=/usr/lib --mandir=/usr/share/man --infodir=/usr/share/info --with-bugurl=https://bugs.archlinux.org/ --enable-languages=c,c++,lto --enable-shared --enable-threads=posix --enable-libmpx --with-system-zlib --with-isl --enable-__cxa_atexit --disable-libunwind-exceptions --enable-clocale=gnu --disable-libstdcxx-pch --disable-libssp --enable-gnu-unique-object --enable-linker-build-id --enable-lto --enable-plugin --enable-install-libiberty --with-linker-hash-style=gnu --enable-gnu-indirect-function --disable-werror --enable-checking=release --enable-default-pie --enable-default-ssp --program-suffix=-7 --enable-version-specific-runtime-libs
线程模型：posix
gcc 版本 7.4.1 20181207 (GCC) 
```

前面部分是：

```bash
--prefix=/usr --libdir=/usr/lib --libexecdir=/usr/lib --mandir=/usr/share/man --infodir=/usr/share/info --with-bugurl=https://bugs.archlinux.org/
```

比较有用的部分只有 --prefix 选项。大致都可以看懂：

```bash
--prefix=一级目录 --libdir=二级目录1 --libexecdir=二级目录2 --mandir=二级目录3 --infodir=二级目录4 --with-bugurl=URL
```

对于已经有了内置GCC的发行版，如果照搬选项则不是明智之举，因此按照个人需求将此处选项改为只定义一级目录即可。

```bash
--prefix=$HOME/GCC-6.1
```

