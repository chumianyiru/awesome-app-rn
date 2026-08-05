#!/bin/bash
# 本地iOS构建脚本 (需要在macOS上运行)
set -e

if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ iOS构建只能在macOS上运行"
    exit 1
fi

echo "🔧 安装npm依赖..."
npm install

echo "📦 安装CocoaPods依赖..."
cd ios
pod install

echo "🔨 执行Xcode构建..."
xcodebuild \
    -workspace AwesomeApp.xcworkspace \
    -scheme AwesomeApp \
    -configuration Release \
    -sdk iphoneos \
    -archivePath build/AwesomeApp.xcarchive \
    -destination 'generic/platform=iOS' \
    clean archive

echo "📦 导出IPA..."
mkdir -p build/ipa
xcodebuild \
    -exportArchive \
    -archivePath build/AwesomeApp.xcarchive \
    -exportOptionsPlist exportOptions.plist \
    -exportPath build/ipa

echo ""
echo "✅ iOS构建完成!"
echo "IPA位置: ios/build/ipa/"
ls -lh build/ipa/*.ipa 2>/dev/null || echo "IPA文件在上述目录中"
