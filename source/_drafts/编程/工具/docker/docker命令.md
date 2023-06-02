---
title: docker命令
tags:
  - docker
  - 语法
categories:
  - 编程
  - 工具
  - docker
date: 2023-02-21 19:03:14
---

### docker

##### 创建新容器，并启动：run

```

```



##### 启动已有容器：start

```cmd
docker start <command> <name>
-i 直接进容器里敲命令
```

##### 在外面执行容器里的命令：exec

```cmd
docker exec <command> <name> {}
```

{}表示容器内部的命令，大多是linux相关的

##### 进入容器：

```cmd
docker exec -it name /bin/bash
```

退出容器，但容器保持后台运行：`ctrl + p + q`

