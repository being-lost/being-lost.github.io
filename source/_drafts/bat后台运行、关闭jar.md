---
title: bat后台运行、关闭jar
categories:
  - null
date: 2023-06-21 17:06:25
tags:
---

hello world

---

[toc]

### 后台运行jar

新建一个bat文件，注意jar所在的目录

```cmd
start javaw -jar hello.jar
exit
```

### 关闭后台运行的jar

需要提前知道jar包运行的端口，根据port找到pid，最后一列就是pid

```cmd
netstat -ano | findstr 8080
```

根据pid杀死进程，`-f`表示强制

```cmd
taskkill /pid 4548  -t  -f
```

> todo：-t 是啥