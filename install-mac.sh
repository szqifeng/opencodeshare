#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✅${NC} $1"; }
log_warning() { echo -e "${YELLOW}⚠️${NC} $1"; }
log_error() { echo -e "${RED}❌${NC} $1"; }

# 临时文件
TMP_DIR=$(mktemp -d)
LOG_FILE="$TMP_DIR/install.log"

# 清理函数
cleanup() {
    log_info "清理临时文件..."
    rm -rf "$TMP_DIR"
}

# 退出处理
exit_handler() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        log_error "安装失败 (错误码: $exit_code)"
        log_info "查看详细日志: $LOG_FILE"
    fi
    cleanup
}

trap exit_handler EXIT
trap cleanup INT TERM

# 记录日志
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# 重试函数
retry() {
    local max_attempts=$1
    local command="$2"
    local description="$3"
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        log_info "$description (尝试 $attempt/$max_attempts)..."
        if eval "$command" >> "$LOG_FILE" 2>&1; then
            return 0
        fi
        attempt=$((attempt + 1))
        if [ $attempt -le $max_attempts ]; then
            log_warning "$description 失败，5秒后重试..."
            sleep 5
        fi
    done
    
    log_error "$description 失败，已重试 $max_attempts 次"
    return 1
}

# 检查网络连接
check_network() {
    log_info "检查网络连接..."
    if curl -s --connect-timeout 10 https://www.google.com > /dev/null 2>&1 || \
       curl -s --connect-timeout 10 https://www.baidu.com > /dev/null 2>&1; then
        log_success "网络连接正常"
        return 0
    else
        log_error "无法连接到互联网，请检查网络设置"
        return 1
    fi
}

# 检查磁盘空间
check_disk_space() {
    log_info "检查磁盘空间..."
    local required_mb=500
    local available_mb=$(df -m / | tail -1 | awk '{print $4}')
    
    if [ "$available_mb" -lt "$required_mb" ]; then
        log_error "磁盘空间不足，至少需要 ${required_mb}MB，可用 ${available_mb}MB"
        return 1
    fi
    
    log_success "磁盘空间充足 (${available_mb}MB 可用)"
    return 0
}

# 检查 root 权限
check_sudo() {
    if [ "$EUID" -eq 0 ]; then
        log_warning "不建议使用 root 权限运行此脚本"
        return 0
    fi
    
    if ! sudo -n true 2>/dev/null; then
        log_info "需要管理员权限以完成安装..."
        sudo -v
    fi
    return 0
}

