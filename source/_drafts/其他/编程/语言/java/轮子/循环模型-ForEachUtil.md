---
title: 循环模型-ForEachUtil
categories:
  - 编程
  - 语言
  - java
  - 轮子
date: 2023-04-06 20:09:29
tags:
---

hello world

---

# ForEachUtil

抽象出一些**简单**、**常用**的循环模型，然后以一种优雅的方式来处理。

通过方法名，就能清晰地看出，这一段循环做了什么事。

### 优缺点

优点：

- 优雅
- 容易理解，方便维护

缺点：

- 需要new非常多东西
- debug比较不方便

### 方法（方法名暂定）

##### if_then

```java
for(T t:list1){
	for(R r:list2){
        if(){
            //xxx
        }
    }
}
```

