// Vercel Serverless Function 反向代理脚本，支持路径透传和 query 参数
export default async function handler(req, res) {
  // 只允许 GET 请求
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // 解析目标路径
  const { proxy = [] } = req.query;
  if (proxy.length < 2 || proxy[0] !== 'https' || proxy[1] !== 'www.yszzq.com') {
    res.status(400).send('Invalid proxy path');
    return;
  }

  // 拼接目标 URL
  const targetPath = proxy.slice(2).join('/');
  const targetUrl = `https://www.yszzq.com/${targetPath}${req.url.split('?')[1] ? '?' + req.url.split('?')[1] : ''}`;

  // 代理请求
  try {
    const response = await fetch(targetUrl, {
      headers: {
        ...req.headers,
        host: 'www.yszzq.com',
      },
    });

    // 透传响应头和内容
    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, value);
      }
    });
    const body = await response.arrayBuffer();
    res.send(Buffer.from(body));
  } catch (err) {
    res.status(502).send('Proxy Error: ' + err.message);
  }
}