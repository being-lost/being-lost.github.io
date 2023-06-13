---
title: 现代javascript教程
categories:
  - null
date: 2023-06-11 10:14:59
tags:
---

hello world

---

[toc]

## JavaScript 编程语言

### JavaScript 基础知识

#### Hello, world!
#### 代码结构
#### 现代模式，"use strict"
#### 变量
#### 数据类型
#### 交互：alert、prompt 和 confirm
#### 类型转换
#### 基础运算符，数学运算
#### 值的比较
#### 条件分支：if 和 '?'
#### 逻辑运算符
#### 空值合并运算符 '??'
#### 循环：while 和 for
#### "switch" 语句
#### 函数
#### 函数表达式
#### 箭头函数，基础知识
#### JavaScript 特性
#### 

### 代码质量

#### 在浏览器中调试
#### 代码风格
#### 注释
#### 忍者代码
#### 使用 Mocha 进行自动化测试
#### Polyfill 和转译器

### Object（对象）：基础知识

#### 对象

- [x] 创建对象的方式
    ```js
    let user = new Object(); // “构造函数” 的语法
    let user = {};  // “字面量” 的语法，比较常用
    ```

- [x] 对象的属性
    ```js
    let user = {     // 一个对象
        name: "John",  
        age: 30,     
    };
    // 读取文件的属性：
    alert( user.name ); // John
    alert( user.age ); // 30
    // js的属性不仅可以赋值，还能增删，就跟map一样
    user.isAdmin = true; // 加一个属性
    delete user.age; // 删掉一个属性
    ```
```

- [x] key包含空格

  需要用双引号`""`，并且其他地方都要加 `[]`

  不建议使用

  ```js
  let user = {"likes birds": true}  
  user["likes birds"] = true;		
  alert(user["likes birds"]); 
  delete user["likes birds"];
