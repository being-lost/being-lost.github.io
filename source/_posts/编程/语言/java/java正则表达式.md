---
title: java正则表达式
categories:
  - 编程
  - 语言
  - java
date: 2023-03-20 20:40:06
tags:
---

hello world



### java正则

```java
//正则表达式
String patternStr="\\b(delete|drop|update)\\b";
//生成
Pattern pattern = Pattern.compile(patternStr, Pattern.CASE_INSENSITIVE);
//开始匹配
String input = "drop table user";
Matcher matcher = pattern.matcher(input);
//打印所有匹配的字符
while (matcher.find()) {
    String matchStr = Matcher.group();
    System.out.println(matchStr);
}
```

