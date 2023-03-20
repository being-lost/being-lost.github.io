---
title: java发邮件
categories:
  - 编程
  - 语言
  - java
date: 2023-03-20 20:19:29
tags:
---

hello world

---

### java发邮件

步骤

1. 基础配置
2. 邮件内容
3. 发送

主要对象

- `Session`，保存配置，生成 `Transport` 对象
- `MimeMessage`，邮件内容
  - `MimeBodyPart`，邮件的表身部分
- `Transport` ，用于连接、发送邮件

```java
public void sendMail(){        
    String mail126 = "f13857719092@126.com";
    String mail163 = "f1210539148@163.com";
    String mailQQ = "1504559967@qq.com";
    
    String host = "smtp.163.com";
    //默认465
    String port = "465";

    //发送的配置
    Properties properties = new Properties();
    properties.setProperty("mail.smtp.user", "emailTest");
    properties.setProperty("mail.smtp.host", host);
    properties.setProperty("mail.smtp.port", port);
    properties.setProperty("mail.smtp.auth", "true");
    properties.setProperty("mail.smtp.connectiontimeout", "5000");
    properties.setProperty("mail.smtp.timeout", "3000");
    properties.setProperty("mail.smtp.writetimeout", "5000");
    properties.setProperty("mail.smtp.ssl.enable", "true");
    properties.setProperty("mail.smtp.starttls.enable", "true");
    //发送邮箱的账号密码
    Session session = Session.getInstance(properties, new UserPassAuthenticator(mail163, "FKRXHACUKZIABFWK"));

    //邮件基本信息
    MimeMessage mimeMessage = new MimeMessage(session);
    mimeMessage.setSubject("testEmail测试邮件", "utf-8");
    mimeMessage.setFrom(new InternetAddress(mail163));
    mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(mail126));//发给谁
    mimeMessage.setRecipient(Message.RecipientType.CC, new InternetAddress(mailQQ));//抄送
    mimeMessage.setSentDate(new Date());
    mimeMessage.setText("hello from");//正文，但会被后面的覆盖
    Multipart multipart = new MimeMultipart();
    //添加正文（第一个text会被识别为正文，后面的都会被设置为附件）:
    BodyPart textpart = new MimeBodyPart();
    textpart.setContent("hello here is you data", "text/html;charset=utf-8");
    multipart.addBodyPart(textpart);
    //添加附件:
    BodyPart imagepart = new MimeBodyPart();
    String filePath = "";
    imagepart.setFileName(filePath);
    imagepart.setDataHandler(new DataHandler(new ByteArrayDataSource(new FileInputStream(filePath), "application/octet-stream")));
    multipart.addBodyPart(imagepart);
    // 设置邮件内容为multipart:
    mimeMessage.setContent(multipart);

    //连接、发送、关闭
    Transport transport = session.getTransport("smtp");
    transport.connect();
    transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
    transport.close();
}
```

邮件内容

```java
//可以设置各种类型
mimePart.setContent();
//只能设置string类型正文，相当于content的子集
mimePart.setText();
```



---

### spring mail

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```



```java
javaMailSender.setHost(host);
javaMailSender.setUsername(username);
javaMailSender.setPassword(password);
javaMailSender.setDefaultEncoding("utf-8");
Properties properties = new Properties();
properties.setProperty("mail.smtp.timeout", "3000");
properties.setProperty("mail.smtp.writetimeout", "5000");
javaMailSender.setJavaMailProperties(properties);
//测试连接
javaMailSender.testConnection();

```

