---
title: springboot启动报错
tags:
  - bug
categories:
  - 编程
  - 语言
  - java
  - 框架
  - springboot
date: 2023-03-03 14:27:02
---

hello world

---

## 无法启动程序，yaml相关异常

解决：

- 临时方案，删除yml中的中文注释
- 正确姿势，idea中setting，搜索encoding，在file encoding中把能改的都改成tf-8，清完后先clean一下

## 无法启动程序，读取不到application.yml

解决：

- 特殊情况，pom.xml中修改了打包输出的位置，注释掉

