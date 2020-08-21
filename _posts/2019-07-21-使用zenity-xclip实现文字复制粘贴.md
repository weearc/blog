---
title: 使用zenity+xclip实现文字复制粘贴
toc: false
mathjax: false
abbrlink: 5960
date: 2019-07-21 19:27:40
tags:
  - zenity
  - xclip
  - 去他妈的网易云
categories: archlinux
---

都多久了我也不太记得，网易云下竟然由于qt的某个问题不能使用fcitx输入中文了！WTF！不过我们可以曲线救国。

<!--more-->

就算直接不能输入中文我们也有办法暂时解决这个问题。那就是使用zenity+xclip制作一个可输入中文的带有 **GUI** 的一个脚本。

> xclip是Unix以及类Unix系统下非常强大的剪贴板交互程序

我们可以简单看一下xclip的help输出：

```bash
Usage: xclip [OPTION] [FILE]...
Access an X server selection for reading or writing.

  -i, -in          read text into X selection from standard input or files
                   (default)
  -o, -out         prints the selection to standard out (generally for
                   piping to a file or program)
  -l, -loops       number of selection requests to wait for before exiting
  -d, -display     X display to connect to (eg localhost:0")
  -h, -help        usage information
      -selection   selection to access ("primary", "secondary", "clipboard" or "buffer-cut")
      -noutf8      don't treat text as utf-8, use old unicode
      -target      use the given target atom
      -rmlastnl    remove the last newline charater if present
      -version     version information
      -silent      errors only, run in background (default)
      -quiet       run in foreground, show what's happening
      -verbose     running commentary
```

按照功能，我们需要：

1. 输入文字
2. 将文字输入到剪贴板
3. 将文字传给clipboard程序
   

非常简单的三个部分。输入文字部分由zenity负责，同时将输入的文字存入变量中，之后用管道传给xclip程序。

那么需要用到的xclip选项应该就很容易选择了。

```bash
# xclip option
xclip -i  # read text into X selection from standard input or files
xclip --selectron clipboard # copy input to clipboard for output
```

思路明确了以后就非常容易办了，我们再看一下zenity `entry`部分的帮助说明：

```bash
用法：
  zenity [OPTION…]

文字输入选项
  --entry                                显示文本输入对话框
  --text=文字                            设置对话框文字
  --entry-text=文字                      设置输入文字
  --hide-text                            隐藏输入文字
```

也就是说我们只需要使用 `--entry` 选项显示输入框即可，在尝试中发现，bash下执行zenity --entry后会将输入打印到终端，也就是说我们需要将其存为变量才可以使用。因此完整代码如下：

```bash
#!/bin/bash
words_to_copy=$(zenity --entry)
# Use zenity to display a GUI information message.
echo $words_to_copy | xclip -i 
echo $words_to_copy | xclip -sel c
```

