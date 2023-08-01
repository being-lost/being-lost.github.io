---
title: markdown语法
categories:
  - 语法
date: 2023-05-19 10:13:07
tags:
---

hello world

---

[toc]

### 常用

##### 列表

- hello

```
- hello
```

1. hello
2. world

```
1. hello
2. world
```

##### 删除线

~~这一句划掉~~

```
~~这一句划掉~~
```

##### 高亮

==这里高亮==

```
==这里高亮==
```

##### 代码块

`hello`

```
`hello`
```

三个```

~~~
```java
class User{}
```
~~~

##### todoList

- [ ] hello
- [x] world

```markdown
- [ ] hello
- [x] world
```

##### 引用

> hello

```
> hello
```

##### 表格

太复杂了，懒得敲，直接用typora快捷键 `ctrl t`

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |

##### 目录

```
[toc]
```

---

### 复杂

##### 流程图

```flow
st=>start: 闹钟响起
op=>operation: 与床板分离
cond=>condition: 分离成功?
e=>end: 快乐的一天

st->op->cond
cond(yes)->e
cond(no)->op
```

##### 时序图

```sequence
aa->bb:hello
cc->bb:hello
note right of dd:damn
```

```mermaid
sequenceDiagram
%% - ：1=实 2=虚
%% > ：1=无箭头 2=有
a->b:->
a-->b:-->
a->>b:->>
a-->>b:-->>
a-xb:-x
a--xb:--x
%%
a->+b:a -> + b
a->b:a->b
b-->-a:b --> - a
%%别名
participant c as hello
c->b:participant .. as ..
%%注释
note left of a:note left of a
note right of a:note left of a
note over a,b:note left of a,b <br/> 换行
%%for循环
loop hello
	a->b:here is loop
end
%%if条件
alt age >= 18
	a ->> b : xx
else 13 <= age < 18
	a ->> b : xx
else age < 12 
	a ->> b : xx	
end
```



##### 公式

> todo：markdown公式