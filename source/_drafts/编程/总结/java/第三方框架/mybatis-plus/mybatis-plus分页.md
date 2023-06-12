---
title: mybatis-plus分页
categories:
  - 编程
  - 语言
  - java
  - 框架
  - mybatis-plus
date: 2023-04-23 16:01:38
tags:
---

hello world

---

### PaginationInnerInterceptor(新版分页插件)

生成count语句：autoCountSql()

生成分页语句：IDialect.buildPaginationSql()

#### 自定义分页方式

不同数据库的分页方式不同，所以通过implement IDialect实现

如果项目只有一种类型的数据库，直接通过构造器或者setDialect()注入



如果不止一种，执行sql时会通过findIDialect()动态判断

在DialectRegistry中维护了一个map，可以找到各种实现类

因为没找到框架提供自定义的途径，所以只能自己extend PaginationInnerInterceptor，重写findIDialect()

```java
public class MyPaginationInnerInterceptor extends PaginationInnerInterceptor {
    
    private static final IDialect myIDialect = new MySQLServer2005Dialect();

    @Override
    protected IDialect findIDialect(Executor executor) {
        IDialect iDialect = super.findIDialect(executor);
        if (iDialect instanceof SQLServer2005Dialect) {
            iDialect = myIDialect;
        }
        return iDialect;
    }
}

public class MySQLServer2005Dialect implements IDialect{
    @Override
	//
}    
```

