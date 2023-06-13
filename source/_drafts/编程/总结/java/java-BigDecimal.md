---
title: java-BigDecimal
categories:
  - java
  - 基础
date: 2023-05-26 13:19:32
tags:
---

hello world

---

[toc]

# 作用

`double`计算时，会有精度的问题，导致结果不准。所以有了`BigDecimal`

# 使用注意事项

- 尽量用`BigDecimal.valueOf()` ，而不是`new BigDecimal()` 

- 最精准的构造，应该是用字符串 `new BigDecimal("11.22")`

- 最好设置小数的位数，因为在运算时可能除不尽，导致报错

  ```java
  BigDecimal ten = BigDecimal.valueOf(10);
  BigDecimal three = BigDecimal.valueOf(3);
  //除不尽，会报错：ArithmeticException: Non-terminating decimal expansion
  ten.divide(three);//3.333333333..
  //保留2位小数，四舍5入
  ten.divide(three, 2, 5);//3.33
  ten.divide(three, 3, 2);//3.334
  ```

  