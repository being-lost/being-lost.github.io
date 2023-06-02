---
title: docker中安装vim
tags:
  - docker
  - linux
categories:
  - 编程
  - 工具
  - docker
date: 2023-02-01 09:53:32
---

docker里的image有的干净到连vi、vim都没有。

### 步骤

转载 https://blog.csdn.net/qq_33770578/article/details/125748826

1. 安装命令

   ```
   apt-get install vim
   ```

   如果出现

   ```
   Reading package lists... Done
   Building dependency tree       
   Reading state information... Done
   E: Unable to locate package vim
   ```

   需要更新apt，然后再次install，比较慢

   ```
   apt-get update
   ```

