---
title: java队列queue接口
categories:
  - java
  - 原生库
  - 集合类
date: 2023-05-19 11:24:35
tags:
---

hello world

---

[toc]

### 接口方法速览

##### 加入队列

```java
//区别：超出容量，offer不报错
boolean add(E e);
boolean offer(E e);
```

##### 获取元素，并删除

```java
//区别：队列为空，poll不报错
E remove();
E poll();
```

##### 获取元素，但是不删除

```java
//区别：队列为空，peek不报错
E element();
E peek();
```

