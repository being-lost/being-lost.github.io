---
title: oltp和olap
categories:
  - null
date: 2023-05-22 15:11:56
tags:
---

hello world

---

[toc]

### 解释

oltp：

- OnLine Transaction Processsing

- 可以理解为普通的crud业务

- 数据存在数据库中

- 要求响应快、高并发、低延迟

  对应阿里开发手册中，禁止超过3个表以上的join查询，

  因为性能太差，以及复杂查询可能导致数据库崩溃。

olap：

- OnLine Analytical Processing
- 用于解决上面的问题，允许使用各种复杂的sql，主要做数据分析、报表等等
- 数据存在**数据仓库**中

### 做法

把crud的数据复制到数据仓库里，两边互不影响。

### 记忆

记住olap中的a是analysis（分析）的意思就行了