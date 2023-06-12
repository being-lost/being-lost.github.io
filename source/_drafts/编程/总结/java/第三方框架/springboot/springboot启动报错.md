---
title: springboot启动报错
tags:
  - bug
categories:
  - 编程
  - 语言
  - java
  - 框架
  - springboot
date: 2023-03-03 14:27:02
---

hello world

---

### 启动报错，yaml相关异常

解决：

- 临时方案，删除yml中的中文注释
- 正确姿势，idea中setting，搜索encoding，在file encoding中把能改的都改成tf-8，清完后先clean一下

### 启动报错，读取不到application.yml

解决：

- 特殊情况，pom.xml中修改了打包输出的位置，注释掉

### 启动报错，找不到主类

原因：未知

解决：

- 用maven先clean一下，再重启试试

- 在pom.xml中的springboot插件中，指定mainClass

  ```xml
  <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <version>${version.springboot}</version> 
      <configuration>
          <!-- 指定main方法入口 -->
          <mainClass>com.example.demo.DemoApplication</mainClass>
      </configuration>
  </plugin>
  ```