---
title: regex正则表达式
categories:
  - 编程
  - 语言
date: 2023-03-20 20:37:27
tags:
---

hello world

---

### 语法

---

^：以xxx开头

```java
^aa
    
aabb //只会匹配前面的aa
bbaa //不匹配
```

$：以xxx为结尾，同上

---

字符簇：

```java
[a-z] // 匹配所有的小写字母 
[A-Z] // 匹配所有的大写字母 
[a-zA-Z] // 匹配所有的字母 
[0-9] // 匹配所有的数字
[ \f\r\t\n] // 匹配所有的白字符
```

注意：只会匹配单个

```java
[a-z]3 
    
a3bb2c3 //匹配a3、c3
```

[^]标识 `非`

```java
[^0-9]a //只要不是0-9就行

aaa //匹配第一个aa
.a //匹配       
```

 注意上面：先到先得，不会重复匹配

```java
[^0-9]a //只要不是0-9就行

aaa //只匹配第一个aa，之后这两个a就不会参与匹配，所以第二个a不会再和第三个a匹配
```

---

重复匹配

a{1,3}：匹配a、aa、aaa

```java
aaaa //只匹配aaa，以大局为重
```

a{2,}：至少两个连在一起

```java
aabbbb //匹配
abbbb //不匹配
```

---

\b：用于间隔单词

```java
hello\b
//匹配hello结尾的单词
sjdflkajfhello //匹配
sjdflkajfhello world//匹配
helloasjdklf //不匹配

\bhello
//匹配hello为开头的单词
helloasjdklf //匹配
world helloasjdklf //匹配
sjdflkajfhello //不匹配

\bhello\b
//只匹配hello这个单词
hi hello world //匹配
helloasjdklf //不匹配
world helloasjdklf //不匹配
```





---

### 实战案例

##### 已知变量名，获取该变量的所有值

想要获取所有sql语句

```java
String sql = "select 1";
sql = "select count(1) "+
    " from user";
```

开头都是 `sql =` 

结尾都是 `";`

中间不能出现分号，并且字符数不限制 `[^;]{0,}`

```
(sql =)[^;]{0,}(";)
```

