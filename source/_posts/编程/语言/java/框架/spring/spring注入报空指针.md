---
title: spring注入报空指针
tags:
  - bug
categories:
  - 编程
  - 语言
  - java
  - 框架
  - spring
date: 2023-03-03 14:25:11
---

hello world

---

一个类中，有别的static属性被new之后，无法注入

~~~java
public class Test{

    private static String other = new String();

    //空指针，无法注入
    @Autowired
    private User user ;

    //解决1，也设置为static
    @Autowired
    private static User user ;
    
    //解决2，直接从容器中拿
    @Autowired
    private User user = SpringUtil.getBean(User.class);    
}
~~~

