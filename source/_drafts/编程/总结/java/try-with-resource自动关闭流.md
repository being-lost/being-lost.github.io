---
title: try-with-resource自动关闭流
categories:
  - java
  - 基础
  - 语法
date: 2023-05-18 17:16:59
tags:
---

hello world

---

[toc]

### 作用

一些资源需要手动close，还要在finally里面来回判断，不优雅。

于是java推出自动关闭的语法。

### 基础使用

```java
try(FileInputStream fileInputStream = new FileInputStream("")){
    //xxx
}catch(Exception e){}
```

还可以在另一个方法里关闭

> todo：debug时确实进入了close方法，没有进一步测试

```java
public void open(){
	test(new FileInputStream(""));   
}
//这样也能关闭流
public void test(InputStream inputStream){
	try(InputStream test = inputStream){
	    //xxx
	}catch(Exception e){}
}
```

### 关闭顺序

close => catch => finally

```java
public static void main(String[] args) {
    try(TestCloseable test = new TestCloseable()) {
        throw new RuntimeException("throw Exception");
    } catch (Exception e) {
        System.out.println("2");
    }
    finally {
        System.out.println("3");
    }
}

public static class TestCloseable implements Closeable {
    @Override
    public void close() throws IOException {
        System.out.println("1");
    }
}
```

