# Awesome App

一个功能丰富的 React Native 跨平台移动应用，支持 iOS 和 Android 双端，已配置 GitHub Actions 云端自动化构建。

## ✨ 功能特性

- 🎨 **现代化UI设计** - 精美的界面设计和流畅的用户体验
- 📱 **跨平台支持** - iOS + Android 双端原生体验
- 🚀 **云端构建** - GitHub Actions 自动化 CI/CD 流水线
- 🏠 **底部导航** - 首页、组件、我的、设置四大模块
- 🧩 **组件展示** - 按钮、输入框、开关、标签、进度条等常用组件
- ⚡ **状态管理** - Zustand 轻量级状态管理
- 💾 **本地存储** - AsyncStorage 持久化存储
- 🔔 **设置中心** - 主题切换、通知开关、语言设置

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React Native | 0.73.4 | 跨平台移动框架 |
| React | 18.2.0 | UI 框架 |
| TypeScript | 5.3.3 | 类型安全 |
| React Navigation | 6.x | 导航库 |
| Zustand | 4.x | 状态管理 |
| Hermes | - | JS 引擎 |
| GitHub Actions | - | CI/CD 云构建 |

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- JDK 17 (Android)
- Android Studio + Android SDK
- Xcode 15+ (iOS，仅 macOS)
- CocoaPods (iOS)

### 1. 一键推送到GitHub

使用提供的脚本一键创建仓库并推送代码：

```bash
# 给脚本添加执行权限
chmod +x scripts/*.sh

# 推送到GitHub (替换为你的GitHub用户名)
./scripts/setup-github.sh <你的GitHub用户名> [仓库名称]

# 示例
./scripts/setup-github.sh zhangsan awesome-app
```

脚本会自动：
- 初始化 Git 仓库
- 使用已配置的 Token 创建 GitHub 仓库
- 提交并推送所有代码

### 2. 本地开发

```bash
# 安装依赖
npm install

# 启动 Metro
npm start

# 运行 Android
npm run android

# 运行 iOS (仅 macOS)
cd ios && pod install && cd ..
npm run ios
```

## ☁️ GitHub Actions 云端构建

项目已配置完整的云端构建流水线，无需本地编译环境即可生成安装包。

### 构建工作流

| 工作流 | 触发方式 | 产物 |
|--------|----------|------|
| Android Build | 推送代码 / 手动触发 | APK + AAB |
| iOS Build | 推送代码 / 手动触发 | IPA + dSYM |
| Full Build | 推送 v* tag | APK + AAB + IPA |

### 触发云构建

1. 访问你的 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 选择对应工作流
4. 点击 **Run workflow**
5. 选择构建参数并确认

### 下载构建产物

构建完成后：
1. 进入对应的构建任务页面
2. 滚动到页面底部 **Artifacts** 区域
3. 下载 APK/AAB/IPA 文件

### 自动发布版本

推送 tag 即可自动触发全平台构建并创建 Release：

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 🔑 签名配置（可选）

### Android 签名

在仓库 Settings → Secrets and variables → Actions 中添加以下 Secrets：

| Secret 名称 | 说明 |
|-------------|------|
| `KEYSTORE_FILE` | keystore 文件的 Base64 编码 |
| `KEYSTORE_PASSWORD` | keystore 密码 |
| `KEYSTORE_ALIAS` | 密钥别名 |
| `KEY_PASSWORD` | 密钥密码 |

生成 Base64 命令：
```bash
base64 -i your-keystore.jks -o keystore-base64.txt
```

### iOS 签名

添加以下 Secrets：

| Secret 名称 | 说明 |
|-------------|------|
| `IOS_CERTIFICATE` | p12 证书 Base64 |
| `IOS_CERTIFICATE_PASSWORD` | 证书密码 |
| `DEVELOPMENT_TEAM_ID` | Apple Team ID |
| `APPSTORE_ISSUER_ID` | App Store Connect Issuer ID |
| `APPSTORE_API_KEY_ID` | App Store Connect API Key ID |
| `APPSTORE_API_PRIVATE_KEY` | API 私钥内容 |

## 📁 项目结构

```
AwesomeApp/
├── .github/workflows/    # GitHub Actions 工作流
│   ├── android-build.yml # Android 构建
│   ├── ios-build.yml     # iOS 构建
│   └── full-build.yml    # 全平台构建发布
├── android/              # Android 原生项目
├── ios/                  # iOS 原生项目
├── src/
│   ├── screens/          # 页面组件
│   │   ├── HomeScreen.tsx
│   │   ├── ComponentsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── DetailScreen.tsx
│   └── store/            # 状态管理
│       └── useAppStore.ts
├── scripts/              # 构建脚本
├── App.tsx               # 应用入口
└── package.json
```

## 📱 应用模块

- **🏠 首页** - 欢迎界面、功能入口、计数器演示
- **🧩 组件** - UI 组件展示（按钮、输入框、开关、标签、进度条）
- **👤 我的** - 用户信息、统计数据、功能菜单
- **⚙️ 设置** - 深色模式、通知开关、语言切换、缓存管理

## 📜 本地构建脚本

```bash
# Android 本地构建
./scripts/build-android.sh

# iOS 本地构建 (仅 macOS)
./scripts/build-ios.sh
```

## 📄 License

MIT License

---

**🎉 开始使用：** 推送代码后立即触发云构建，无需任何本地编译环境！
