---
title: 多条件过滤，将一个list拆分成多个list
tags:
  - todo
categories:
  - 编程
  - 语言
  - java
date: 2023-03-03 14:15:37
---

hello world

---

### 多条件过滤，将一个list拆分成多个list

##### 需求

userList获取年龄大于18和小于18的两个list，
用stream最后只能获得一个，还要多跑一次循环

##### 代码

简易版，后期考虑支持获取T中的属性，比如过滤之后获取user的name

~~~java
public class Test{
    @Test
    public void test(){
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        List<List<Integer>> splitList = splitList(list,
                i -> i > 1,
                i -> i > 3
        );
        splitList.forEach(e -> {
            e.forEach(System.out::println);
            System.out.println("--------------------");
        });
    }

    private <T> List<List<T>> splitList(Collection<T> originalList, Predicate<T>... predicates) {
        List<List<T>> resultList = new ArrayList<>(predicates.length);
        //n个条件，会拆分成n+1个list
        for (int i = 0; i < predicates.length + 1; i++) {
            resultList.add(new ArrayList<>());
        }
        for (T e : originalList) {
            boolean isAdd = false;
            for (int i = 0; i < predicates.length; i++) {
                List<T> result = resultList.get(i);
                if (predicates[i].test(e)) {
                    result.add(e);
                    isAdd = true;
                }
            }
            //都不满足的加入最后一个list
            if (!isAdd) {
                List<T> noneMatch = resultList.get(predicates.length);
                noneMatch.add(e);
            }
        }
        return resultList;
    }
}
~~~

优化：可以选择返回值

~~~java
//伪代码
MyList<List<Object> list = splitList(
    originalList,
    stream(filter(i -> i.getAge() > 1),map(User::getName)),
    stream(filter(i -> i.getAge() > 3),map(User::getAge)),
);
//自动转换
List<String> = list.get(0);
List<Integer> = list.get(1);
List<User> = list.getNoneMatch();
~~~