```

- [x] 结尾加逗号`,`
	```js
    let user = {
      name: "John",
      age: 30,	// 结尾允许加逗号，方便修改（java你看看人家，学着点）   
    }
  ```
  
- [x] 方括号`[]`和点`.`的区别

  `[]`可以动态访问属性，类似map.get()

  ```js
  let user = {
      name:"zhangsan",
      age:12,
  };
  
  let key = prompt("What do you want to know about the user?", "name");
  alert( user[key] ) // zhangsan，[]可以动态访问属性，而不需要写死 user.name
  key = "age";
  alert( user[key] ) // 12，等同于 user.age，是不是很像 map.get(key)
  
  alert( user.key ) // undefined，点没有这种功能
  ```

  另一种玩法

  ```js
  let fruit = prompt("Which fruit to buy?", "apple");
  let bag = {
    [fruit]: 5, // 属性名是从 fruit 变量中得到的
  };
  alert( bag.apple ); // 5 如果 fruit="apple"，否则是undefined
  
  fruit = "pear";
  alert( bag.pear );  // 但是只能用一次 undefined
  ```

  上面的另一种写法

  ```js
  let fruit = prompt("Which fruit to buy?", "apple");
  let bag = {};	// 为空
  
  // 从 fruit 变量中获取值
  bag[fruit] = 5;
  ```

- [x] 当参数和属性名相同时，可以缩写

  ```js
  function makeUser(name, age) {
    return {
      name, // 与 name: name 相同
      age,  // 与 age: age 相同
    };
  }
  ```

- [x] 属性名没有任何限制

  甚至可以是关键字

  ```js
  let obj = {
    for: 1,
    let: 2,
    return: 3
  };
  ```

- [x] 判断是否存在某个属性`in`

  ```js
  let obj = {
      test: undefined
  };
  
  console.log( obj.test !== undefined); // false 这种方式容易出问题
  
  console.log( "test" in obj ); // true
  let key = "test";
  console.log( key in obj ); // true 两种写法
  ```

  



#### 对象引用和复制

- [x] js和java一样，都是值传递，传递对象的地址

- [x] 浅拷贝`Object.assign()`

    ```js
    let a = {}
    let b = {name:"zhangsan"}
    let c = {age:12}
    
    Object.assign(a,b,c); // 把b和c的属拷贝到a里面去，属性名相同的，后执行的会覆盖前面的
    ```
    
- [x] 深克隆

    当对象内部还有一个对象时，就需要用到深克隆

    ```js
    let a = {};
    let b = {
        age:12,
        home:{
            bb:12,
            cc:13,
        },
    }
    ```

    可以通过递归浅拷贝实现深拷贝，

    现成的轮子：lodash 库的 _.cloneDeep(obj)。

#### 垃圾回收

后续学习性能优化再看，暂时跳过

#### 对象方法，"this"

- [x] 作为对象的属性的函数，称作方法

    ```js
    let a = {
        name : "",
        say(){},//可以简写成这样，等同于下面的写法
        say2:function(){}
    }
    ```
    
- [x] this和java中的用法类似，但是**更灵活**

    ```js
    let user = { name: "John" };
    let admin = { name: "Admin" };
    
    function sayHi() {
      alert( this.name ); // 这样写不会报错
    }
    
    // 赋值给不同的对象
    user.say = sayHi;
    admin.say = sayHi;
    // 调用时，this指向各自的name
    user.say() // John
    admin.say() // Admin
    //直接调用，在strict模式下为undefined
    sayHi() // undefined
    ```

- [ ] 箭头函数没有this

    > todo：不懂什么意思

    ```js
    let user = {
      firstName: "admin",
      sayHi() {
        let arrow = () => alert(this.firstName);
        arrow();
      }
    };
    
    user.sayHi(); // admin
    ```

#### 构造器和操作符 "new"

- [x] 类似class的简化版

  **方法名首字母必须大写**

  ```js
  //这里就相当于构造器
  function User(name,age){
  	this.name = name 
      this.age = age
  }
  let a = new User("a",12)
  //实际上就是一个class对象
  console.log(a.name);
  ```

#### 可选链

- [x] `?.`出现的原因，以及如何使用

  ```js
  let user = {
  	address:{
          street: "xx"
      }
  }
  user.address.street //如果有的用户address为undefined，这样就会报错，就跟java的空指针一样
  user.address ? user.address.street : undefined //这样判断又不够优雅
  user.address ?.street //所以就出现了这样的语法糖
  ```

  所以主要作用就是，在可能存在空指针的情况，让程序不报错

- [x] 短路效应，也就是如果前面出问题了，后面的代码就不会执行

  ```js
  let user = null;
  let x = 0;
  
  user?.sayHi(x++); // 没有 "user"，因此代码执行没有到达 sayHi 调用和 x++
  alert(x); // 0，值没有增加
  ```

- [x] 还有其他变化 `?[]` `?()`

  ```js
  let user = {};
  user.say?() //如果say不存在，就什么都不会发生，也不会报错
  ```

- [x] 可以取值、删除属性，但是不能赋值

  ```js
  let user = null;
  console.log(user?.name) //可以取值
  delete user?.name //可以删除属性            
  user?.name = "John"; // 但是不能赋值，因为它在计算的是：undefined = "John"
  ```

- [x] 使用注意：

  - 不要滥用
  - 最前面的`user`必须先声明，`let user`

#### symbol

> todo：不懂它到底有什么用

- [x] 可以生成唯一标识

  不会被自动转为字符串
  
  ```js
  let id1 = Symbol("id")
  let id2 = Symbol("id")
  console.log(id1===id2); // false 说明是唯一的
  console.log(id1.description); // id 里面的为描述信息，也可以不填
  ```
```
  
- [x] 可以作为隐藏属性

  js规定，对象属性的key，只允许是string和symbol，其他类型会自动转成string

  ```js
  let user = {
      Symbol("id"):1, //这样会报错
      name :"hello"
  }
```

  正确示范

  ```js
  let id = Symbol("id");
  let user = { 
      name: "John",
  	[id]:1,		//需要配合[]
  };
  console.log( user[id] ); // 1
  console.log(JSON.stringify(user)) // 但是并不会打印出id
  ```

- [x] 在`for…in`中会被跳过

  但是`Object.assign` 可以拷贝symbol 属性

- [x] 全局symbol，可以在全局设置一个唯一标识

  ```js
  // 从全局中找symbol，没有就会创建一个
  let sym = Symbol.for("name");
  let sym2 = Symbol.for("id");
  
  // 通过 symbol 获取description
  console.log( Symbol.keyFor(sym) ); // name
  console.log( Symbol.keyFor(sym2) ); // id
  
  //验证全局唯一性
  let sym3 = Symbol.for("id");
  console.log(sym2===sym3);
  ```

  
#### 对象 —— 原始值转换

> todo：不明所以，跳过

### 数据类型

这一章主要是一些api的使用

#### 原始类型的方法

- [x] js中也和java一样，基础数据类型都有各自的包装类**对象**，

  并且比java更灵活，基础数据类型可以直接调用包装类的方法

  包装的过程由引擎高度优化，并且自动调用，调用完包装对象就会被销毁

- [x] 包装类的首字母都是大写的，基础类型都是小写的

#### 数字类型

