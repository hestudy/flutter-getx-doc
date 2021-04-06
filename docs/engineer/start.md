---
title: 快速上手
order: 3
---

## 创建 Flutter 项目

```shell
flutter create my_project
```

<Alert type='warning'>
你也可以直接使用 get create project 创建项目，这将调用flutter create生成项目并自动执行 get init。但是如果你的网络环境不太好，这个命令将会使你卡在flutter的检测更新阶段。
</Alert>

## 初始化 GetX 结构

```shell
get init
```

**如果执行后卡住，请查看[getx-cli 命令卡住不动？](/engineer/fq#getx-cli命令卡住不动？)**

<Alert type='warning'>不要在旧项目中使用，这个命令将会删除你的 lib 目录并重建</Alert>

初始化后的 lib 目录结构如下

```shell
.
├── app
│   ├── data
│   ├── modules
│   │   └── home
│   │       ├── bindings
│   │       │   └── home_binding.dart
│   │       ├── controllers
│   │       │   └── home_controller.dart
│   │       └── views
│   │           └── home_view.dart
│   └── routes
│       ├── app_pages.dart
│       └── app_routes.dart
└── main.dart

```

是的，GetX Cli 已经帮你初始化好了一个路由结构以及 home 子页面，这个实例是可以直接运行的。

GetX Cli 将项目全部装进了 app 目录中，modules 存放页面，每个页面又分别存在 bindings，controllers，views

如果你知道 MVVM，那么你应该很熟悉，它们分别负责的是：

- bindings：负责 controller 与 view 的耦合，即 VM
- controller：负责响应式变量和非响应式变量的管理，即 M
- view：负责页面，即 V

即 view 与 controller 是解耦的，通过 binding 进行耦合。Flutter 官方示例大多数是一并写在一起，这将发生混乱，为协作和维护带来困难。

## 新增页面

```shell
get create page:demo
```

执行上面命令，你的 module 目录将会新增一个 demo 目录，结构如下

```shell
.
├── demo
│   ├── bindings
│   │   └── demo_binding.dart
│   ├── controllers
│   │   └── demo_controller.dart
│   └── views
│       └── demo_view.dart
└── home
    ├── bindings
    │   └── home_binding.dart
    ├── controllers
    │   └── home_controller.dart
    └── views
        └── home_view.dart

```

这将为你生成和 home 一致结构的目录，并且自动将 demo 加进路由表中

## 新增 view

```shell
get create view:demo on home
```

执行上面命令，将会在 module/home 目录下的 views 文件夹里新增一个 demo_view，结构如图

```shell
.
├── bindings
│   └── home_binding.dart
├── controllers
│   └── home_controller.dart
└── views
    ├── demo_view.dart
    └── home_view.dart
```

## 新增 controller

```shell
get create controller:demo on home
```

执行上面命令，将会在 module/home 目录下的 controllers 文件夹下新增一个 demo_controller，结构如图

```shell
.
├── bindings
│   └── home_binding.dart
├── controllers
│   ├── demo_controller.dart
│   └── home_controller.dart
└── views
    ├── demo_view.dart
    └── home_view.dart

```

并且会自动在 home_binding 中耦合 demo_controller，但是此时并没有 view 与 demo_controller 耦合，这就需要我们手动去绑定它。

修改 demo_view

```dart
// 修改前
class DemoView extends GetView {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('DemoView'),
        centerTitle: true,
      ),
      body: Center(
        child: Text(
          'DemoView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}

// 修改后
class DemoView extends GetView<DemoController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('DemoView'),
        centerTitle: true,
      ),
      body: Center(
        child: Text(
          'DemoView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
```

是的，你只需要在 GetView 后加上绑定的 controller 即可

## 自定义 Controller 模板

从本地文件获取模板

```shell
get create controller:auth with examples/authcontroller.dart on your_folder
```

从远程获取模板

```shell
get create controller:auth with 'https://raw.githubusercontent.com/jonataslaw/get_cli/master/samples_file/controller.dart.example' on your_folder
```

如果你的模板长这样

```dart
@import

class @controller extends GetxController {
  final  email = ''.obs;
  final  password = ''.obs;
  void login() {
  }

}
```

那么生成的 Controller 就是这样的

```dart
import 'package:get/get.dart';

class AuthController extends GetxController {
  final email = ''.obs;
  final password = ''.obs;
  void login() {}
}
```

## 国际化

## 生成翻译文件

准备好你的语言 json 文件，将其放入 `assets/locales` 下

例如

`pt_BR.json`

```json
{
  "buttons": {
    "login": "Entrar",
    "sign_in": "Cadastrar-se",
    "logout": "Sair",
    "sign_in_fb": "Entrar com o Facebook",
    "sign_in_google": "Entar com o Google",
    "sign_in_apple": "Entar com a  Apple"
  }
}
```

`en_US.json`

```json
{
  "buttons": {
    "login": "Login",
    "sign_in": "Sign-in",
    "logout": "Logout",
    "sign_in_fb": "Sign-in with Facebook",
    "sign_in_google": "Sign-in with Google",
    "sign_in_apple": "Sign-in with Apple"
  }
}
```

然后执行生成命令

```shell
get generate locales assets/locales
```

这将会为你生成一份翻译文件

```dart
abstract class AppTranslation {

  static Map<String, Map<String, String>> translations = {
    'en_US' : Locales.en_US,
    'pt_BR' : Locales.pt_BR,
  };

}
abstract class LocaleKeys {
  static const buttons_login = 'buttons_login';
  static const buttons_sign_in = 'buttons_sign_in';
  static const buttons_logout = 'buttons_logout';
  static const buttons_sign_in_fb = 'buttons_sign_in_fb';
  static const buttons_sign_in_google = 'buttons_sign_in_google';
  static const buttons_sign_in_apple = 'buttons_sign_in_apple';
}

abstract class Locales {

  static const en_US = {
   'buttons_login': 'Login',
   'buttons_sign_in': 'Sign-in',
   'buttons_logout': 'Logout',
   'buttons_sign_in_fb': 'Sign-in with Facebook',
   'buttons_sign_in_google': 'Sign-in with Google',
   'buttons_sign_in_apple': 'Sign-in with Apple',
  };
  static const pt_BR = {
   'buttons_login': 'Entrar',
   'buttons_sign_in': 'Cadastrar-se',
   'buttons_logout': 'Sair',
   'buttons_sign_in_fb': 'Entrar com o Facebook',
   'buttons_sign_in_google': 'Entar com o Google',
   'buttons_sign_in_apple': 'Entar com a  Apple',
  };

```

## 接入翻译功能

在你的 `GetMaterialApp` 中新增一行

```dart
GetMaterialApp(
      ...
      translationsKeys: AppTranslation.translations,
      ...
    )
```

## 使用

```dart
Text(
  'buttons_login'.tr
)
```

## 生成 Model

准备你的数据 json 文件，放入 `assets/models` 下

例如：

`user.json`

```json
{
  "name": "",
  "age": 0,
  "friends": ["", ""]
}
```

执行生成命令

```shell
get generate model on home with assets/models/user.json
```

将会为你生成一份 Model 文件和一份 `Provider` 文件，具体查看[网络请求](/engineer/advanced#网络请求)

```dart
class User {
  String name;
  int age;
  List<String> friends;

  User({this.name, this.age, this.friends});

  User.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    age = json['age'];
    friends = json['friends'].cast<String>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['age'] = this.age;
    data['friends'] = this.friends;
    return data;
  }
}
```
