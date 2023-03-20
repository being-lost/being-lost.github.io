---
title: java测试mock
categories:
  - 编程
  - 语言
  - java
date: 2023-03-20 19:56:16
tags:
---

hello world

---

### Mock+junit

##### class上需要加注解

junit5

```java
@ExtendWith(MockitoExtension.class)
```

junit4

```java

```



##### mock基础使用

很普通的service层调用mapper层

```java
@Service
public class UserService{
	@Autowired
	private UserMapper userMapper;
	public List<User> getList(){
        //一些复杂的逻辑
		return userMapper.getList();
	}
}
```

这是需要测试service的方法逻辑是否正确，所以加上`@InjectMocks`，作为测试对象

而内部调用的mapper，加上`@Mock`，作为模拟数据

```java
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TestMock{
    @Mock
    private UserMapper userMapper;
    @InjectMocks
    private UserService userService;
	
    @Test
    public void test(){
        List<User> mockList = Arrays.asList(
            new User(1,"zhangsan"),
            new User(2,"lisi"),
            new User(3,"wangwu")
        );
        //自定义模拟返回值
    	Mockito.when(userMapper.getList()).thenReturn(mockList);
        
		List<User> result = userService.getList();        
        //自行验证输出的结果对不对
    }
}
```