- [ ] 普通的数字类型可以支持`-9000兆~9000兆`，完全够用

  实在不够用，才会选择用BigInt

- [ ] 数字表示的语法糖

  几个0

  ```js
  //下面这三个都是一样的
  let billion = 1000000000;
  let billion = 1_000_000_000;
  let billion = 1e9; //e表示后面有几个0
  let num = 1e-3; //负号表示前面有几个0，这里是0.001
  ```

  不同进制

  ```js
  // 都是255
  let a = 0b11111111; // 0b：2进制
  let b = 0o377; // 0o：8进制
  let c = 0xff; // 0x：16进制
  
  //进制转换
  let num = 255;
  
  alert( num.toString(16) );  // 转为16进制：ff
  alert( num.toString(2) );   // 转为2进制：11111111
  ```

  一些处理小数的方法

  | 原始值 | Math.floor（向下舍入） | Math.ceil （向上舍入） | Math.round（四舍五入） | Math.trunc（去掉小数） |
  | ------ | ---------------------- | ---------------------- | ---------------------- | ---------------------- |
  | 3.1    | 3                      | 4                      | 3                      | 3                      |
  | 3.6    | 3                      | 4                      | 4                      | 3                      |
  | -1.1   | -2                     | -1                     | -1                     | -1                     |
  | -1.6   | -2                     | -1                     | -2                     | -1                     |

- [ ] > todo：还有其他的方法，暂时用不上就不管了



#### 字符串

> todo：暂时跳过

#### 数组

- [x] 声明

  ```js
  let arr = new Array();
  let arr = [];
  let arr = [1,2,true,"hello",{name:"zhangsan"},function(){}]; //可以存任何类型
  //只能说非常的随意了
  arr[4].name
  arr[5]()
  ```

- [x] js的数组甚至可以直接使用**队列**和**栈**的方法

  ```js
  let arr = [1,2,3,4]
  arr.pop()	//移除最后一个，4
  arr.push(4)	//在末尾添加4
  
  //这两个方法少用，因为会触发数组拷贝
  arr.shift()	//移除第一个，1
  arr.unshift(1)	//在前面添加1
  
  //可以添加多个
  arr.push(5,6)	
  arr.unshift(-1,0)
  ```

- [x] 遍历数组，普通的for循环就不演示了

  但是，听说在js里，普通for比下面这种更快？？

  ```js
  //和java略有不同
  for (let fruit of fruits) {
    alert( fruit );
  }
  ```

- [x] length长度，比java灵活多了，普通的数组就相当于arrayList

  而且length可以自由设置

  ```js
  let arr = [1, 2, 3, 4, 5];
  
  arr.length = 2; // 截断到只剩 2 个元素
  alert( arr ); // [1, 2]
  
  arr.length = 5; 
  alert( arr[3] ); // undefined：被截断的那些数值并没有回来
  
  arr.length = 0; //清空数组
  ```

  不会下标越界

  ```js
  let fruits = [];
  fruits[123] = "Apple";
  
  alert( fruits.length ); // 124
  ```

- [x] 数组比较不要用 ` ==`

#### 数组方法

- [ ] splice：删除、替换、添加元素

  ```js
  let arr = [1,2,3,4,5]
  
  delete arr[2];	//只是把2下标变为undefined，但是不改变数组长度
  
  //从哪个下标开始，把多少个元素，替换成哪些元素
  //删除
  arr.splice(2,1)	//1，2，4，5
  arr.splice(2,1)	//1，2，5
  //添加
  arr.splice(2,0,4) //1,2,4,5
  arr.splice(2,0,3) //1,2,3,4,5
  //替换
  arr.splice(2,2,7,8,9) //1,2,7,8,9,5
  arr.splice(2,3,3,4) //1,2,3,4,5
  //其实下标还能用负数，-1就是最后一位
  arr.splice(-1,0,6,7) //1,2,3,4,5,6,7
  //会返回移除掉的子数组
  let delArr = arr.splice(5,2) //1,2,3,4,5
  console.log( delArr ) //6,7
  ```

- [x] slice，跟上面比少了一个p。用来截取子数组

  ```js
  let arr = [1,2,3,4,5]
  //从哪个下标，到哪个下标（不包括这个下标）
  console.log( arr.slice(2)) //3,4,5 不填就默认到结尾
  console.log( arr.slice(2,3)) //3
  ```

- [x] concat，相当于java的`addAll()`

  ```js
  let arr = [1, 2];
  
  // 从 arr 和 [3,4] 创建一个新数组
  alert( arr.concat([3, 4]) ); // 1,2,3,4
  
  // 从 arr、[3,4] 和 [5,6] 创建一个新数组
  alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6
  
  // 从 arr、[3,4]、5 和 6 创建一个新数组
  alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
  ```

