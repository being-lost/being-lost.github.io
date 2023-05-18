---
title: socket是什么
categories:
  - null
date: 2023-05-18 15:17:03
tags:
---

hello world

---

[toc]

### 概述

socket是由**操作系统**提供的**一套api**（接口），方便**应用程序**调用网卡，实现网络中的数据传输。

### 流程

应用程序调用socket接口，选择好传输协议（tcp、udp），把数据传过去。

操作系统接收到了参数，根据传输协议，封装好数据的报文，然后通过网卡传输数据。



几个要点：

- 操作系统那么多，所以windows和linux的socket实现方式肯定有差别

