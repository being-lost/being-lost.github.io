- socket客户端

  ```java
  String host = "192.168.1.253";
  int port = 8234;
  try (
      Socket clientSocket = new Socket(host, port);
      BufferedOutputStream out = new BufferedOutputStream(clientSocket.getOutputStream());
      BufferedInputStream in = new BufferedInputStream(clientSocket.getInputStream());
  ) {
  	//具体业务    
  } catch (IOException e) {
  	e.printStackTrace();
  }
  ```

  读写模板

  ```java
  List<Byte> cache = new ArrayList<>();
  while (true) {
      //因为网络波动，可能写了10个字节，只读到8个字节，所以要循环读
      int available = in.available();
      if (available == 0) {
          continue;
      }
      byte[] data = new byte[available];
      in.read(data, 0, available);
      //读到的数据都加到缓存中
      addToCache(cache,data);
      //需要提前约定好字节长度，或者在数据的某个字节位用来标记总字节数，从而跳出循环
     	
      out.write(data);
      out.flush();//用到了buffered，一定要flush
  }
  ```

  read需要考虑几个问题

  - 每次读取的长度是多少
  - 如果上一次read超时了，那么下一次就有可能读到上一次的数据

  read有两种模式

  - 提前约定好长度，设定一个超时时间，然后就`read(data,0,length)`