# ZySource-Collector

本项目用于自动采集和转换 [影视站之家](https://www.yszzq.com/tags/xmlcjjk/) 的影视资源站接口，并生成多种格式的 JSON 数据，适配不同影视聚合应用。

## 项目特性

- **自动采集**：通过爬虫脚本自动抓取资源站接口数据。
- **多格式输出**：支持 v影、TVBox、影视大全、zypc 版等多种 JSON 格式。
- **持续更新**：GitHub Actions 定时任务自动更新数据并推送到仓库。
- **一键部署**：支持 GitHub Pages 静态托管，方便外部引用。
- **可自定义反代域名**：支持一键替换代理域名脚本，便于迁移和维护。

## 目录结构

- [xinpq.py](./xinpq.py)：采集资源站接口初步列表，生成 `pq.txt`
- [lins.py](./lins.py)：解析接口真实 API 地址，生成 `maqu.txt`
- [jsonzyyidong.py](./jsonzyyidong.py)：将 `maqu.txt` 转换为多种 JSON 格式
- [pq.txt](./pq.txt)：中间数据文件
- [maqu.txt](./maqu.txt)：中间数据文件
- [zyvying.json](./zyvying.json)：v影格式
- [zytvbox.json](./zytvbox.json)：TVBox 格式
- [ysdqbox.json](./ysdqbox.json)：影视大全格式
- [zypcbox.json](./zypcbox.json)：zypc 版格式
- [.github/workflows/static.yml](./.github/workflows/static.yml)：自动化脚本与静态部署配置
- [tools/replace_proxy_domain.py](./tools/replace_proxy_domain.py)：一键替换代理域名脚本
- [api/](./api/)：Vercel 反向代理 Serverless 函数及说明

## 在线接口地址

- v影专用：[https://a.wokaotianshi.eu.org/jgcj/zyvying.json](https://a.wokaotianshi.eu.org/jgcj/zyvying.json)
- TVBox专用：[https://a.wokaotianshi.eu.org/jgcj/zytvbox.json](https://a.wokaotianshi.eu.org/jgcj/zytvbox.json)
- 影视大全专用：[https://a.wokaotianshi.eu.org/jgcj/ysdqbox.json](https://a.wokaotianshi.eu.org/jgcj/ysdqbox.json)
- zypc版专用：[https://a.wokaotianshi.eu.org/jgcj/zypcbox.json](https://a.wokaotianshi.eu.org/jgcj/zypcbox.json)

## 自动化流程

1. **采集**：`xinpq.py` 抓取资源站页面，生成初步链接列表。
2. **解析**：`lins.py` 访问每个链接，提取真实 API 地址，生成 `maqu.txt`。
3. **转换**：`jsonzyyidong.py` 读取 `maqu.txt`，输出多种 JSON 格式。
4. **自动推送**：GitHub Actions 定时运行上述脚本并自动提交更新。

## 反向代理与一键替换

- 通过 [api/](./api/) 目录下的 Vercel Serverless Function 可实现资源站反向代理，解决访问限制。
- 使用 [tools/replace_proxy_domain.py](./tools/replace_proxy_domain.py) 可一键替换全项目中的代理域名，迁移更方便。

## 在 Vercel 上部署反代

详见 [api/README.md](./api/README.md)  
简要流程：
1. 注册并登录 [Vercel](https://vercel.com/)
2. 新建项目并导入本仓库
3. 确认 `/api/[...proxy].js` 存在
4. 部署并绑定自定义域名
5. 通过 `https://你的vercel域名/api/https/www.yszzq.com/tags/xmlcjjk` 访问反代内容

## 适用场景

- 影视聚合应用的资源站接口自动维护
- 需要多格式资源站 JSON 的开发者
- 影视资源站接口的自动化采集与分发

---

如需自定义采集规则或格式，请修改对应 Python 脚本
