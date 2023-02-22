---
title: javascript语法
tags:
  - 语法
  - javascript
categories:
  - 编程
  - 语言
  - javascript
date: 2023-02-01 09:52:11
---

### onclick和addEventListener

onclick写死在html里

```javascript
<input type="button" id="" onclick="test()" value="run"/>
```

listener更灵活

```javascript
function test(){}
let but = document.getElementById('button1');
but.addEventListener('click',function(event){
    test();
});
```

