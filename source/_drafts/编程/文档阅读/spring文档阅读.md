---
title: spring文档阅读
categories:
  - null
date: 2023-06-06 09:03:36
tags:
---

hello world

---

[toc]

官方文档：https://docs.spring.io/spring-framework/docs/5.3.27/reference/html/

# web servlet

## spring mvc

### DispatcherServlet

有一个前端控制器`DispatcherServlet`，这个类把一个请求的所有流程，抽象成**一套通用的算法**。

> 有点像模板方法模式，所有的请求执行的流程都是固定的。

然后具体的一些处理工作，由各种**组件**来负责，这些组件都是可配置的。

> 然后，通过修改相应的组件，实现不同的处理效果

`DispatcherServlet`也实现了`servlet`接口，所以也需要遵循servlet规范，在`web.xml`中进行配置。然后再从spring容器中获取相应的组件。

> 具体的配置在文档里有

### Context Hierarchy

> todo：没看懂是干嘛的

可以给`DispatcherServlet`传入一个`WebApplicationContext`，这个东西可以关联到`servletContext`。

还可以用`RequestContextUtils`来获取`WebApplicationContext`

### Special Bean Types

列举了一些特殊的类，也可以说是上面提到的组件，它们用来处理`request`和`response`。

spring**内置**了一些默认的实现，用户可以自定义来覆盖这些默认的配置。

- HandlerMapping

  - 用来处理请求的路径，映射到对应的处理请求的方法
  - 两个主要的实现类`RequestMappingHandlerMapping`和`SimpleUrlHandlerMapping`

- HandlerAdapter

  - 类似一个耳机接头的转换器，只负责把3.5mm转换成type-c，不负责处理实际的处理

    > todo：具体的还没搞懂

- HandlerExceptionResolver

  > todo

- ViewResolver

  - 把string映射到对应的jsp文件
  - 不用jsp就基本用不到了

- LocaleResolver, LocaleContextResolver

- ThemeResolver

- MultipartResolver

- FlashMapManager

### Web MVC Config

上面这些特殊的bean，用户可以自定义。然后`DispatcherServlet`会从`WebApplicationContext` 找，没找到就会用内置的实现类。

大多数情况下，用MVC Config来配置是最好的。

### Servlet Config

servlet3.0+的版本中，可以用java代码来替代web.xml。

可以通过`implements WebApplicationInitializer`

或者`extend AbstractDispatcherServletInitializer`

来注册`DispatcherServlet`、`filter`、`listener`等等servlet的组件

> 文档里给出了很多示例

---

### 小总结

> 纯粹是自己刚好读到这里，为了让下次无缝衔接，稍微总结一下上面的内容

上面的基本内容就是：

spring通过`DispatcherServlet`，以及一些特殊的bean，来实现统一处理所有的request。

因为`DispatcherServlet`也是servlet，所以介绍了配置`servlet`的不同方式。

---







































