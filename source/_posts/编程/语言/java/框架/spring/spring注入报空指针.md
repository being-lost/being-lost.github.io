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
	//如果存在一个别的static修饰的变量
    private static String other = new String();

    //会spring导致无法注入，造成空指针
    @Autowired
    private User user ;

    //解决1，也设置为static
    @Autowired
    private static User user ;
    
    //解决2，直接从容器中拿
    private User user = SpringUtil.getBean(User.class);    
}
~~~

