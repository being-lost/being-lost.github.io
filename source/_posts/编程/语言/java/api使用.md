---
title: api使用
categories:
  - 编程
  - 语言
  - java
date: 2023-03-20 20:47:58
tags:
---

hello world

---

### java一些Api使用

#### map

##### computeIfAbsent

没有就赋值，返回赋值

```java
map.computeIfAbsent(key,e->new String());
//等同于
if(map.get(key)==null){
	String value = new String();
    map.put(value);
    return value;
}
```

##### putIfAbsent

有就返回

没有就赋值，返回null

```java
map.putIfAbsent(key,new String())
//等同于
String value = map.get(key);
if(value == null){
	value = new String();
    map.put(value);
    return null;
}else{
    return value;
}
```



