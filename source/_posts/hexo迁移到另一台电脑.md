---
title: hexo迁移到另一台电脑
date: 2023-02-21 09:53:32
tags:
- hexo
- 实操教学
---

### hexo迁移

`hexo init`只是生成一些初始化文件，如果这些文件整个上传github，到时候直接`git clone`就能用



1. clone到当前文件夹

   ```cmd
   git clone <url> .
   ```

2. 切换到存hexo源文件的branch

   ```
   git checkout <name>
   ```

3. 安装依赖

   ```
   yarn
   ```

   或

   ```
   npm install
   ```

#### 踩坑

`yarn` 命令有的时候会卡死在 `Linking dependencies` ，但其实重新开个cmd窗口就已经能用了。

那个卡死的窗口，目前除了重启电脑，没找到别的办法。

