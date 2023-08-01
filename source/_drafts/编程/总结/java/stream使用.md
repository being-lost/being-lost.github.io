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

### 最简单的例子

需求：获取所有user的age，并添加到一个新的数组中

```java
List<User> userList ;
List<Integer> ageList = userList
    .stream() //转成stream对象
    .map(user -> user.getAge()) //中间操作：map转换
    .collect(Collect.toList()); //终结操作：重新收集成list
```

相当于

```java
List<User> userList ;
List<Integer> ageList = new ArrayList();
userList.forEach(user->{
	ageList.add(user.getAge())
});
```

##### 注意

如果没用终结操作，中间操作是不会执行的

```java
list.stream().peek(System.out::println); //控制台不会打印
list.stream().peek(System.out::println).collect(xxx); //除非有终结操作
```

### 中间操作

##### filter

保留为true的

```java
.filter(e-> e.getAge() >= 18) //保留18岁以上的
```

##### map

返回值将作为stream后续操作的新元素

```java
.map(User::getAge) //获取所有人的年龄
```

##### peek

和map类似，但是没有返回值，后续stream还是操作之前的元素

```java
.peek(e-> e.setAge(e.getAge() + 1)) //所有人年龄加1
```

##### flatMap

和map类似，但是返回值是一个stream，相当于将多个stream中的元素合并，并作为后续操作的元素

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

##### toList

##### toSet



---

parallel：并行流，发挥多核优势进行多线程操作，所以会有并发安全问题，比如排序失效等等。