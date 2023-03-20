---
title: java和c#之间的byte转换
categories:
  - 编程
  - 语言
  - java
date: 2023-03-03 14:41:55
tags:
---

hello world

---

##### java和c#的byte互相转换

java中，byte为-128~127
c#中，byte为0~255

```java
//0~127两边相同
//128~255需要转换
//需要用int接收c#的数据
public Byte convert(int data){
    if(0<=data && data<=127)
        return (byte)data;
    else if(128<=data && data<=255)
        return (byte)(data - 256);
    else
        return null;
}
```