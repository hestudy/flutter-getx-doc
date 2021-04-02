import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/flutter-getx-doc',
  exportStatic: {},
  publicPath: '/flutter-getx-doc/',
  title: 'Flutter Getx Doc',
  mode: 'site',
  locales: [['zh-CN', '中文']],
  navs: [
    {
      title: '国内镜像',
      path: 'https://hfybbs.gitee.io/flutter-getx-doc/',
    },
    {
      title: '快速开始',
      path: '/quick-start',
    },
    {
      title: '进阶使用',
      path: '/advanced-used',
    },
    {
      title: '工程化',
      path: '/engineer',
    },
    {
      title: 'Getx Server',
      path: 'https://github.com/jonataslaw/get_server',
    },
    {
      title: 'GetX Cli',
      path: 'https://github.com/jonataslaw/get_cli',
    },
    {
      title: '性能测试',
      path: 'https://github.com/jonataslaw/benchmarks',
    },
    {
      title: 'API文档',
      path: 'https://pub.flutter-io.cn/documentation/get/latest/index.html',
    },
    {
      title: 'Github',
      children: [
        { title: 'GetX Github', path: 'https://github.com/jonataslaw/getx' },
        {
          title: 'Flutter GetX Doc Github',
          path: 'https://github.com/1467602180/flutter-getx-doc',
        },
      ],
    },
  ],
  logo: '/flutter-getx-doc/logo.png',
  analytics: {
    ga: 'G-WFS7T3W8F2',
    baidu: 'ee1914f1a1e0f365b031346e82781489',
  },
});
