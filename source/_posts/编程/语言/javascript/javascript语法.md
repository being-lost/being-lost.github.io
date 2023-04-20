---
title: javascript语法
tags:
  - 语法
  - javascript
categories:
  - 编程
  - 语言
  - javascript
date: 2023-02-01 09:52:00
---

hello world

---

### 监听器

##### onclick和addEventListener

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

### 闭包

##### 解释

```javascript
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12

```

相当于java中的

```java
public class MakeAdder{
	int x;
	public MakeAdder(int x){
		this.x = x;
	}
	public int makeAdder(int y){
		return this.x + y;
	}
}

MakeAdder add5 = new MakeAdder(5);

add5.makeAdder(2); //7
```

