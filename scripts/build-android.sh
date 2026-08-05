#!/bin/bash
# 本地Android构建脚本
set -e

echo "🔧 安装依赖..."
npm install

echo "📦 进入Android目录..."
cd android

echo "🔨 执行Gradle构建..."
chmod +x gradlew
./gradlew clean
./gradlew assembleRelease

echo ""
echo "✅ Android构建完成!"
echo "APK位置: android/app/build/outputs/apk/release/"
ls -lh app/build/outputs/apk/release/*.apk 2>/dev/null || echo "APK文件在上述目录中"
