---
title: javaSE基础
categories:
  - 编程
  - 语言
  - java
date: 2023-03-20 20:47:58
tags:
---

hello world

---

[toc]



一个重要的观念：

**不要把原生类库奉为圭臬**，

有的类或者方法已经**过时、废弃、没人用**很久了，

之所以不删，只是为了兼容一些古早的项目而已。

- 对于生产而言，用哪个API，只是因为它好用、方便、省事，

  优先完成需求，然后根据二八原则，找到影响性能的大头在哪里，

  一个API不同的实现方式，提升的微小性能，只是蚊子腿而已。

- 对于提升自我而言，重要的是学会设计的思想，

  比如：缓存、池化、网关

# 基础语法

### 命令行启动

```cmd
javac HelloWorld.java
java Helloworld
```

### 数据类型

| 名称    | 占用字节 | 大小     |
| ------- | -------- | -------- |
| byte    | 1        | -128~127 |
| short   | 2        |          |
| char    | 2        |          |
| int     | 4        |          |
| long    | 8        |          |
| float   | 4        |          |
| double  | 8        |          |
| boolean | 1bit     |          |

##### 类型转换

java分为**自动转换**和**强制转换**

**自动转换**：不需要额外操作

```java
//小的转成大的，比如byte自动转为int
byte a = 1;
int b = a;
//整形转为浮点，比如long转成float
long a = 1L;
float b = a;
```

**强制转换**：

- 大的转成小的，会导致精度缺失

  原理：int有4个字节，byte只有1个，所以int转成byte，**需要去掉左边的**3个字节

  ```java
  //0~127无变化
  int a = 127;
  byte b = (byte)a; 
  
  //int[128,255]，对应byte[-128,-1]
  int a = 255;
  byte b = (byte)a; //-1
  ```

#### 特殊类型

##### Bigdecimal



### 泛型

本质：数据类型的参数化

##### 解决了什么问题

类型检查

```java
List<String> list = new ArrayList<>();
list.add("hello");
list.add(123);	//编译不通过
```

方便类型转换，而且避免ClassCastException

```java
List list = new ArrayList();
list.add("hello");
String obj = (String)list.get(0);//如果没有泛型，就要手动转换
```

##### 原理

java程序执行的过程：

源码.java——编译器——》》字节码.class——虚拟机——》》内存中运行

泛型编译成.class字节码的时候，实际上还是object，而且`ArrayList<T>`内部的也是`object[]`。

所以泛型的写法，**实际上是编译器实现的**，也叫做**泛型擦去**。

编译器允许这种泛型的写法，并且保存数据类型，自动进行类型转换，**所以也得益于多态**

> 所以 `int` 和 `Integer`的自动装箱、拆箱，应该也是编译器帮忙调用`Integer.valueOf()`

#### 使用

##### 泛型对象

```java
List<Integer> list = new ArrayList<Integer>();
```

##### 泛型类

```java
class Result<T>{
	private T data;
	public T getData(){
        return data;
    }	
    public void setData(T data){
        this.data=data;
    }	
}

//多泛型类
class Result<T,R>{}
```

##### 泛型方法

和上面的**泛型类里面的方法**不同，

下面这种写法**可以在非泛型类中**定义，

区别在于，有没有类型转换 `<T>`

```java
public <T> T get(List<T> list) {
    return list.get(0);
}

//静态
public static <T, R> ForEachUtil<T, R> getInstance(List<T> list1, List<R> list2) {
    return new ForEachUtil2<>(list1, list2);
}
```



#### 限制

不能用基础类型

##### 简单泛型

- 必须左右两边类型一致
- 可以add自己和子类

```java
List<Number> list1 = new ArrayList<Integer>();//报错
List<Integer> list2 = new ArrayList<String>();//报错

List<Number> list = new ArrayList<Number>();
list.add(new Integer(3));
```

##### `?`

- 右边可以接收任何类型，所以一般是用作方法的参数，来接收List的泛型对象
- 只能添加null

```java
List<?> list = new ArrayList<Integer>();
list.add(null);
list.add(1);//报错
```

##### `? extend T` 

- 右边的必须为T本身，或者T的子类
- 只能add null

```java
List<? extends Number> list = new ArrayList<Object>();//报错
//只能添加null
List<? extends Number> list1 = new ArrayList<Integer>();
list1.add(null);
list1.add(new Integer(3));//报错
//如果非要添加
List<Integer> list2 = new ArrayList<Integer>();
list2.add(3);
List<? extends Number> list3 = list2;
list3.get(0);
```

##### `? super T` 

- 右边的必须为T本身，或者T的父类

- 可以add左边T的子类

```java
List<? super Number> list = new ArrayList<Integer>();//报错，类型错误
List<? super Number> list1 = new ArrayList<Object>();
list1.add(null);
list1.add(new Object());//报错
list1.add(new Integer(3));
```

