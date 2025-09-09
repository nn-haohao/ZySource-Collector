# /api 目录说明

本目录用于存放 Vercel Serverless Function 反向代理脚本，实现对目标资源站的透明代理。

## 主要文件

- **[...proxy].js**  
  通用反向代理函数，支持路径和参数透传。  
  例如：  
  ```
  https://你的vercel域名/api/https/www.yszzq.com/tags/xmlcjjk
  ```
  会自动代理到  
  ```
  https://www.yszzq.com/tags/xmlcjjk
  ```

## 使用场景

- 解决资源站访问限制、加速采集。
- 保护真实采集源，隐藏客户端真实请求。
- 可作为采集脚本的入口代理。

## 在 Vercel 上部署方法

1. **注册并登录 [Vercel](https://vercel.com/)**  
   可使用 GitHub 账号一键登录。

2. **新建项目**  
   - 点击 "Add New..." → "Project"。
   - 选择你的 GitHub 仓库（包含本目录和脚本）。

3. **确认项目结构**  
   - 确保 `/api/[...proxy].js` 文件已存在于仓库根目录下的 `api` 文件夹内。

4. **部署**  
   - 点击 "Deploy" 按钮，等待部署完成。

5. **自定义域名（可选）**  
   - 在 Vercel 项目设置中绑定你的自定义域名。

6. **测试反代接口**  
   - 访问  
     ```
     https://你的vercel域名/api/https/www.yszzq.com/tags/xmlcjjk
     ```
   - 应能正常获取目标资源站内容。

## 注意事项

- 仅允许 GET 请求。
- 仅代理 `https://www.yszzq.com/` 下的内容。
- 如需自定义目标站点，请修改 `[...proxy].js` 脚本逻辑。

---
本目录下文件仅供本项目采集脚本调用，不建议直接暴露给终端用