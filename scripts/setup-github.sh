#!/bin/bash

# GitHub仓库初始化和推送脚本
# 使用方法: GITHUB_TOKEN=your_token ./scripts/setup-github.sh <你的GitHub用户名> <仓库名称>

set -e

GITHUB_TOKEN="${GITHUB_TOKEN:-}"
GITHUB_USERNAME="${1:-}"
REPO_NAME="${2:-awesome-app}"

if [ -z "$GITHUB_USERNAME" ]; then
    echo "请输入你的GitHub用户名作为第一个参数"
    echo "使用方法: ./scripts/setup-github.sh <用户名> [仓库名]"
    exit 1
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "请设置GITHUB_TOKEN环境变量"
    echo "使用方法: GITHUB_TOKEN=your_token ./scripts/setup-github.sh <用户名> [仓库名]"
    exit 1
fi

echo "🚀 开始初始化GitHub仓库..."
echo "用户名: $GITHUB_USERNAME"
echo "仓库名: $REPO_NAME"

# 检查git是否已初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
fi

# 创建或检查GitHub仓库
echo "🔍 检查GitHub仓库是否存在..."
REPO_EXISTS=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$GITHUB_USERNAME/$REPO_NAME")

if [ "$REPO_EXISTS" = "404" ]; then
    echo "📝 创建GitHub仓库..."
    curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/user/repos \
        -d "{
            \"name\": \"$REPO_NAME\",
            \"description\": \"React Native跨平台应用，支持GitHub Actions云端构建\",
            \"private\": false,
            \"has_issues\": true,
            \"has_projects\": true,
            \"has_wiki\": true
        }"
    echo "仓库创建成功!"
else
    echo "仓库已存在，跳过创建步骤"
fi

# 配置git用户
git config user.name "${GITHUB_USERNAME}"
git config user.email "${GITHUB_USERNAME}@users.noreply.github.com"

# 添加远程仓库
echo "🔗 配置远程仓库..."
REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
if git remote | grep -q origin; then
    git remote set-url origin "$REMOTE_URL"
else
    git remote add origin "$REMOTE_URL"
fi

# 添加所有文件
echo "📁 添加文件到暂存区..."
git add .

# 提交
echo "💾 提交代码..."
if git diff --staged --quiet; then
    echo "没有需要提交的更改"
else
    git commit -m "feat: 初始化React Native项目，配置GitHub Actions云构建

- 完整的React Native 0.73.4项目结构
- TypeScript支持
- React Navigation导航
- Zustand状态管理
- 丰富的示例页面和组件
- Android APK/AAB构建配置
- iOS IPA构建配置
- GitHub Actions自动化CI/CD"
fi

# 设置main分支
git branch -M main

# 推送到远程
echo "⬆️  推送到GitHub..."
git push -u origin main --force

echo ""
echo "✅ 完成!"
echo ""
echo "你的代码已推送到: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo ""
echo "📱 触发Android构建: 访问Actions页面，选择'Android Build' -> Run workflow"
echo "🍎 触发iOS构建: 访问Actions页面，选择'iOS Build' -> Run workflow"
echo "📦 触发全平台构建: 推送tag v* (如 git tag v1.0.0 && git push origin v1.0.0)"
echo ""
echo "构建产物可在Actions页面的Artifacts中下载"