##### `List<?>` 和 `List<Object>`

答案就很明显了

- 右边的属于普通泛型

- 左边的只能添加null




### IO流

##### 本质

让磁盘和内存数据的交互

因为程序在内存中运行，所以

- 读：磁盘——》》》内存
- 写：内存——》》》磁盘

##### 数据交互的单位：

字节、字符，`1字符 =2字节`，所以分为

- 字节流：`inputStream`、`outputStream`
- 字符流：`reader`、`writer`

因为一个汉字占用两个字节，如果用字节来读取，可能出现只读了一半的情况。

> 所以纯文字类的数据，用字符流读取。

##### 缓冲流 buffered

磁盘——》》》内存，这个过程速度很慢，而内存中互相访问更快，

所以在内存中，开辟一块空间作为缓冲区，**增加每次交互的数据量，减少交互的次数**

- 读取时，先读满缓冲区，以后就在缓冲区里读
- 写入时，先写满缓冲区，再一次性写入磁盘

> **挖坑**：
>
> 1：第一次read时，需要先填满缓冲区，然后再从缓冲区读数据，所以第一次读取是不是可能会更慢？
>
> 2：但是inputStream本身就有一次读一个byte数组的方法，如果我只需要读一次，那是不是用不到缓存？
>
> 
>
> 所以综上所述，缓冲流应该只用于频繁读写某个文件的情景，
>
> 或者说只是中意它的API好用，那么在new的时候，就应该设定好缓冲区的大小
>
> ```java
> new BufferedReader(reader,500);
> ```

字符流本身就有缓冲区，所以使用缓冲流的提升不太大

##### 关于outputStream的flush()

基于上面的解读，写入的时候，实际上是写到内存的缓冲区里的，数据并没有到磁盘中，

所以这个时候如果退出程序，那这部分数据就无了。

而flush的目的，就是主动把缓冲区的数据写入磁盘，

**也就是说，如果没有用到缓冲区，根本没必要flush。**

最好的证明，就是OutputStream的flush()是个空方法。

> 但是最好还是每次close之前都flush一下，
>
> 因为多态，导致根本不知道传过来的对象是不是带buffered的，
>
> 如果是自己写的话，就随意。



### 集合类

todo

### 并发、线程类

#### 线程池

线程池需要考虑的问题：

- 最少保留几个线程
- 最多存放几个线程
- 任务的高峰过去了，多余的线程应该销毁，什么时候销毁
- 任务超过了最大线程数怎么办

所以创建线程池 `ThreadPoolExecutor`，很自然的就有以下几个参数：

- corePoolSize：核心线程数
- maximumPoolSize：最大线程数
- keepAliveTime：超过corePoolSize数量的多余线程，空闲多久再销毁
- workQueue：一个用来存放任务的队列
- threadFactory：使用工厂模式创建线程
- handler：（线程饱和策略）队列满了，线程池也满了，但是还有任务进来，怎么办
  - AbortPolicy：丢弃任务，并抛出RejectedExecutionException异常。
  - DiscardPolicy：丢弃任务，但是不抛出异常。
  - DiscardOldestPolicy：丢弃队列最前面的任务，然后重新提交被拒绝的任务。
  - CallerRunsPolicy：由调用线程处理该任务。

##### 处理问题的流程

1. 每次都先创建核心线程来处理
2. 核心线程满了，把任务加入队列
3. 队列也满了，开始创建更多的线程
4. 线程超过最大数量，执行拒绝策略





---

# Api使用

### 进制转换

十进制转其他

```java
Integer.toHexString(10) //16进制
Integer.toBinaryString(10) //2进制
Integer.toOctalString(10) //8进制
```

其他转十进制

```java
Integer.parseInt("13", 16) //16进制的13，用10进制表示
Integer.parseInt("12", 8)
Integer.parseInt("0011", 2) //2进制的0011，用10进制表示
```

**轮子**：toBinaryString会省略左边的0，比如会直接输出 `1` 而不是`0000 0001`

```java
//补全左边的0
public static String convertToBinary(int num) {
    String binaryString = Integer.toBinaryString(num);
    int lack = 8 - binaryString.length();
    if (lack > 0) {
        char[] zeros = new char[lack];
        for (int i = 0; i < lack; i++) {
            zeros[i] = '0';
        }
        binaryString = new String(zeros) + binaryString;
    }
    return binaryString;
}
```



### 数组操作



### 集合类

#### map

##### computeIfAbsent

没有就赋值，返回赋值

```java
map.computeIfAbsent(key,e->new String());
//等同于
if(map.get(key)==null){
	String value = new String();
    map.put(value);
    return value;
}
```

##### putIfAbsent

有就返回

没有就赋值，返回null

```java
map.putIfAbsent(key,new String())
//等同于
String value = map.get(key);
if(value == null){
	value = new String();
    map.put(value);
    return null;
}else{
    return value;
}
```



