---
title: sql一些特殊语法
categories:
  - 编程
  - 语言
date: 2023-03-20 20:18:17
tags:
---

hello world

---

### sql特殊语法

> 这里的数据表示支持该功能的数据库

##### concat()

拼接字符串，会自动转换类型

> sqlserver-2012,mysql

```sql
select concat(id,'-',name,'adfadsf') from user
```

##### cast()

修改数据类型

> sqlserver

```sql
select cast(age as varchar) from user
```



##### case when

判断语句，类似if

> 可用于：mysql，sqlserver

```sql
case when <boolean> then <A> else <B> end
```

示例

```sql
select
case 
	when age < 12 then 'aaa'
	when age > 12 and age < 18 then 'bbb'
	else 'ccc'
end as msg
from user
```

##### for xml path()

转成xml

> 可用于：sqlserver

示例：

```xml
select id,name from user for xml path('')
--
<id>1</id>
<name>张三</name>
```

```xml
select id,name from user for xml path('hello')
--
<hello>
    <id>1</id>
    <name>张三</name>
</hello>
```

获取一列的所有数据，转换成一条记录，并用 `,` `-` 等分隔符隔开

```xml
select '-' + id from user for xml path('hello')
--
<hello>
	-1-2-3-4-5-6
</hello>
```

##### stuff()

类似于replace，替换字符串

> 可用于：sqlserver

```
stuff(<数据>,<从哪里开始>,<删掉几个字符>,<填充的字符>)
```

示例：

```sql
select stuff('你好',1,1,'hello') from user
--
hello好
```



##### with as



##### rank() over(order by)

可以用来增加一个序号列

> sqlserver

```sql
select 
	rank() over(order by id desc) as no,
	name
from
	user	
--
1	zhangsan
2	lisi
```

如果只有单个字段，可以用子查询

```sql
select 
	rank() over(order by temp.name) as no,
	temp.name
from
	(select name from user) temp
```

##### while 循环



##### cursor 游标

相当于for循环

> sqlserver

和java类比一下

```java
userList.stream().map(User::getAge).forEach(e->
	if(e > 18){
        System.out.println("hello world")
    }     
)
```

```sql
declare @i int
--1.定义一个游标，相当于map(User::getAge)
declare test_cursor cursor for (select age from user)
--2.打开游标
open test_cursor
--3.开始循环，差不多手动for循环
fetch next from test_cursor into @i
	--固定写法
	while @@FETCH_STATUS = 0
	begin	
		if @i > 18
			print 'hello world'
		--固定写法，相当于for下一个	
        fetch next from test_cursor into @i
	end
--3.关闭	
close test_cursor
--4.释放资源
deallocate test_cursor
```

抽象语法

```sql
declare @<param> int
declare <cursorName> cursor for (<sql>)
open <cursorName>
fetch next from <cursorName> into @<param>
	while @@FETCH_STATUS = 0
	begin
        fetch next from <cursorName> into @<param>
	end
close <cursorName>
deallocate <cursorName>
```

