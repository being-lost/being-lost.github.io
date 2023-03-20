---
title: http请求的连接前时间过长
tags:
  - todo
  - bug
categories:
  - 编程
  - 计算机网络
date: 2023-03-03 14:21:05
---

hello world

---

### 起因

**同一个网页**在一秒钟**异步**发送大量请求，最后连接超时。

浏览器f12查看时间，发现Queueing、Stalled、Initial Connection时间很长，
而真正跟服务器请求的时间很短，所以排除接口超时的问题。

查阅结果：

- Queueing/Stalled时间长：网站使用http1.0协议，最大tcp连接为6（不同浏览器有出入），
  超过6个请求后，其他请求进入阻塞，等待固定时间，
  每6个请求一组，等待时间越来越长，最后超时。
  https://www.cnblogs.com/ljc021/p/15452086.html
- Initial Connection时间长：解析localhost时间慢，谷歌内核特有的问题，火狐不会。
  https://heary.cn/posts/Chromium内核浏览器访问localhost时的初始连接（initial-connection）高延迟问题/
  （题外话，网页直接复制该url，再粘贴到别处，会出现中文被解析成乱码，导致无法访问）

### 解决

未解决，猜测把异步改成同步可能有效。

### 引申知识点

- http1.0/1.1规定最大tcp连接为6个，
  因此，http2.0引入**多路复用**来解决该问题。

- http2.0基于https