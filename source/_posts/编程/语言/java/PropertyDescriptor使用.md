---
title: PropertyDescriptor使用
tags:
  - todo
  - 反射
categories:
  - 编程
  - 语言
  - java
date: 2023-03-03 14:19:03
---

hello world

---

### PropertyDescriptor使用

> 内部方法是synchronized

~~~java
public class Test{
    public static void main(String[] args) {
        User obj = new User();
        Class<? extends User> clazz = obj.getClass();
        Field[] fields = clazz.getDeclaredFields();
        obj.setUSR("hello");
        //写数据
        for (Field e : fields) {
            if (!e.getName().toUpperCase().equals("USR")) {
                continue;
            }
            PropertyDescriptor pd = new PropertyDescriptor(e.getName(), clazz);
            //获得写方法
            Method wM = pd.getWriteMethod();
            //实际情况中需要判断下他的参数类型
            wM.invoke(obj, obj.getUSR()+"~~");
        }
        //读数据
        for (Field e : fields) {
            if (!e.getName().toUpperCase().equals("USR")) {
                continue;
            }
            PropertyDescriptor pd = new PropertyDescriptor(e.getName(), clazz);
            Method rM = pd.getReadMethod();//获得读方法
            System.out.println(rM.invoke(obj));
        }
    }
}
~~~