---
title: 右键打开cmd
tags:
  - 便捷小技巧
  - 实操教学
  - windows
categories:
  - 编程
  - 工具
  - windows
date: 2023-01-14 19:03:14
---

##### 打开注册表

```
win + r
输入regedit
```

##### 找到文件夹位置

```
HKEY_CLASSES_ROOT
- Directory
  - Background
    - shell
```

##### 新建项（文件夹），名字随意

```
shell
- openCmd
  - command
```

##### openCmd中（右边的窗口）

**右键（默认）**，点击**修改**，输入：**在此处打开cmd**

> 此时去桌面右键，就会多一个选项

**右键空白处**，点击**新增字符串**，**重命名**为Icron
**右键Icon**，点击**修改**，输入：cmd.exe

> 再去桌面右键，选项会显示图标
>
> 也可以随便输入一个绝对路径，

