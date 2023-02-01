---
title: javascript语法
date: 2023-02-01 09:52:11
tags:
- 语法
- javascript
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

