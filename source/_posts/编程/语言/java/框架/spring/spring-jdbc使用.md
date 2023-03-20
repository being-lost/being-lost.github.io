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
  - spring
date: 2023-02-21 19:03:14
---

# spring-jdbc

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

### 编程式事务（手动commit，rollback）

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

### 查询 query

基础的三种用法

- queryForObject
- queryForMap
- queryForList

前两个如果没有结果，会报错

queryForList为空，size=0

##### 示例

```java
Integer integer = jdbcTemplate.queryForObject("select count(*) from user where id = ?", Integer.class, 1);             
```

```java
Map<String, Object> map = jdbcTemplate.queryForMap("select * from user where id = ?", 1);
```

```java
List<String> list = jdbcTemplate.queryForList("select name from user where id < ?", String.class, 5);
```

##### RowMapper 映射字段

```java
@Override
public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
    Map<String, Object> map = new HashMap<>();
    map.put("name",rs.getString("name"));
    return map;
}
```

### 批量

in中需要多个参数，就要拼多少个`?`

所以sql需要做处理，下面是工具方法

```java
public static String getInParam(int size) {
    String param = "?";
    List<String> list = new ArrayList<>();
    for (int i = 0; i < size; i++) {
        list.add(param);
    }
    return String.join(",", list);
}
```

所以完整的流程就是

```java
String sqlPre = "select name from user where id in (%s)";
String sql = String.format(sqlPre,getInParam(list.size()));
jdbcTemplate.queryForList(sql, String.class, list.toArray());
```

