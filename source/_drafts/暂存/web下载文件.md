# 介绍

web项目，new File(path)，然后写入响应体的outputStream中

# 代码

~~~java
@Controller
public class FileDownload{
    @PostMapping("/download/**")
    public void downloadSysResource(HttpServletRequest request, HttpServletResponse response) {
        String relativePath = request.getRequestURI().replaceFirst("/download", "");
        //自定义方法，拼接资源文件夹前缀，得到绝对路径
        String absolutePath = getAbsolutePath(relativePath);
        FileInputStream fileInputStream = null;
        try {
            File file = new File(absolutePath);
            if (!file.exists()) {
                throw new ExceptionBI("文件不存在");
            }
            //spring提供的工具类，获取对应的contentType
            String contentType = MediaTypeFactory.getMediaType(absolutePath).orElse(MediaType.APPLICATION_OCTET_STREAM).toString();
            response.setContentType(contentType);
            //设置响应头的一些信息
            setAttachmentResponseHeader(response, FileUtil.getName(file));
            //写入响应体中
            fileInputStream = new FileInputStream(file);
            byte[] b = new byte[1024];
            int length;
            ServletOutputStream outputStream = response.getOutputStream();
            while ((length = fileInputStream.read(b)) > 0) {
                outputStream.write(b, 0, length);
            }
        } catch (Exception e) {
            //异常，就返回json信息
            e.printStackTrace();
            // 重置response
            response.reset();
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            throw new ExceptionBI("文件下载失败");
        }
    }

   private static void setAttachmentResponseHeader(HttpServletResponse response, String downloadFileName) {
        String percentEncodedFileName = percentEncode(downloadFileName);

        StringBuilder contentDispositionValue = new StringBuilder();
        contentDispositionValue.append("attachment; filename=")
                .append(percentEncodedFileName)
                .append(";")
                .append("filename*=")
                .append("utf-8''")
                .append(percentEncodedFileName);

        response.addHeader("Access-Control-Expose-Headers", "Content-Disposition,download-filename");
        response.setHeader("Content-disposition", contentDispositionValue.toString());
        response.setHeader("download-filename", percentEncodedFileName);
    }

    /**
     * 百分号编码工具方法
     *
     * @param s 需要百分号编码的字符串
     * @return 百分号编码后的字符串
     */
    @SneakyThrows
    private static String percentEncode(String s) {
        String encode = URLEncoder.encode(s, StandardCharsets.UTF_8.toString());
        return encode.replaceAll("\\+", "%20");
    }
}
~~~