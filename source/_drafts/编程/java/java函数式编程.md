---
title: java函数式编程
categories:
  - 编程
  - 语言
  - java
date: 2023-03-20 20:23:00
tags:
---

hello world

---

### 函数式编程

##### 原理

> 匿名内部类 + lambda表达式

当一个接口**只有一个方法**时

```java
public interface Student{
	String say();
}
```

调用它

```java
teacher.listen(new Student(){
	@Override
	public String say(){
		return "hello";
	}
})
```

改成lambda

```java
teacher.listen(()->"hello");
```

这就成了函数式编程

##### 官方提供的util

被抽象成了四大类：

消费

```java
public interface Consumer<T> {
    void accept(T t);
}
```

转换

```java
public interface Function<T, R> {
    R apply(T t);
}
```

判断

```java
public interface Predicate<T> {
    boolean test(T t);
}
```

创造

```java
public interface Supplier<T> {
    T get();
}
```

