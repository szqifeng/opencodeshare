#!/bin/bash

set -e

REMOTE_HOST="root@47.93.214.178"
REMOTE_SCRIPT="/opt/opencodeshare/deploy.sh"

echo "🚀 开始部署到生产环境..."
echo "远程主机: $REMOTE_HOST"
echo "部署脚本: $REMOTE_SCRIPT"
echo ""

ssh "$REMOTE_HOST" "cd /opt/opencodeshare && bash deploy.sh"

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问地址: https://opencode.ai"
