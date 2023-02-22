---
title: jdbc数据库连接
tags:
  - 胶水代码
categories:
  - 编程
  - 语言
  - java
date: 2023-02-21 19:03:14
---

数据源

```java
String url = "jdbc:sqlserver://192.168.5.207:1433;DatabaseName=RegisterSystem";
String username = "sa";
String password = "123456";
DruidDataSource dataSource = new DruidDataSource();
dataSource.setUrl(url);
dataSource.setUsername(username);
dataSource.setPassword(password);
```

