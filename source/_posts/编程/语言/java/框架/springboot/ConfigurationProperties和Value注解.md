---
title: ConfigurationProperties和Value注解
categories:
  - 编程
  - 语言
  - java
  - 框架
  - springboot
date: 2023-03-03 13:55:37
tags:
---

hello world

---

`@Value`如果在多个类中使用同一个值，改起来就会有点麻烦

`@ConfigurationProperties`可以把这些值统一到一起，方便维护

### 依赖

引入后，idea编辑配置文件时会有自动补全

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
</dependency>
~~~

### 使用

配置文件

```yml
config-project:
  name: zhangsan
  my-switch:
    swagger: true
    encrypt: false
```

代码

~~~java
@Component
@Data
//配置前缀
@ConfigurationProperties("config-project")
public class ConfigProject {

    private String name;
    //内部的嵌套结构，就需要通过注入的方式，等于说常规的只支持一级
    @Autowired
    private Switch mySwitch;

    @Data
    @ConfigurationProperties("config-project.my-switch")
    @Component
    public class Switch {
        private boolean swagger;
        private boolean encrypt;
    }
}
~~~

