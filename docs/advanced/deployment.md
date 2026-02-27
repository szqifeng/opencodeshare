---
sidebar_position: 7
---

# 部署指南

将 OpenCode 项目部署到生产环境。

## 部署选项

- Docker 容器
- 云服务器
- Serverless
- Vercel / Netlify

## Docker 部署

```bash
docker build -t opencode .
docker run -p 3000:3000 opencode
```

## CI/CD

支持 GitHub Actions、GitLab CI 等。
