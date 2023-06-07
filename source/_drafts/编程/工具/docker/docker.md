---
title: docker
tags:
  - docker
  - 语法
categories:
  - 编程
  - 工具
  - docker
date: 2023-02-21 19:03:14
---

# 基础知识

##### 解决痛点



##### 术语、概念

- **镜像（Image）**：一个最小的系统。比如ubuntu:16.04就是一个最小、最干净的能运行ubuntu的系统。
- **仓库（Repository）**：用来保存镜像，跟maven仓库同理。
- **容器（Container）**：根据镜像创建容器，然后就可以在容器里可劲儿地造。

> 镜像和容器的关系，可以类比为：
>
> 用户下载一个电脑操作系统（下载镜像），安装到一台电脑上（创建容器）。
>
> 电脑用久了，想要重装系统，就等于用镜像重新创建一个容器。

# 命令

### 通过一个完整的流程，来熟悉命令

```flow
st=>start: 查看本地镜像 docker images
hasImage=>condition: 有没有自己想要的？
pullImage=>operation: 获取镜像 docker pull node:latest
hasContainer=>operation: 查看本地容器 docker ps
container=>condition: 创建容器，是否启动
runContainer=>operation: 创建容器，启动，并进入 docker run
createContainer=>operation: 创建容器，不启动 docker create
openContainer=>operation: 启动容器 docker start
enterContainer=>operation: 进入容器 docker exec
quitContainer=>operation: 退出容器 exit
deleteContainer=>operation: 删除容器 docker rm

st->hasImage
hasImage(yes)->hasContainer
hasImage(no)->pullImage->hasContainer
hasContainer->container
container(yes)->runContainer
container(no)->createContainer->openContainer->enterContainer
enterContainer->quitContainer
runContainer->quitContainer
quitContainer->deleteContainer
```

### 主要命令

#### 查看

查看本地镜像

```
docker images
```

查看本地容器，默认显示正在运行中的

```
docker ps <option>
option:
	-a 显示所有
```

#### 容器

> option为docker的选项
>
> command为容器内部可运行的命令，比如创建linux容器，那么command里就可以填linux命令。最常用的就是 `/bin/bash`

##### run、create

两者语法相同

```cmd
docker run <option> <镜像名> <command>
常用option:
	-d: 后台运行容器，并返回容器ID；
	-i: 以交互模式运行容器，通常与 -t 同时使用；
	-t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
	-p: 指定端口映射，格式：主机(宿主)端口:容器端口

	--name: 为容器指定一个名称；

    --volume , -v: 绑定一个卷
	    格式：主机目录：容器目录	
```

例句

```
docker run -it --name test -p 8080:9090 -v E:\test:/data node /bin/bash
```

##### start、stop、restart

这里只有两个option，所以如果有些设置没弄好，只能重新创建容器

```cmd
docker start <option> <容器名>
option：
	-i 直接进容器里敲命令
	-a
```

##### 在外面执行容器里的命令：exec

```cmd
docker exec <option> <容器名> <command>
option： 
    -d :分离模式: 在后台运行
    -i :即使没有附加也保持STDIN 打开
    -t :分配一个伪终端

```

##### 进入容器

```cmd
docker exec -it name /bin/bash
```

##### 退出容器

`exit`：退出并关闭容器

`ctrl + p + q`：退出，容器保持后台运行：

