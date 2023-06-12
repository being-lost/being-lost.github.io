---
title: spring-jdbc使用
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

# spring-jdbc使用

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
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>${hikaricp.version}</version>
</dependency>
```

### 编程式事务（手动commit，rollback）

```java
public void test{
    String url = "jdbc:sqlserver://192.168.5.207:1433;DatabaseName=test";
    String username = "sa";
    String password = "123456";
    HikariDataSource dataSource = new HikariDataSource();
    dataSource.setJdbcUrl(url);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    
    JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
    //低版本的为 DataSourceTransactionManager
	JdbcTransactionManager manager = new JdbcTransactionManager(dataSource);
    
    TransactionStatus status = manager.getTransaction(new DefaultTransactionDefinition());
	try{
		jdbcTemplate.update("update usr set name = ? where id = ?", "hello", 1);
        manager.commit(status);
	}catch(Exception e){
		manager.rollback(status);
	}
}
```

### 查询 select

##### 返回单个字段

queryForObject

```java
jdbcTemplate.queryForObject("select count(*) from user where id = ?", Integer.class, 1); 
```

##### 返回map

queryForMap

```java
jdbcTemplate.queryForMap("select * from user where id = ?", 1);
```

##### 返回List，单个字段

queryForList

```java
jdbcTemplate.queryForList("select name from user where id < ?", String.class, 5);
```

##### 返回List，Map对象

queryForList

```java
//不指定类型，默认返回map
jdbcTemplate.queryForList("select * from user where id < ?", 5);
```

##### 返回对象（需要手动映射）

queryForObject

```java
RowMapper<User> userMapper = (rs, rowNum) -> {
    log("rowNum:{}", rowNum);
    User user = new User();
    user.setId(rs.getInt("id"));
    user.setName(rs.getString("name"));
    return user;
};
jdbcTemplate.queryForList("select * from user where id < ?",userMapper, 5);
```

##### 返回List<对象>（需要手动映射）

query

```java
//同上
jdbcTemplate.query("select * from user where id < ?",userMapper, 5);
```

### in参数的处理

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

## 踩坑

##### 当参数有数组类型时

需要把所有参数合并到一个数组中

```java
String name = "";
Object[] age = {1,2,3};

//错误示范，报错：SQLServerException: The conversion from UNKNOWN to UNKNOWN is unsupported.
jdbcTemplate.query(sql,name,age);

//正确示范
List<String> params = new ArrayList<>();
params.add(form_no);
params.addAll(Arrays.asList(worker));
jdbcTemplate.update(sql,params.toArray());
```



## 小计

报错顺序：

- 没查到数据：EmptyResult
- 查到数据：
  - 查一条数据，返回值有多条：IncorrectResultSize
  - 查一个字段，返回值有多个：IncorrectResultSetColumnCount

方法中的参数为elementType的，返回字段只能有一个

自己写的对象必须写RowMapper手动绑定（辣鸡）

返回list不会为null