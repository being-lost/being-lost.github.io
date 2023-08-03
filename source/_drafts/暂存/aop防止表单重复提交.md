### 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 实现

##### 使用示例

```java
@DuplicateSubmit(errorMsg = "{}秒内只允许访问{}次")
@GetMapping("/test")
public Object test() {
    return "hello";
}
```

##### 注解

```java
import java.lang.annotation.*;
import java.util.concurrent.TimeUnit;

/**
 * 示例：加在接口上
 *
 * @DuplicateSubmit(condition = "sameAccount", count = 1, timeUnit = TimeUnit.SECONDS, time = 3)
 * 相同账号，每3秒只能请求1次
 */
@Target(ElementType.METHOD)
@Documented
@Retention(RetentionPolicy.RUNTIME)
public @interface DuplicateSubmit {
    String condition();
	//默认3秒访问1次
    TimeUnit timeUnit() default TimeUnit.SECONDS;
    int time() default 3;
    int count() default 1;
 
    String errorMsg() ;
}
```

##### aop实现

```java
import java.lang.RuntimeException;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class DuplicateSubmitAop {

    @Autowired
    private StringRedisTemplate redis;

    @Pointcut(value = "@annotation(DuplicateSubmit)")
    private void DuplicateSubmit() {
    }

    @SneakyThrows
    @Before(value = "DuplicateSubmit()")
    public void countSubmit(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        DuplicateSubmit annotation = method.getAnnotation(DuplicateSubmit.class);
        if (annotation == null) {
            return;
        }
        //
        String key = getKey(annotation.condition());
        long count = redis.opsForValue().increment(key);
        if (count <= annotation.count()) {
            String errorMsg = annotation.errorMsg();
            if (!errorMsg.isEmpty()) {
                errorMsg = String.format(errorMsg.replace("{}", "%s"), annotation.time(), annotation.count());
            } else {
                errorMsg = "请求过于频繁";
            }
            errorMsg = errorMsg + "，请稍后再试";
            throw new RuntimeException(errorMsg);
        }
        redis.expire(key, annotation.time(), annotation.timeUnit());
    }
    //
    public static final String allIp = "0";
    public static final String sameIp = "1";
    public static final String sameAccount = "2";
    @Autowired
    private HttpServletRequest httpServletRequest;
	//根据不同条件限制，拼接不同的key，比如相同ip、相同账号
    private String getKey(String condition) {
        String value = "";
        switch (condition) {
            case allIp:
                value = "";
                break;
            case sameIp:
                value = UtilIp.getIpAddr(httpServletRequest);
                break;
            case sameAccount:
                value = UtilSecurity.getUserId();
                break;
        }
        String key = createKey(condition, httpServletRequest.getRequestURI(), value);
        return key;
    }

    private String createKey(String env, String uri, String value) {
        return String.join("::", Arrays.asList(env, uri, value));
    }
}
```