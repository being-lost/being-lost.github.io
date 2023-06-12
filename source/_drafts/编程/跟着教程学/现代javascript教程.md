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

- [ ] 可以生成唯一标识

  ```js
  let id1 = Symbol("id")
  let id2 = Symbol("id")
  console.log(id1===id2); // false 说明是唯一的
  console.log(id1.description); // id 里面的为描述信息
  
  ```

  

  
#### 对象 —— 原始值转换

### 数据类型

#### 原始类型的方法
#### 数字类型
#### 字符串
#### 数组
#### 数组方法
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
