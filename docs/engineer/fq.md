---
title: FQ
order: 5
---## 工程化示例模板

[github](https://github.com/1467602180/flutter-getx-template)

## GetX Cli 命令卡住不动？

这是因为 GetX Cli 在检测更新，和 Flutter 命令卡住同理。源码里并没有提供更换更新地址的选项。所以我 fork 了源码，进行了更改

可以去仓库[github](https://github.com/1467602180/cn_get_cli)的 release 界面，下载编译好的 `get` ，重命名成 `cnget` 避免冲突，再设置一下环境变量。就可以直接使用 `cnget` 工程化项目了 。