- [x] forEach，还是比java更灵活一点

  ```js
  let arr = ["Bilbo", "Gandalf", "Nazgul"]
  // 对每个元素调用 alert
  arr.forEach(console.log);
  
  //可以传入更多参数
  arr.forEach((item, index, array) => {
  	console.log(`${item} is at index ${index} in ${array}`);
  });
  ```

- [x] `arr.indexOf(item, from)` ： 从索引 from 开始搜索 item，如果找到则返回索引，否则返回 -1。

  `arr.lastIndexOf(item, from)` ：同上，但是是从后往前找

  `arr.includes(item, from)` ：从索引 from 开始搜索 item，如果找到则返回 true，没有就false

  判断是否存在，最好用`includes`，它可以正确判断`NaN`

  ```js
  const arr = [0,NaN];
  alert( arr.indexOf(NaN) ); // -1（实际上是存在的）
  alert( arr.includes(NaN) );// true（正确）
  ```

- [x] `find`、`findIndex`、`findLastIndex`

  比java的stream好用多了

  ```js
  let users = [
      {id: 1, name: "John"},
      {id: 2, name: "Pete"},
      {id: 3, name: "Mary"}
  ];
  
  let user = users.find(item => item.id == 1); //从前往后找，找到就停止，返回对象
  let index = users.findIndex(item => item.id == 1); //从前往后找，返回下标 0
  let lastIndex = users.findLastIndex(item => item.id == 1); //从后往前，返回下标 2（下标也反着来）
  ```

- [x] `filter`，和`find`一样，但是返回的是符合条件的数组

  ```js
  let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
  
  // 返回前两个用户的数组
  let subUsers = users.filter(item => item.id < 3);
  alert(subUsers.length); // 2
  ```

- [x] `map`，跟java里stream的一样

  ```js
  let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
  alert(lengths); // 5,7,6
  ```

- [ ] `sort`，排序

  最好自己实现比较的函数

  ```js
  let arr = [ 1, 2, 15 ];
  
  arr.sort(); // 1, 15, 2 实际结果是错的，因为内部都被转换成字符串比较。15的第一位1比2小，所以排在前面
  // 函数的结果：正数》，负数《，0=
  arr.sort(function(a, b) {
      return a - b; 
  });
  arr.sort( (a, b) => a - b ); // 简写
  ```

- [ ] `reverse`，颠倒数组顺序

  ```js
  let arr = [1, 2, 3, 4, 5];
  arr.reverse(); // 5，4，3，2，1 颠倒的是原数组 
  ```

- [ ] `split`，跟java差不多

  `join`，则是跟`split`刚好相反

  ```js
  let str = '1,2,3,4'
  
  let arr1 = str.split(',') // [1,2,3,4] 
  
  let arr2 = str.split(',', 2 ) // [1,2] 2表示数组的长度
  
  let str1 = arr1.join(':') // 1:2:3:4 返回字符串
  ```

  `split`还能拆单词

  ```js
  let arr = 'hello'.split('') // [h,e,l,l,o]
  ```

- [ ] `reduce`，遍历数组，并且保留上次函数执行的结果，传递给下一个元素

  ```js
  let value = arr.reduce(function(accumulator, item, index, array) {
    // ...
  }, [initial]);
  ```

  使用介绍：

  - `accumulator` —— 是上一个函数调用的结果。第一次等于 `initial`，如果`initial`没传，就跳过第一个下标，并且把第一个下标的值，赋值给`accumulator`

    ```js
    //没有初始值，所以a的初始值就是第一个下标的值，并且从第二个下标开始运算
    let value = [1,2].reduce((a,b) => a+b); //3
    
    let value = [1,2].reduce((a,b) => a+b,1); //4
    ```

  - `item` —— 当前的数组元素。

  - `index` —— 当前索引。

  - `arr` —— 数组本身。

- [ ] `Array.isArray()`判断是否为数组

#### Iterable object（可迭代对象）
#### Map and Set（映射和集合）
#### WeakMap and WeakSet（弱映射和弱集合）
#### Object.keys，values，entries
#### 解构赋值
#### 日期和时间
#### JSON 方法，toJSON

### 函数进阶内容

#### 递归和堆栈
#### Rest 参数与 Spread 语法
#### 变量作用域，闭包
#### 老旧的 "var"
#### 全局对象
#### 函数对象，NFE
#### "new Function" 语法
#### 调度：setTimeout 和 setInterval
#### 装饰器模式和转发，call/apply
#### 函数绑定
#### 深入理解箭头函数

  

