---
title: vue
categories:
  - null
date: 2023-05-30 20:51:13
tags:
---

hello world

---

[toc]

# 语法

## 基本使用

##### data()，修改dom的值

通过`data()`返回一个对象，通过获取相应key的value

```vue
<script>
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>

<template>
  <h1>{{ message }}</h1>
</template>
```

##### data()和v-bind:，修改dom的属性

在对应的属性前面加上`v-bind:`就行了，也可以缩写成 `:`

```vue
<script>
export default {
  data() {
    return {
      titleClass: 'title'
    }
  }
}
</script>

<template>
  <h1 v-bind:class="titleClass">Make me red</h1>
  <h1 :class="titleClass">Make me red</h1>
</template>

<style>
.title {
  color: red;
}
</style>
```

##### method和v-on:，绑定事件监听

`v-on:`可以简写成 `@`

```vue
//一个简单的计数器
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<template>
  <button v-on:click="increment">count is: {{ count }}</button>
  <button @click="increment">count is: {{ count }}</button>
</template>
```

#### 表单的双向绑定

在`<input>`输入框中输入时，

会触发`input`事件，调用`onInput()`方法，

通过`this.text`修改data中的text，

从而实现`<p>`标签的值同步变化。

```vue
<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onInput(e) {
      this.text = e.target.value
    }
  }
}
</script>

<template>
  <input @input="onInput" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```

##### v-model，双向绑定的语法糖

上面的代码可以简写，通过`v-model`替代`methods`中的事件绑定

```vue
<script>
export default {
  data() {
    return {
      text: ''
    }
  }
}
</script>

<template>
  <input v-model="text" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```

#### v-if，条件渲染

通过判断 `isHappy` 的值，来显示不同的dom

```vue
<script>
export default {
  data() {
    return {
      isHappy: true
    }
  },
  methods: {
    convert() {
      this.isHappy = !this.isHappy
    }
  }
}
</script>

<template>
  <button @click="convert">switch mood</button>
  <h1 v-if="isHappy">yes</h1>
  <h1 v-else>no</h1> 
</template>
```

#### 列表渲染

通过form中的v-model双向绑带，来新增子项

```vue
<script>
// 给每个 todo 对象一个唯一的 id
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      todos: [
        { id: id++, text: 'Learn HTML' },
        { id: id++, text: 'Learn JavaScript' },
        { id: id++, text: 'Learn Vue' }
      ]
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>    
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
```

