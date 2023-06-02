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

> sqlserver2012，mysql

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

再去掉hello

```sql
select '-' + id from user for xml path('')
--
-1-2-3-4-5-6
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

**于是把 `for xml path()` 和 `stuff()` 融合一下**

就能把1前面的符号去掉了（替换成空字符串）

只能用子查询，还要去重

```sql
--注意拼接的字段，需要转换成字符串类型
select distinct stuff(
    (select '-' + id from user for xml path('')),
    1,1,''    
) 
from user
--
1-2-3-4-5-6
```

##### with as

##### rank和row_number

相同点：

- 语法相同
- 都会生成一个序号。

不同点：

- rank中order by的字段如果相同，生成的序号相同，并且会跳过一些序号

  比如，aabb

  ```sql
  --rank
  1 a
  1 a
  3 b
  3 b
  --row_number
  1 a
  2 a
  3 b
  4 b
  ```

使用如下

> sqlserver

```sql
select 
	--此处指定了根据id排序，也可以不指定，用 order by (select 0) desc
	--但是，根据rank的特性，所有select 0的值都相等，所以最后结果也全都是1
	row_number() over(order by id desc) as no,	
	name
from user	
--
1	zhangsan
2	lisi
```

##### 用row_number做分页



##### while 循环



##### cursor 游标（不推荐使用，性能差）

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

