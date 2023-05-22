---
title: cmd、bat语法
tags:
  - 语法
categories:
  - 编程
  - 工具
  - windows
date: 2023-02-21 19:03:00
---

hello world

---

[toc]

### 基础语法

##### 注释：rem、@rem、::

```cmd
rem 这里是注释
@rem 这里是注释
:: 这里是注释
```

##### 打印文本到窗口：echo

```cmd
echo hello
```

##### bat文件执行完，cmd窗口不关闭：cmd

```cmd
echo hello
cmd
```

---

### 一些简单的功能

##### 接收键盘输入信息：set

```cmd
set /p msg= my name is : 
echo your name is %msg%
```

##### 查找文件：for

```cmd
for /r <目录> %<变量名> in (<文件名>) do <命令>
```

打印hello目录下的所有png文件

- 为绝对路径

```cmd
for /r hello %img in (*.png) do @echo %img
```

删除hello目录下的所有开头为test的文件

- 注意del后面的文件名最好用 `""` ，因为目录里可能出现空格

```cmd
for /r hello %testFile in (test*) do @del "@testFile"
```



