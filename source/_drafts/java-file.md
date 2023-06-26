---
title: java-file
categories:
  - null
date: 2023-06-25 14:33:08
tags:
---

hello world

---

[toc]

创建一个文件对象

```java
//这个文件可以不存在
String path = "D:\\hello\\test.txt"; 
//也可以是一个文件夹
path = "D:\\hello";	
new File(path)
```

通过`file`对象创建文件

```java
File file = new File("D:\\aa\\bb\\test.txt");
file.createNewFile(); //如果bb文件夹不存在，就会报错

//这样做更好
File parentFile = file.getParentFile();
if(!parentFile.exist()){
	parentFile.mkdirs();//如果aa也不存在，会同时创建aa和bb
}
file.createNewFile();
```

路径问题

```java
new File(""); //默认为当前的项目路径，打包后也就是jar包的路径
```

