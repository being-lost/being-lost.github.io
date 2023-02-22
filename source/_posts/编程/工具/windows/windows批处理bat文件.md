---
title: windows批处理bat文件
tags:
  - 语法
categories:
  - 编程
  - 工具
  - windows
date: 2023-02-21 19:03:14
---

### 语法

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

##### bat文件执行完，cmd窗口不关闭：pause、cmd

pause 按任意键直接关闭，不能继续输入命令

```cmd
echo hello
pause
```

cmd 可以接着输入命令

```cmd
echo hello
cmd
```



