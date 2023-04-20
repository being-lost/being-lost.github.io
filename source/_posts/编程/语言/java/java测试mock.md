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
@RunWith(MockitoJUnitRunner.class)
```

#### 以下用junit5

##### mock基础使用

很普通的service层调用mapper层

```java
@Data
public class UserService{
	private UserMapper userMapper;
	public List<User> getList(int id){
        //一些复杂的逻辑
		return userMapper.getList(id);
	}
}
```

这是需要测试service的**方法逻辑是否正确**，所以加上`@InjectMocks`，作为测试对象

而内部调用的mapper属于**无关项**，加上`@Mock`，作为模拟数据

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TestMock{        
    //实际是new出来的，所以会调用构造器
    @InjectMocks
    private UserService userService;
    //一般情况下mock出来后，会自动set或者反射进测试类，特殊情况需要手动操作
	@Mock
    private UserMapper userMapper;
    
    @Test
    public void test(){
        List<User> mockList = Arrays.asList(
            new User(1,"zhangsan"),
            new User(2,"lisi"),
            new User(3,"wangwu")
        );
        //自定义模拟返回值
    	when(userMapper.getList(anyInt())).thenReturn(mockList);
        
		List<User> result = userService.getList();        
        //自行验证输出的结果对不对
        assertEquals(result.size(),2);
        verify(userMapper,times(2)).getList(anyInt());//最好指定类型，不要滥用any()，否则可能会空指针
    }
}
```

