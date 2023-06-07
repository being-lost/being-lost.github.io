---
title: html-canvas
categories:
  - null
date: 2023-06-07 09:40:15
tags:
---

hello world

---

[toc]

基础代码

```html
<style>
    #cvs{
        border: black solid 1px;
    }
</style>
<body>
    <canvas id="cvs"></canvas>
</body>
<script>
    const canvas = document.getElementById("cvs");
    canvas.height = 500;
    canvas.width = 500;
    const context = canvas.getContext("2d");
    context.fillRect(100, 100, 100, 100);
</script>
```





























