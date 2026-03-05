#!/bin/bash

set -e

echo "=========================================="
echo "  OpenCode Linux 一键安装脚本"
echo "=========================================="
echo ""

# 检测 Linux 发行版
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VERSION=$VERSION_ID
else
    echo "错误：无法检测 Linux 发行版"
    echo "支持 Ubuntu、Debian、CentOS、RHEL、Arch Linux"
    exit 1
fi

echo "检测到系统: $OS $VERSION"
echo ""

# 安装 Node.js 的函数
install_nodejs() {
    echo ""
    echo "=========================================="
    echo "  正在安装 Node.js"
    echo "=========================================="
    echo ""

    case $OS in
        ubuntu|debian)
            echo "使用 apt 包管理器安装 Node.js..."
            
            # 安装 curl
            sudo apt-get update
            sudo apt-get install -y curl
            
            # 使用 NodeSource 安装 Node.js 20.x
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt-get install -y nodejs
            ;;
            
        centos|rhel|fedora)
            echo "使用 yum 包管理器安装 Node.js..."
            
            # 安装 curl
            sudo yum install -y curl
            
            # 使用 NodeSource 安装 Node.js 20.x
            curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
            sudo yum install -y nodejs
            ;;
            
        arch|manjaro)
            echo "使用 pacman 包管理器安装 Node.js..."
            sudo pacman -S --noconfirm nodejs npm
            ;;
            
        *)
            echo "错误：不支持的 Linux 发行版: $OS"
            echo "请手动安装 Node.js 18+ 后再运行此脚本"
            echo "访问 https://nodejs.org 下载安装包"
            exit 1
            ;;
    esac
    
    echo ""
    echo "✓ Node.js 安装完成"
}

# 检查 Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✓ Node.js 已安装: $NODE_VERSION"
    echo ""
    
    # 检查版本是否 >= 18
    REQUIRED_VERSION=18
    CURRENT_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    
    if [ "$CURRENT_VERSION" -ge "$REQUIRED_VERSION" ]; then
        echo "✓ Node.js 版本满足要求 (>= 18.x)"
    else
        echo "✗ Node.js 版本过低，需要 >= 18.x"
        echo "正在升级 Node.js..."
        install_nodejs
    fi
else
    echo "✗ Node.js 未安装"
    echo "正在安装 Node.js..."
    install_nodejs
fi

# 安装 OpenCode
echo ""
echo "=========================================="
echo "  正在安装 OpenCode"
echo "=========================================="
echo ""

if npm install -g @opencode-ai/cli; then
    echo ""
    echo "✓ OpenCode 安装成功"
else
    echo ""
    echo "✗ OpenCode 安装失败"
    exit 1
fi

echo ""
echo "=========================================="
echo "  验证安装"
echo "=========================================="
echo ""

if command -v opencode &> /dev/null; then
    OPCODE_VERSION=$(opencode --version 2>/dev/null || echo "无法获取版本")
    echo "✓ OpenCode 已安装: $OPCODE_VERSION"
else
    echo "✗ OpenCode 命令未找到"
    echo "请检查环境变量或重新打开终端"
fi

echo ""
echo "=========================================="
echo "  安装完成！"
echo "=========================================="
echo ""
echo "下一步："
echo "1. 运行 'opencode' 启动 OpenCode"
echo "2. 使用 '/connect' 连接 AI 模型"
echo "3. 获取智谱 AI 免费额度："
echo "   https://www.bigmodel.cn/glm-coding?ic=84BFRMHJCG"
echo ""
echo "=========================================="
