---
title: socket编程
categories:
  - java
  - 原生库
  - net包
date: 2023-03-20 20:34:56
tags:
---

hello world

---

[toc]

# oracle官方教学

https://docs.oracle.com/javase/tutorial/networking/sockets/definition.html

### 什么是socket

##### socket连接过程

1. 一个server创建一个socket，持续监听一个port，等待client的连接。
2. client事先就知道server的hostname和监听的port，于是client创建一个socket，选择自己主机的port，去连接server。
3. 如果连上了，那么server的socket就和client的socket绑定上。此时server会再创建一个socket，用来继续监听，等待其他client的连接

##### socket定义

> A socket is one endpoint of a two-way communication link between two programs running on the network. 

在网络上的、双向交流的连接中的一个端点、连接两端各一个socket。

一个endpoint绑定一个ip和一个port，然后两两相连，形成一条条独立的tcp连接。

不同操作系统的socket接口有细微差别，而java.net.Socket对象，屏蔽了所有细节，方便使用。

### 使用java-socket

最简单的server端：接收消息，并返回

```java
//1-开启server
int port = 8080;
ServerSocket serverSocket = new ServerSocket(port);
//2-创建socket，并阻塞代码，持续监听
Socket clientSocket = serverSocket.accept();
//3-创建read、write流
PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
//4-接收、返回消息
String inputLine;
while ((inputLine = in.readLine()) != null) {
    out.println(inputLine);
}
//5-关闭socket和stream
```

最简单的client端：

```java
//1-创建socket，指定server的hostName和port
Socket socket = new Socket(hostName, portNumber);
//2-创建read、write流
PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
//3-可自定义，用于接收用户输入
Scanner scanner = new Scanner(System.in);
while (scanner.hasNext()) {
    String msg = scanner.nextLine();
    out.println(msg);
    System.out.println("server: " + in.readLine());
}
//4-关闭socket和stream
```

#### 几个问题

- 客户端断开连接，服务端会立马报错：SocketException: Connection reset
- 服务端关闭服务，客户端下次发送消息时，会报错，同上