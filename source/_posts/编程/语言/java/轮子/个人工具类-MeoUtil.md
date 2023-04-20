---
title: 个人工具类-MeoUtil
categories:
  - 编程
  - 语言
  - java
  - 轮子
date: 2023-03-20 20:09:29
tags:
---

hello world

---

### meoUtil

#### jdbc

处理返回值

```java
private List<Map<String,Object>> handleResultSet(ResultSet rs){
    List<Map<String,Object>> list = new ArrayList<>();   
    while (rs.next()) {
        Map<String,Object> map = new HashMap<>();
        int columnCount = rs.getMetaData().getColumnCount();
        for (int i = 0; i < columnCount; i++) {
            String columnName = rs.getMetaData().getColumnName(i+1);
            Object value = rs.getObject(columnName);
            map.put(columnName,value);
        }
        list.add(map);
    }
    return map;
}
```

```java
private Map<String,Object> handleResultSet(ResultSet rs){
    Map<String,Object> map = new HashMap<>();
    int columnCount = rs.getMetaData().getColumnCount();
    for (int i = 0; i < columnCount; i++) {
        String columnName = rs.getMetaData().getColumnName(i+1);
        Object value = rs.getObject(columnName);
        map.put(columnName,value);
    }
    return map;
}
```

---

#### 打印

打印map

```java
public static void print(Map<String, Object> map) {
    for (String key : map.keySet()) {
        System.out.println(key + ":" + map.get(key));
    }
}
```

用{}拼接字符串，打印日志

```java
public static void log(String temp, Object... objects) {
    temp = temp.replaceAll("%s", "{}");
    System.out.println(String.format(temp, objects));
}
```

#### 文件类

获取当前项目路径

```java
public static String getProjectPath(){
	return System.getProperty("user.dir");
}
```

获取文件扩展名

```java
private static String getExtension(String fileName_WithExtension, boolean withPoint) {
    int index = fileName_WithExtension.lastIndexOf(".");
    int length = fileName_WithExtension.length();
    //结果是否保留 . 点
    index = withPoint ? index : index + 1;
    String extension = fileName_WithExtension.substring(index, length);
    return extension;
}
```

#### 绘制类

绘制无背景颜色的文字水印

```java
public static void drawImage_Text(String text, Color color, Font font, Double degree, float alpha, String outputFileName_WithExtension) throws IOException {
    FontDesignMetrics metrics = FontDesignMetrics.getMetrics(font);
    int width = metrics.stringWidth(text);
    int height = metrics.getHeight();

    BufferedImage buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
    Graphics2D g2d = buffImg.createGraphics();
    // 设置图片透明
    buffImg = g2d.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);
    g2d.dispose();
    g2d = buffImg.createGraphics();

    // 设置对线段的锯齿状边缘处理
    g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);

    // 设置水印旋转
    if (null != degree) {
        //注意rotate函数参数theta，为弧度制，故需用Math.toRadians转换一下
        //以矩形区域中央为圆心旋转
        g2d.rotate(Math.toRadians(degree), (double) buffImg.getWidth() / 2,
                   (double) buffImg.getHeight() / 2);
    }
    // 设置颜色
    g2d.setColor(color);
    // 设置 Font
    g2d.setFont(font);
    //设置透明度:1.0f为透明度 ，值从0-1.0，依次变得不透明
    g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, alpha));

    int x = 0;
    int y = metrics.getAscent();
    g2d.drawString(text, x, y);
    //释放资源
    g2d.dispose();

    //获取后缀
    String extension = getExtension(outputFileName_WithExtension, false);

    ImageIO.write(buffImg, extension, new File(outputFileName_WithExtension));//写入文件
}

private static String getExtension(String fileName_WithExtension, boolean withPoint) {
    int index = fileName_WithExtension.lastIndexOf(".");
    int length = fileName_WithExtension.length();
    index = withPoint ? index : index + 1;
    String extension = fileName_WithExtension.substring(index, length);
    return extension;
}
```

