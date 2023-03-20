---
title: sql常规语法
categories:
  - 编程
  - 语言
date: 2023-03-20 20:41:19
tags:
---

hello world

---

### sql常规语法

delete join：delete ${table} from

```sql
delete u --重点
from user u
join role r on u.id = r.user_id
where r.id = 3
```