# 主函数
main() {
    log "========== OpenCode 安装开始 =========="
    
    echo ""
    echo "========================================"
    echo "  OpenCode 安装脚本 (macOS)"
    echo "========================================"
    echo ""
    
    # 环境检查
    log_info "执行环境检查..."
    
    if [[ "$OSTYPE" != "darwin"* ]]; then
        log_error "此脚本仅适用于 macOS"
        log "错误: 不支持的操作系统 - $OSTYPE"
        exit 1
    fi
    
    check_network || exit 1
    check_disk_space || exit 1
    
    # 获取 macOS 版本
    MACOS_VERSION=$(sw_vers -productVersion)
    log "macOS 版本: $MACOS_VERSION"
    log_info "检测到 macOS $MACOS_VERSION"
    
    # 检查并安装 Node.js
    echo ""
    echo "📦 步骤 1/4：检查 Node.js..."
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        NPM_VERSION=$(npm -v)
        log_success "Node.js 已安装: $NODE_VERSION (npm $NPM_VERSION)"
        log "Node.js 版本: $NODE_VERSION, npm 版本: $NPM_VERSION"
    else
        log "Node.js 未安装，开始安装流程"
        
        # 检查 Homebrew
        if command -v brew &> /dev/null; then
            log "Homebrew 已安装"
            log_success "Homebrew 已安装"
        else
            log_info "Homebrew 未安装，正在安装..."
            
            if ! retry 3 "/bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"" "安装 Homebrew"; then
                log_error "Homebrew 安装失败"
                log "Homebrew 安装失败"
                exit 1
            fi
            
            # 配置 Homebrew 环境变量
            log_info "配置 Homebrew 环境变量..."
            if [[ -f "/opt/homebrew/bin/brew" ]]; then
                SHELL_CONFIG="$HOME/.zprofile"
                if [ -n "$ZSH_VERSION" ]; then
                    SHELL_CONFIG="$HOME/.zshrc"
                elif [ -n "$BASH_VERSION" ]; then
                    SHELL_CONFIG="$HOME/.bash_profile"
                fi
                
                if ! grep -q "eval \"\$(/opt/homebrew/bin/brew shellenv)\"" "$SHELL_CONFIG" 2>/dev/null; then
                    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> "$SHELL_CONFIG"
                fi
                
                eval "$(/opt/homebrew/bin/brew shellenv)"
                log "Homebrew 环境变量已添加到 $SHELL_CONFIG"
            fi
            
            log_success "Homebrew 安装成功"
        fi
        
        # 更新 Homebrew
        log_info "更新 Homebrew..."
        if brew update >> "$LOG_FILE" 2>&1; then
            log "Homebrew 更新成功"
        else
            log_warning "Homebrew 更新失败，继续安装"
        fi
        
        # 安装 Node.js
        log_info "正在通过 Homebrew 安装 Node.js..."
        if ! retry 3 "brew install node" "安装 Node.js"; then
            log_error "Node.js 安装失败"
            log "Node.js 安装失败"
            exit 1
        fi
        
        # 验证 Node.js 安装
        if command -v node &> /dev/null; then
            NODE_VERSION=$(node -v)
            NPM_VERSION=$(npm -v)
            log_success "Node.js 安装成功: $NODE_VERSION (npm $NPM_VERSION)"
            log "Node.js 安装成功，版本: $NODE_VERSION, npm: $NPM_VERSION"
        else
            log_error "Node.js 安装后无法找到命令"
            log "Node.js 命令未找到"
            exit 1
        fi
    fi
    
    echo ""
    
    # 设置 npm 镜像
    echo "📦 步骤 2/4：配置 npm 镜像..."
    
    if npm config get registry | grep -q "npmmirror"; then
        log_success "npm 镜像已设置为国内镜像"
        log "npm 镜像已是国内镜像"
    else
        log_info "正在设置 npm 国内镜像..."
        if npm config set registry https://registry.npmmirror.com >> "$LOG_FILE" 2>&1; then
            log_success "npm 镜像已设置为国内镜像"
            log "npm 镜像设置为: https://registry.npmmirror.com"
        else
            log_warning "镜像设置失败，使用默认源"
            log "npm 镜像设置失败"
        fi
    fi
    
    echo ""
    
    # 安装 OpenCode
    echo "📦 步骤 3/4：安装 OpenCode..."
    
    log_info "正在安装 OpenCode CLI..."
    if ! retry 3 "npm install -g @opencode-ai/cli" "安装 OpenCode"; then
        log_error "OpenCode 安装失败"
        log "OpenCode 安装失败"
        log_info "尝试手动安装: npm install -g @opencode-ai/cli"
        exit 1
    fi
    
    # 验证 OpenCode 安装
    if command -v opencode &> /dev/null; then
        OPENCODE_VERSION=$(opencode --version 2>/dev/null || echo "unknown")
        log_success "OpenCode 安装成功: $OPENCODE_VERSION"
        log "OpenCode 安装成功，版本: $OPENCODE_VERSION"
    else
        log_error "OpenCode 安装后无法找到命令"
        log "OpenCode 命令未找到"
        log_info "请手动执行: npm install -g @opencode-ai/cli"
        exit 1
    fi
    
    echo ""
    
    # 验证安装
    echo "📦 步骤 4/4：验证安装..."
    echo ""
    
    NODE_VER=$(node -v)
    NPM_VER=$(npm -v)
    OPENCODE_VER=$(opencode --version 2>/dev/null || echo "unknown")
    
    printf "   %-20s %s\n" "Node.js:" "$NODE_VER"
    printf "   %-20s %s\n" "npm:" "$NPM_VER"
    printf "   %-20s %s\n" "OpenCode:" "$OPENCODE_VER"
    echo ""
    
    log "安装验证完成 - Node: $NODE_VER, npm: $NPM_VER, OpenCode: $OPENCODE_VER"
    log "========== OpenCode 安装成功 =========="
    
    echo "========================================"
    echo "  ✅ 安装完成！"
    echo "========================================"
    echo ""
    echo "下一步操作："
    echo ""
    echo "1️⃣  连接模型 API："
    echo "   opencode config set model.provider openai"
    echo "   opencode config set model.api_key YOUR_API_KEY"
    echo ""
    echo "2️⃣  开始对话："
    echo "   opencode chat \"你好\""
    echo ""
    echo "3️⃣  获取 API Key："
    echo "   OpenAI:  https://platform.openai.com/api-keys"
    echo "   Anthropic: https://console.anthropic.com/"
    echo ""
    echo "📚 详细教程:"
    echo "   https://opencodeshare.cn/docs/quick-start/starter-guide"
    echo ""
    echo "💡 如果遇到问题，查看安装日志:"
    echo "   $LOG_FILE"
    echo ""
}

# 执行主函数
main "$@"
