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

脑图草稿

```
锁机制
	实现的方式分类
		乐观锁
			认为冲突的情况很少，所以不加锁
			一般由用户自己实现
			实现方式
				版本号
				时间戳
		悲观锁
			认为很容易造成冲突
		悲观锁的资源消耗会更大
	mysql的锁机制（悲观锁）
		通常来说，锁的粒度（范围）分类
			行锁
			页锁
			表锁
		锁的功能分类
			共享锁（share）简称s锁，别名读锁
				一个事务对某一行加了s锁，其他事务
					可以加s锁
					不能加x锁
				select加s锁
				读取完之后就会自动解锁
			独占锁（exclusive）简称x锁，别名写锁
				简述：只允许一个事务锁定，其他任何事务都不能访问
				一个事务对某一行加了x锁，其他事务不能加任何锁
				一个事务对某一行加了任何锁，其他事务不能加x锁
				insert、update、delete加x锁
			意向锁（intention）
				粒度只有表锁
				作用
					简述：让表级x锁快速失败的判断
					A事务持有一个行级s锁
					此时，B事务来请求表级x锁
					如果遍历整张表来判断，每一行是否被锁住的话，效率很低
					所以A事务加行级s锁的时候，引擎会先自动申请表级的意向锁
					事务B就只需要判断有没有意向锁就行了，提高效率
			子主题 4
		不同引擎的功能不同
			innodb实现了行锁、表锁
			myisam实现了表锁
		innodb
			行锁是加在索引上的
				只有where条件查的是索引字段，才会加行锁
					select * from user where id = 1
				否则都会变成表锁
					select * from user where name = ''
```



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



