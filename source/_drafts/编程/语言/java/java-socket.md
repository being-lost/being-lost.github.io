---
title: socket编程
categories:
  - 编程
  - 语言
  - java
date: 2023-03-20 20:34:56
tags:

---

hello world

---

### 简单的demo

**功能**：服务器接收消息，并返回消息

服务端

```java
import java.net.*;

public class TestSocketServer {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(8234);) {
            while (true) {
                Socket socket = serverSocket.accept();
                Thread thread = new Thread(new TestThread(socket));
                thread.start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

多线程，允许多个客户端连接

```java
import java.io.*;
import java.net.Socket;

public class TestThread implements Runnable {
    private final Socket socket;
    public TestThread(Socket socket) {
        this.socket = socket;
    }
    @Override
    public void run() {
        try (
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                PrintWriter printWriter = new PrintWriter(socket.getOutputStream(), true);
        ) {
            while (true) {
                String line = bufferedReader.readLine();
                if (line == null) {
                    continue;
                }
                System.out.println("client: " + line);
                printWriter.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

客户端

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class TestSocketClient2 {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 8234);) {
            runClient(socket);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private static void runClient(Socket socket) throws IOException {
        Scanner scan = new Scanner(System.in);
        try (
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        ) {
            while (scan.hasNext()) {
                String command = scan.nextLine();
                out.println(command);
                String read = in.readLine();
                System.out.println("server: " + read);
            }
        }
    }
}
```

#### 几个问题

- 客户端断开连接，服务端会立马报错：SocketException: Connection reset
- 服务端关闭服务，客户端下次发送消息时，会报错，同上