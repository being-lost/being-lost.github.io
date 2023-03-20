---
title: stream使用
categories:
  - 编程
  - 语言
  - java
date: 2023-03-20 20:34:56
tags:
---

hello world

---

### Stream

parallel：并行流，发挥多核优势进行多线程操作，所以会有并发安全问题，比如排序失效等等。

##### 中间操作

filter：保留为true的

```java
.filter(e-> e.getAge() >= 18) //保留18岁以上的
```

map：返回新元素

```java
.map(User::getAge) //获取所有人的年龄
```

peek：可以操作元素，但保持stream中元素不变

```java
.peek(e-> e.setAge(e.getAge() + 1)) //所有人年龄加1
```

flatMap：从元素中提取多个属性

```java
.flatMap(e-> Stream.of(e.getBankA_Id,e.getBankB_Id)) //获取用户的所有不同银行的卡号
```



---

sorted：排序

limit：只保留前n个，后面的不要（跟mysql差不多）

skip：跳过n个，保留剩下的

distinct：去重（需要重写hash和equals）

---

##### 终结操作

如果没有终结操作，stream是不会执行中间操作的

```java
list.stream().peek(System.out::println); //控制台不会打印
list.stream().peek(System.out::println).collect(xxx); //除非有终结操作
```

