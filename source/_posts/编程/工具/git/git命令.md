---
title: git命令
tags:
  - git
  - 语法
categories:
  - 编程
  - 工具
  - git
date: 2023-02-21 19:03:14
---

### 语法

##### 克隆仓库：clone

默认在当前路径下创建一个文件夹

可以用 `.` 表示clone到当前路径

```
git clone <git地址> <clone到哪个文件夹>
```

##### 初始化

需要在一个空的文件夹

```
git init
```

##### .gitignore文件

```java
test.txt //忽略这个文件
test //忽略这一整个文件夹，包括里面的东西
```

##### 查看文件列表，哪些提交了，哪些没提交（重要）

```
git status
```

里面的提示很详细了

##### 添加到暂存区

```java
git add <fileName> //添加文件，或者整个文件夹里所有文件
git add --all //添加所有
```

##### 从暂存区移除

```js
git rm --cached <fileName> //移除单个文件
git rm --cached -r <fileName> //移除整个文件夹，包括里面的所有文件
```

##### 回滚文件内容

```java
git restore <fileName> //回滚单个文件的内容，或者一整个文件夹里文件的内容
git restore --staged <fileName> //回滚文件的状态
```

##### 提交

```
git commit
```

##### 帮助文档

```
git --help
```

---

### 分支

##### 查看所有分支，以及当前是哪个分支

```
git branch
```

##### 创建分支

```
git branch <name>
```

##### 切换分支

```
git checkout <name>
```

### 仓库

##### 添加远程仓库：remote

```
git remote add <url太长，取个别名> <url>
```



