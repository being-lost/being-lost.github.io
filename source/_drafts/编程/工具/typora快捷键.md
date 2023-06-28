---
title: typora快捷键
categories:
  - 工具
date: 2023-05-18 10:42:44
tags:
---

hello world

---

[toc]

### 查看快捷键的方式

##### typora上方的菜单栏

随便点开一个，左边是功能名，右边是快捷键

```
Edit
Copy	Ctrl+C
```

当前光标所在位置的文本是什么样式，对应列表里就会打勾

##### 官方文档

- https://support.typoraio.io/Shortcut-Keys/ 英文，贼慢
- https://support.typoraio.cn/Shortcut-Keys/ 中文，略快



### 常用快捷键

基础的就不展示了

##### 表格快捷键

添加换行符 `shift enter`

添加行 `ctrl enter `

删除行 `ctrl shift 删除`

添加列、删除列，详情见下面的自定义快捷键

### 自定义快捷键

文档里有

##### windows

菜单栏：File=>Preference=>General=>Open Advance Settings

打开：conf.user.json文件

找到`KeyBingding`，修改保存

> key值为功能名，可以把typora调成英文，找到对应的英文

以下为个人常用的快捷键，方便移植

```json
"keyBinding": {
    // for example: 
    // "Always on Top": "Ctrl+Shift+P"
    "Task List": "Ctrl+Shift+J",
	"Code": "Ctrl+`",
	"Add Column After": "Alt+N",
	"Delete Column": "Alt+M",
	"HighLight": "Ctrl+=",
	"Strike": "Ctrl+-"
},
```



