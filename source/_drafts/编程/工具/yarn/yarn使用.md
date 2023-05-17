---
title: yarn使用
tags:
  - 包管理
categories:
  - 编程
  - 工具
  - yarn
date: 2023-02-21 19:03:14
---

### yarn

```
https://yarnpkg.com
```

##### 安装

nodejs版本16以上自带，开启就行了。

windows需要管理员权限打开cmd

```cmd
corepack enable
```

##### 下载依赖：add

全局安装

```cmd
yarn global add <name>
```

---

#### 踩坑：

##### add后如果cmd找不到命令

查看add的bin目录，然后加到环境变量里去

```cmd
yarn global bin
```