### 对象属性配置

#### 属性标志和属性描述符
#### 属性的 getter 和 setter

### 原型，继承

#### 原型继承
#### F.prototype
#### 原生的原型
#### 原型方法，没有 __proto__ 的对象

### 类

#### Class 基本语法
#### 类继承
#### 静态属性和静态方法
#### 私有的和受保护的属性和方法
#### 扩展内建类
#### 类检查："instanceof"
#### Mixin 模式

### 错误处理

#### 错误处理，"try...catch"
#### 自定义 Error，扩展 Error

### Promise，async/await

#### 简介：回调
#### Promise
#### Promise 链
#### 使用 promise 进行错误处理
#### Promise API
#### Promisification
#### 微任务（Microtask）
#### async/await

### Generator，高级 iteration

#### generator
#### 异步迭代和 generator

### 模块

#### 模块 (Module) 简介
#### 导出和导入
#### 动态导入

### 杂项

#### Proxy 和 Reflect
#### Eval：执行代码字符串
#### 柯里化（Currying）
#### Reference Type
#### BigInt
#### Unicode —— 字符串内幕

## 浏览器：文档，事件，接口

学习如何管理浏览器页面：添加元素，操纵元素的大小和位置，动态创建接口并与访问者互动。

### Document

#### 浏览器环境，规格
#### DOM 树
#### 遍历 DOM
#### 搜索：getElement*，querySelector*
#### 节点属性：type，tag 和 content
#### 特性和属性（Attributes and properties）
#### 修改文档（document）
#### 样式和类
#### 元素大小和滚动
#### Window 大小和滚动
#### 坐标
#### 

### 事件简介

#### 浏览器事件简介
#### 冒泡和捕获
#### 事件委托
#### 浏览器默认行为
#### 创建自定义事件

### UI 事件

#### 鼠标事件
#### 移动鼠标：mouseover/out，mouseenter/leave
#### 鼠标拖放事件
#### 指针事件
#### 键盘：keydown 和 keyup
#### 滚动

### 表单，控件

#### 表单属性和方法
#### 聚焦：focus/blur
#### 事件：change，input，cut，copy，paste
#### 表单：事件和方法提交

### 加载文档和其他资源

#### 页面生命周期：DOMContentLoaded，load，beforeunload，unload
#### 脚本：async，defer
#### 资源加载：onload，onerror

### 杂项

#### DOM 变动观察器（Mutation observer）
#### 选择（Selection）和范围（Range）
#### 事件循环：微任务和宏任务

## 其他文章

教程的前两部分未涉及的其他主题的内容列表。此处没有明确的层次结构，你可以按你需要的顺序阅读文章。

### Frame 和 window

#### 弹窗和 window 的方法
#### 跨窗口通信
#### 点击劫持攻击

### 二进制数据，文件

#### ArrayBuffer，二进制数组
#### TextDecoder 和 TextEncoder
#### Blob
#### File 和 FileReader

### 网络请求

#### Fetch
#### FormData
#### Fetch：下载进度
#### Fetch：中止（Abort）
#### Fetch：跨源请求
#### Fetch API
#### URL 对象
#### X
#### 可恢复的文件上传
#### 长轮询（Long polling）
#### WebSocket
#### Server Sent Events
#### 

### 在浏览器中存储数据

#### Cookie，document.cookie
#### LocalStorage，sessionStorage
#### IndexedDB

### 动画

#### 贝塞尔曲线
#### CSS 动画
#### JavaScript 动画

### Web components

#### 从星球轨道的高度讲起
#### Custom elements
#### 影子 DOM（Shadow DOM）
#### 模板元素
#### Shadow DOM 插槽，组成
#### 给 Shadow DOM 添加样式
#### Shadow DOM 和事件（events）

### 正则表达式

#### 模式（Patterns）和修饰符（flags）
#### 字符类
#### Unicode：修饰符 "u" 和类 \p{...}
#### 锚点：字符串开始 ^ 和末尾 $
#### 锚点 ^ $ 的多行模式，修饰符 "m"
#### 词边界：\b
#### 转义，特殊字符
#### 集合和范围 ...\]
#### 量词 +, *, ? 和 {n}
#### 贪婪量词和惰性量词
#### 捕获组
#### 模式中的反向引用：\N 和 \k
#### 选择 (OR) |
#### 前瞻断言与后瞻断言
#### 灾难性回溯
#### 粘性修饰符 "y"，在位置处搜索
#### 正则
