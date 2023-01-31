---
title: 换电脑了，hexo的博客源文件怎么办
date: 2023-01-16 11:33:57
tags: 
- hexo
- github
- 实操教学

---

### 起因

hexo -d部署到github上的只有静态前端文件，而markdown博客的源文件并没有在上面。

索性把hexo init产生的文件全部放上github。

### 可行性

1. github生成静态网站的目录，目前有两个选择：/ 和 /docs
2. hexo -g生成的前端文件，可以通过配置文件，修改输出路径

### 详细操作

1. 修改hexo配置 _config.yml 文件，官网文档的**配置**一项中也有描述

   ```yml
   # public_dir: public
   public_dir: docs
   ```

2. 存放hexo目录下的所有东西上传到github仓库

3. 在**该仓库**的settings中找到Pages，里面有个branch，第二个下拉框选择/docs，点击Save，再等一会儿就完事了

---

后续写完博客，生成一下，直接全部push上去就完事了

```
hexo -g
```

```
git add --all
```

```
git commit -m "update"
```

```
git push origin master
```

另一台电脑只需要，git下来，把node、hexo装一下就行了