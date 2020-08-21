---
title: Firefox每夜构建食用指南
tags:
  - firefox
  - archlinux
  - linux
  - firefox-nightly
categories:
  - tools
abbrlink: 55829
date: 2018-08-25 16:04:16
---
可能和你想的不大一样，这是个不算完善的方法，但保证好用。

<!--more-->

# Firefox下载及”安装“

首先说明一下，[archlinuxCN repo](https://github.com/archlinuxcn/repo)里面有每夜构建版本的Firefox，而且是四种语言版本:简体中文，正體中文，日本語，English(US)。但是这是我事后才知道的。话说回来，就算是使用了Mozilla官方的版本其实还是一个不错的选择。毕竟是预编译可执行文件，位置随意放置，比如我就放到了 **opt**下面。如果熟悉.desktop文件编写的话只要自己写个启动器就好，简单明了。这点还是要感谢一下Mozilla的打包方式，解压后的文件名统一就是Firefox。因此也可以做到多个Firefox版本共存。
由于一些不可见光的原因，国内用户在百度搜索Firefox浏览器的时候会被redirect到火狐浏览器那里</br>

> 好了你看到了，我把Firefox与火狐作了区分

为什么？因为你要是仔细观察就会发现不光是安装程序和协议，就连官网本身都并不相同（不只是语言），国内官网是被阉割过的。因此想要下载Mozilla软件请一定要认准Mozilla的官方地址，根据其性质是以org域名。[传送门](https://www.mozilla.org/zh-CN/firefox/)。Mozilla有CDN加持，国内访问速度尚可。
接下来就是直接将页面拖到最低端，选择 [**Beta、Nightly、Developer Edition**](https://www.mozilla.org/zh-CN/firefox/channel/desktop/)然后找到那个非常酷炫的nightly图标，点进去进行下载。
Mozilla会在你进行下载的时候对系统进行判断，Linux下载后会得到一个以tar.bz2作为扩展名的归档文件。直接移动到/opt目录下面，获取root权限并解压：
``` bash
tar -xvf firefox-nightly-版本号.0a1.tar.bz2
```
我这里写版本号诸君都能看懂吧，不要傻乎乎地复制粘贴。解压后会自动生成目录Firefox，此时在家目录下建立Firefox-nightly.desktop文件并填入以下内容（遵循X11标准，部分是KDE标准，DBUS部分可以不用理会）
```bash
[Desktop Entry]
Comment[zh_CN]=
Comment=
Exec=/opt/firefox/firefox
GenericName[zh_CN]=
GenericName=
Icon=/opt/firefox/browser/chrome/icons/default/default128.png
MimeType=
Name[zh_CN]=firefox nightly
Name=firefox nightly
Path=
StartupNotify=true
Terminal=false
TerminalOptions=
Type=Application
X-DBUS-ServiceName=
X-DBUS-StartupType=
X-KDE-RunOnDiscreteGpu=false
X-KDE-SubstituteUID=false
X-KDE-Username=
```
这里需要注意一点就是我偷懒了，实际上的写法应该参考archlinuxCN的Firefox-nightly.desktop：
```bash
[Desktop Entry]
Name=Firefox Nightly
GenericName=Web Browser
Comment[zh_CN]=浏览互联网
Exec=firefox-nightly --class=FirefoxNightly %u
Icon=firefox-nightly
Terminal=false
Type=Application
MimeType=text/html;text/xml;application/xhtml+xml;application/vnd.mozilla.xul+xml;text/mml;x-scheme-handler/http;x-scheme-handler/https;
StartupNotify=true
StartupWMClass=FirefoxNightly
Categories=Network;WebBrowser;
Keywords=web;browser;internet;
Actions=new-window;new-private-window;
[Desktop Action new-window]
Name=New Window
Name[zh_CN]=新建窗口
Exec=firefox-nightly --class=FirefoxNightly --new-window %u
[Desktop Action new-private-window]
Name=New Private Window
Name[en_US]=New Private Window
Name[zh_CN]=新建隐私浏览窗口
Exec=firefox-nightly --class=FirefoxNightly --private-window %u
```
在这个写法中能够实现隐私窗口的调用，使得功能上更加完善。
至此Firefox-nightly安装完毕。你以为这就可以满足我了吗？才怪。

# 自升级脚本编写
## 升级模块
### 下载模块
很简单，如果通过Firefox下载浏览器新版本的话能够直接看到下载的链接，形如：https://download-installer.cdn.mozilla.net/pub/firefox/nightly/latest-mozilla-central-l10n/firefox-59.0a1.zh-CN.linux-x86_64.tar.bz2 。 那么之后就只需要替换版本号就可以了。但是也存在一个问题，就是如果版本号写死了，那么之后的升级操作通过执行脚本就显得很困难，而且最多只能保持在某一版本号这短暂的生命周期内。因此结合以前学习archlinux的PKGBUILD编写时某贴吧大佬的提示，将版本号全部使用 **$pkgver** 代替。根据bash的语法。此变量的声明应该在头部进行而且使用$声明的变量应该是有前部程序输出的。但是毕竟本人能力有限还不能够写出能直接被识别的变量名称（毕竟web地址特殊字符不少）。</br>
因此，思路是首先编写版本号文件pkgver.txt，在这个文件中输入版本号，借由cat命令执行输出并对之后变量的引用进行输入。
因此,整个过程简化为：
```@bash
cd /opt
_pkgver=$(cat pkgver.txt)
wget https://download-installer.cdn.mozilla.net/pub/firefox/nightly/latest-mozilla-central-l10n/firefox-$_pkgver.0a1.zh-CN.linux-x86_64.tar.bz2
tar -xvf firefox-$_pkgver.0a1.zh-CN.linux-x86_64.tar.bz2 #解压时会自动覆盖
rm -xvf firefox-$_pkgver.0a1.zh-CN.linux-x86_64.tar.bz
```
### 权限判断模块
上面我们讲了升级的基本操作：下载包，解压，删除。但是我们需要注意一点，我们在执行脚本时身份不是root，这样会容易造成麻烦。因此需要添加一个简单的身份验证模块,整个过程借由if语句:
```@bash
if [[ $EUID -eq 0 ]]
then    cd /opt
    _pkgver=$(cat pkgver.txt)
    wget https://download-installer.cdn.mozilla.net/pub/firefox/nightly/latest-mozilla-central-l10n/firefox-$_pkgver.0a1.zh-CN.linux-x86_64.tar.bz2
    tar -xvf firefox-$_pkgver.0a1.zh-CN.linux-x86_64.tar.bz2 #解压时会自动覆盖
    rm -xvf firefox-$_pkgver.0a1.zh-CN.linux-x86_64.tar.bz;else
    echo "Please run it use sudo or as root user!";
fi
```
提示一点，千万不要忘记bash中if对空格敏感...还有就是分号不要忘记。
## 版本号模块
正常来说的话，我们手动下载新构建的nightly时，Firefox会自动调用函数向上游发出请求来判断是否需要更新，但是我们自己的话就没有办法是用这个。因此我们需要手动构建一个。
上面已经可以知道我们有一个名为 **pkgver.txt** 的额外的文件用来检测版本号。然后我们也很容易发现如果尝试下载旧版本的包时候会返回404。那么，这样思路就很明确了：
- 使用curl来获取http_code
- 使用tail，利用管道获取上面的返回值并剪切
- 使用一个循环来不断调用版本号的函数

那么可以利用以下代码：
首先定义一个_link来存放链接
```@bash
_link=https://download-installer.cdn.mozilla.net/pub/firefox/nightly/latest-mozilla-central-l10n/firefox-$_pkgver.0a1.zh-CN.linux-x86_64.tar.bz2
```
然后使用curl来获取http_code
```@bash
curl -I -s --connect-timeout 5 $_link -w %{http_code}
```
此时应该可以正常获取到网页或者该文件信息了。
使用管道：
```@bash
curl -I -s --connect-timeout 5 $_link -w %{http_code}
```
定义到新的变量：
```@bash
$_httpcode=(curl -I -s --connect-timeout 5 $_link -w %{http_code})
```
## 夜间定时检测任务添加
TODO：</br>
- [x] 基础模块编写
- [x] 发行版判断并可切换下载器
- [x] 代理功能
- [] 后续脚本优化