---
title: vue3+elementplus视频教程
categories:
  - null
date: 2023-06-14 21:20:45
tags:
---

hello world

---

[toc]

视频地址：https://www.bilibili.com/video/BV1sP4y127Re?p=2&vd_source=9e03a7f0309a0b4297c15f465efe070b

### 安装

- nodejs：16的长期稳定版

- pnpm：比npm更稳定

  ```
  npm install -g pnpm
  ```

### 初始化项目

创建一个目录

```
pnpm create vite@latest web
```

方向键选择`vue`，再选择`typescript`

然后进入自动创建的`web`目录，安装依赖

```
pnpm install
```

启动项目

```
pnpm dev
```

这样就完成了

### 项目目录介绍



### 配置

`vite.config.ts`

```ts
export default defineConfig({
    plugins: [vue()],    
    server:{
        host:"localhost"，
        port:8081,
        //自动打开浏览器
        open:true
    }
})
```



# 开发

### 添加路由

安装路由，用于配置不同页面之间的跳转

```
pnpm install vue-router@4
```

添加路由文件`index.ts`

```ts
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: "home", path: "/home", component: () => import("../views/HomePage.vue") },
        { name: "test", path: "/test", component: () => import("../views/TestPage.vue") }
    ]
})
export default router
```

到`App.vue`中的`template`下，添加一行路由组件

```vue
<template>
	<RouterView></RouterView>
</template>
```

到`main.ts`中修改

```ts
//引入路由对象
import router from './router' 

//开启路由
createApp(App).use(router).mount('#app')
```

再开启项目，请求不同的路径：`/home` 和`/test`，会显示对应的vue文件

### 引入element-plus

安装

```
pnpm install element-plus
```

