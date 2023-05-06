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

### 引入方式

直接引入，可以放在head或者body中

```html
<body>
    <script>
      alert('Hello, world!');
    </script>
</body>
```

外部文件引入

```html
<script src="/path/to/script.js"></script>
```

外部url引入

```html
<script src="https://xxx/xxx.js"></script>
```

> 这三种方式可以同时引入，数量不限

### 变量声明方式

```js
let name = xxx;//普通变量
const name = xxx;//常量
```

### 数据类型

七种原始数据类型：

- number 用于任何类型的数字：整数或浮点数，在 ±(253-1) 范围内的整数。

  特殊类型：

  ```js
  //Infinity 无穷大
  alert( 1 / 0 ); // Infinity
  
  //NaN 运算错误，和NaN计算的结果都为NaN
  alert( "not a number" / 2 ); // NaN，这样的除法是错误的
  ```

- bigint 用于任意长度的整数。

  ```js
  // 尾部的 "n" 表示这是一个 BigInt 类型
  const bigInt = 1234567890123456789012345678901234567890n;
  ```

  

- string 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。

  三种方式

  ```js
  let str = "Hello";
  let str2 = 'Single quotes are ok too';
  let phrase = `can embed another ${str}`; //这里占位符可以传变量
  ```

- boolean 用于 true 和 false。

- null 用于未知的值 —— 只有一个 null 值的独立类型。

- undefined 用于未定义的值 —— 只有一个 undefined 值的独立类型。

  ```js
  //不赋值就是undefined
  let name;
  ```

- symbol 用于唯一的标识符。

一种非原始数据类型：

- object 用于更复杂的数据结构。



### 交互

alter：出现一个弹窗，展示文本

prompt：出现一个弹窗，给用户输入

```js
//用户如果不输入，默认值就是100
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

confirm：出现一个弹窗，让用户选择是、否

```javascript
let isBoss = confirm("Are you the boss?");
```



### 类型转换

js的变量在声明后，依然可以更换类型

```js
let hello = 'hello';
hello = 12.13;
```

使用关键字 `typeof` 获取变量类型

```js
let name = 'hello';
typeof name;
typeof(name);//两种方式
```

##### string类型转换

```js
String(true); // "true"
```

##### number类型转换

```js
//只有加法会变成字符串拼接，其他运算符都会自动转换字符串类型
alert( 100 + "20" ); // "10020"，变成字符串
alert( 100 - "20" ); // 80

alert( Number(null) ); // 0
alert( Number("") ); // 0
alert( Number("      ") ); // 0
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN（从字符串“读取”数字，读到 "z" 时出现错误）
alert( Number(undefined) ); // NaN
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

##### boolean类型转换

```js
//直观上为“空”的值（如 0、空字符串、null、undefined 和 NaN）将变为 false。
alert( Boolean(0) ); // false
alert( Boolean("") ); // false

//其他值变成 true。
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // 空格，也是 true（任何非空字符串都是 true）
```

### 值的大小比较

##### string类型比较

从左到右，**比较每个字符的Unicode**，所以字母越靠后越大

```js
alert( 'Z' > 'A' ); // true
```

##### 不同类型比较

都会先转成number类型，再比较

```js
alert( '2' > 1 ); // true
alert( '01' == 1 ); // true，字符串 '01' 会被转化为数字 1
alert( true > 0 ); // true
```

##### 严格相等

普通的相等性检查 `==` 存在一个问题，它不能区分出 `0` 和 `false`

```js
alert( 0 == false ); // true
alert( '' == false ); // true
```

使用 `===` ，则不会进行类型转换，并且优先比较类型，不一样直接false

```js
alert( 0 === false ); // false，因为被比较值的数据类型不同
```

##### 奇怪的null和undefined

没必要记住，只需要在这两个东西出现的时候，注意一下就好了，做个单独的检查

判断undefined要用 `===` 严格判断

```js
alert( null === undefined ); // false
alert( null == undefined ); // true
```

```js
alert( null > 0 );  // false
alert( null == 0 ); // false
alert( null >= 0 ); // true
```

```js
alert( undefined > 0 ); // false
alert( undefined < 0 ); // false
alert( undefined == 0 ); // false
```

### if条件语句

同java

### while、for循环语句

同java

### switch判断

同java

### 函数（方法）

##### 不用指定参数类型，不用指定返回值（奇葩）

```js
function hello(name,age){}
```

##### 可以访问所有外部变量，并且修改它的值

```js
let name = 'hello';
function change(){
	name = 'world';
}
change();
alert(name); // hello
```

##### 如果变量名重复，优先使用方法内的

```js
let age = 1;
function hello(){
	let age = 11111;
    alert(age); // 11111
}
alert(age); // 1 不影响外部
```

##### 参数可以有默认值

```js
//age不传，就默认100
function hello(name,age = 100){
}
```

##### 回调函数

作为返回值的函数

```js
function ask(question,yes,no){
	return confirm(question) ? yes() : no();
}
//下面这俩就是回调函数
function yes(){
    alert("yes");
}
function no(){
    alert("no");
}

ask("are you happy?",yes(),no());
```

##### 匿名函数

除了没有名字，没有别的区别

```js
function(){};
//自己调用自己
function(){}();
```

##### 函数声明和函数表达式

```js
// 函数声明
function sum(a, b) {
  return a + b;
}
// 函数表达式
let sum = function(a, b) {
  return a + b;
};
```

区别在于，方法被创建的时间点

函数声明：在**被定义之前**，它就可以被调用。

函数表达式：在代码**执行到达时**被创建，并且仅从那一刻起可用。

##### 箭头函数：lambda表达式

```
let sum = (a,b) => a + b;
```

#### 闭包

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

### 对象

##### 基本语法

```js
// 创建
let user = new Object(); // “构造函数” 的语法
let user = {};  // “字面量” 的语法

//随意增加、移除属性
user.age = 1;
delete user.age;

//获取
let age = user.age;
let name = user[name];
```

##### 方括号获取属性

`[] `比 `.` 功能更强大

```js
let name = prompt("What is your name?", "anon");

alert(user.name); // undefined 无法获取数据
alert(user[name]); // anon 可以正常获取数据
```



##### 计算属性（动态属性）

```js
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // 属性名是从 fruit 变量中得到的
};

alert( bag.apple ); // 5 如果 fruit="apple"
alert( bag.fruit ); // undefined 因为fruit是动态的变量，并不存在这个属性
```

##### 属性缩写

如果属性名和变量名相同，可以简写

```js
let age = 12;
let user = {age};
// let user = {age:age}; 

function test(x,y){
    return {x,y};
    // return {x:x,y:y};
}
```

##### 判断对象是否拥有属性

```js
let user = {name:"zhangsan"};
let hasName = "name" in user; //true
```

##### 遍历属性

相当于java的反射

```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // 属性键的值
  alert( user[key] ); // John, 30, true
}
```

##### 浅拷贝和深拷贝

和java的一样都是值传递

```js
// 浅拷贝
let user = {name:"hello",age:12};
let clone = {
    name:user.name,
    age:user.age,
};// 或者用for...in


//深拷贝，即属性是一个对象，而不单单是基础类型
let user = {
    age:12,
    obj:{xxx},
}
//可以调用现成的库
```



## 特殊点总结

1. 变量类型为动态的，可随意切换

   ```js
   let name = 'hello';
   name = 12;
   name = 12.123;
   ```

2. 一些奇奇怪怪的判断，参考**值的大小比较**、**类型转换**

3. 函数的参数不用指定类型，也看不到返回值类型（奇葩）

   函数可以改变外部变量的值

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

