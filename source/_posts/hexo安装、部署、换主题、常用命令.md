---
title: hexo安装、部署、换主题、常用命令
date: 2023-01-31 21:38:46
tags:
- hexo
- git
- 实操教学
---

基础的官网都有。

### 一条龙

##### 换主题

初始化——换主题——部署到GitHub——hexo源文件推送到分支

1. 初始化

   ```
   hexo init
   ```

2. 换主题Icarus，各个主题的github主页有，尽量用npm安装

   - git clone很慢
   - cnpm下完该主题有bug，没找到解决方案

   ```
   npm install hexo-theme-icarus
   ```

3. 修改配置文件 _config.yml 的 theme

4. 启动看效果

   ```
   hexo s
   ```

---

##### 部署

1. 安装部署插件

   ```
   npm install hexo-deployer-git --save
   ```

2. 一键部署

   ```
   hexo d
   ```

##### 推送hexo目录下源文件到github分支（方便换电脑的时候）

1. 初始化git

   ```
   git init
   ```

2. 添加远程仓库

   ```
   git remote add 自定义仓库别名 仓库地址
   ```

3. 提交所有东西，hexo自带.gitignore

   ```
   git add --all
   git commit -m "first commit"
   ```

4. 新建一个分支hexo，推送上去

   ```
   git checkout hexo
   git push 上面的仓库别名 hexo
   ```

   

