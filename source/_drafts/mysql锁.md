---
title: mysql锁
categories:
  - null
date: 2023-05-22 14:32:36
tags:
---

hello world

---

[toc]

# 锁的分类

mysql文档：https://dev.mysql.com/doc/refman/5.7/en/innodb-locking.html

部分为机翻，详情看具体的段落

- Shared and Exclusive Locks：共享锁、排它（独占）锁

- Intention Locks：意向锁

- Record Locks：记录锁

- Gap Locks：间隙锁

- Next-Key Locks：下一个key锁

- Insert Intention Locks：插入意向锁

- AUTO-INC Locks：自增锁

- Predicate Locks for Spatial Indexes：空间索引的谓词锁

### 共享锁、排它（独占）锁

Shared and Exclusive Locks：下面简称s（读锁）、x（写锁）

两个事务T1、T2。

T1对某一行添加s锁，T2依然可以再添加s锁，但是不能添加x锁。



