---
title: jdbc常用数据库url写法
categories:
  - null
date: 2023-06-02 13:14:29
tags:
---

hello world

---

[toc]

##### mysql

依赖

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

配置

https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-jdbc-url-format.html

```yml
url: jdbc:mysql://localhost:3306/test?&useUnicode=true&characterEncoding=utf8
driver-class-name: com.mysql.cj.jdbc.Driver
username: root
password: 123456
```

常用参数解释

| 参数 | 含义 | 值   |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |

##### sqlserver

依赖

```xml
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
</dependency>
```

配置

```yml
url: jdbc:sqlserver://localhost:1433;DatabaseName=testB
driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
username: sa
password: 123456
```

