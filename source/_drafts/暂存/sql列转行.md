### 需求一：

学生的考试成绩表

```sql
select name,subject,score from user
```

| name | subject | score |
| ---- | ------- | ----- |
| a    | 语文    | 80    |
| b    | 语文    | 60    |
| a    | 数学    | 70    |
| b    | 数学    | 50    |

需要行转列，变成

| name | 语文 | 数学 |
| ---- | ---- | ---- |
| a    | 80   | 70   |
| b    | 60   | 50   |

---

#### 分析

首先可以判断用了别名`as`

```sql
xxx as '数学'
```

值是score，并且用了判断语句

所以很自然地想到

```sql
select
	name,
	(case when subject = '语文' then score else 0 end) as '语文',
	(case when subject = '数学' then score else 0 end) as '数学'
from
	user
```

| name | 语文 | 数学 |
| ---- | ---- | ---- |
| a    | 80   | 0    |
| b    | 60   | 0    |
| a    | 0    | 70   |
| b    | 0    | 50   |

name需要分组，很自然想到了group by

那80和0怎么合并呢？用`max`函数，所以上面用了`else 0`

所以最后的sql如下

```sql
select
	name,
	max(case when subject = '语文' then score else 0 end) as '语文',
	max(case when subject = '数学' then score else 0 end) as '数学'
from
	user
group by
	name
```

---

### 需求二：

经过多次联考，需要统计学生总分

| version | name | subject | score |
| ------- | ---- | ------- | ----- |
| 1       | a    | 语文    | 80    |
| 1       | b    | 语文    | 60    |
| 1       | a    | 数学    | 70    |
| 1       | b    | 数学    | 50    |
| 2       | a    | 语文    | 85    |
| 2       | b    | 语文    | 65    |
| 2       | a    | 数学    | 75    |
| 2       | b    | 数学    | 55    |

需要行转列，变成

| name | 语文  | 数学 |
| ---- | ----- | ---- |
| a    | 80+85 |      |
| b    | 60+65 |      |

---

#### 分析

唯一的区别是，里面用了sum，外面不能再套聚合函数了，所以需要用到子查询

```sql
select name,max(语文),max(数学)
from
	(select
        name,
        (case when subject = '语文' then sum(score) else 0 end) as '语文',
        (case when subject = '数学' then sum(score) else 0 end) as '数学'
    from
        user
    group by
     	name,score
    ) as t
group by name     
```

### 动态列名

需要用到变量















