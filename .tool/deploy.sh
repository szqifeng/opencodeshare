#!/bin/bash

# 部署工具 - 部署文档到生产服务器
# 
# 这个工具用于将文档站点部署到生产服务器 (47.93.214.178)
#
# 使用方法:
#   .tool/deploy.sh [选项]
#
# 选项:
#   -h, --help     显示帮助信息
#   -v, --verbose  显示详细输出
#
# 环境变量:
#   REMOTE_HOST    远程服务器地址 (默认: root@47.93.214.178)
#   DEPLOY_SCRIPT  远程部署脚本路径 (默认: /opt/opencodeshare/deploy.sh)

set -e

REMOTE_HOST="${REMOTE_HOST:-root@47.93.214.178}"
REMOTE_SCRIPT="/opt/opencodeshare/deploy.sh"
VERBOSE=false

while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      echo "部署工具 - 部署文档到生产服务器"
      echo ""
      echo "使用方法:"
      echo "  .tool/deploy.sh [选项]"
      echo ""
      echo "选项:"
      echo "  -h, --help     显示帮助信息"
      echo "  -v, --verbose  显示详细输出"
      echo ""
      echo "环境变量:"
      echo "  REMOTE_HOST    远程服务器地址 (默认: root@47.93.214.178)"
      exit 0
      ;;
    -v|--verbose)
      VERBOSE=true
      shift
      ;;
    *)
      echo "未知选项: $1"
      echo "使用 -h 或 --help 查看帮助"
      exit 1
      ;;
  esac
done

if [ "$VERBOSE" = true ]; then
  echo "🚀 开始部署到生产环境..."
  echo "远程主机: $REMOTE_HOST"
  echo "部署脚本: $REMOTE_SCRIPT"
  echo ""
fi

ssh "$REMOTE_HOST" "cd /opt/opencodeshare && bash $REMOTE_SCRIPT"

if [ "$VERBOSE" = true ]; then
  echo ""
  echo "✅ 部署完成！"
  echo ""
  echo "🌐 访问地址: https://opencode.ai"
fi
