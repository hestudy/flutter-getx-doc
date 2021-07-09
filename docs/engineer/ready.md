---
title: 预先准备
order: 2
---

GetX 为我们提供了各种拓展，以便于解放我们的生产力，请按照以下步骤安装它们

## 安装 Dart

如果你是完全的新手，还没有安装 Flutter 的开发环境，那么你需要进行这一步。

[安装教程](https://www.dartcn.com/install)

<Alert type='Warning'>如果你已经安装了 Flutter 环境，那么这一步可以省略，但是涉及 pub 的命令，你都需要在前面加上 flutter。例如 `flutter pub update` </Alert>

## 安装 Flutter

<Alert>强烈推荐使用[fvm](https://fvm.app/)进行安装，无论你是否有多版本需求，它都很方便！！！</Alert>

[安装教程](https://flutter.cn/docs/get-started/install)

## 安装 IDE 拓展

<Alert type='Warning'>如果你使用 Android Studio/Intellij，安装拓展时请注意兼容的版本</Alert>

- getx_template：一键生成每个页面必需的文件夹、文件、模板代码等等
  - [Android Studio/Intellij 插件](https://plugins.jetbrains.com/plugin/15919-getx)
- GetX Snippets：输入少量字母，自动提示选择后，可生成常用的模板代码
  - [Android Studio/Intellij 扩展](https://plugins.jetbrains.com/plugin/14975-getx-snippets)
  - [VSCode 扩展](https://marketplace.visualstudio.com/items?itemName=get-snippets.get-snippets)

## 安装 GetX Cli

打开你的命令行，执行

```shell
pub global activate get_cli
```

如果你的是 Flutter 环境，那么执行

```shell
flutter pub global activate get_cli
```
