import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Flutter Getx Doc',
  mode: 'site',
  locales: [['zh-CN', '中文']],
  navs: [
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
      title: 'Github',
      path: 'https://github.com/jonataslaw/getx',
    },
  ],
  logo: '/logo.png',
});
