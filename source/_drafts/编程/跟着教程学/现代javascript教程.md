---
title: 现代javascript教程
categories:
  - null
date: 2023-06-12 08:44:43
tags:
---

hello world

---

[toc]





### 对象引用和复制

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

### 垃圾回收

后续学习性能优化再看，暂时跳过

### 对象方法，"this"

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

### 构造器和操作符 "new"

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

### 可选链

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

### symbol

> todo：不懂它到底有什么用

- [ ] 可以生成唯一标识

  ```js
  let id1 = Symbol("id")
  let id2 = Symbol("id")
  console.log(id1===id2); // false 说明是唯一的
  console.log(id1.description); // id 里面的为描述信息
  
  ```

  

  