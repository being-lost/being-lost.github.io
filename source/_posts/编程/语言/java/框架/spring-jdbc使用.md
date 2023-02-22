---
title: spring-jdbc
tags:
  - 框架
  - java
categories:
  - 编程
  - 语言
  - java
  - 框架
date: 2023-02-21 19:03:14
---

### spring-jdbc

##### 依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.23</version>
</dependency>
```

数据源

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.11</version>
</dependency>
```

##### 编程式事务（手动commit，rollback）

```java
public void test{
	DruidDataSource dataSource = new DruidDataSource();
    //低版本的为 DataSourceTransactionManager
	JdbcTransactionManager manager = new JdbcTransactionManager(dataSource);
    TransactionStatus status = manager.getTransaction(new DefaultTransactionDefinition());

	JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
	try{
		jdbcTemplate.update("update usr set name = ? where id = ?", "hello", 1);
        manager.commit(status);
	}catch(Exception e){
		manager.rollback(status);
	}
}
```

