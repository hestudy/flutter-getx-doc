---

title: 进阶使用
order: 4

---

<Alert type='warning'>
本篇大量使用IDE拓展进行代码生成，请确保已经安装。本篇使用Idea进行演示
</Alert>

[安装IDE拓展](/engineer/ready#安装ide拓展)

## 网络请求

GetX建议将网络请求拆分成 `Repository` 与 `Provider` 两层

`Repository` 负责将请求的数据进行存储，预处理

`Provider` 负责发出请求，以及处理请求返回，请求错误等

## 生成Provider

在 `lib/app/module/home` 下新建一个 `providers` 文件夹

并创建一个 `home_provider.dart` 文件

<Alert type='warning'>
如果你执行过 get generate model 那么你已经拥有了一个provider。但是不推荐使用通过model生成的provider。结构太简单，不方便维护。
</Alert>

然后在IDE里输入 `getpro`

会出现代码补全提示

![代码提示](/flutter-getx-doc/engineer/generate_provider.png)

带 `dio` 的是基于 [Dio](https://pub.flutter-io.cn/packages/dio) 库的

不带的是基于 [http](https://pub.flutter-io.cn/packages/http) 库的

请安装好对应的http请求库，再进行以下步骤

根据自己的喜好选择，本文使用dio进行演示

进行代码补全，这将为你生成

```dart
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:meta/meta.dart';

const baseUrl = 'http://gerador-nomes.herokuapp.com/nomes/10';

class MyApiClient {
  final Dio httpClient;
  MyApiClient({@required this.httpClient});

  Future<List<MyModel>>getAll() async {
    try {
      var response = await httpClient.get(baseUrl);
      if (response.statusCode == 200) {
        Map<String, dynamic> jsonResponse = json.decode(response.data);
        return jsonResponse['data'].map((obj) => MyModel.fromJson(obj)).toList();
      } else {
        print('Error -getAll');
      }
    } catch (_) {}
    return null ;
  }
}

```

你可以按下Tab键进行光标的移动，并更改类名，将其更改为：

```dart
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:meta/meta.dart';

import '../user_model.dart';

const baseUrl = 'http://gerador-nomes.herokuapp.com/nomes/10';

class HomeApiClient {
  final Dio httpClient;
  HomeApiClient({@required this.httpClient});

  Future<User>getAll() async {
    try {
      var response = await httpClient.get(baseUrl);
      if (response.statusCode == 200) {
        return User.formJson(response.data);
      } else {
        print('Error -getAll');
      }
    } catch (_) {
      print(_);
    }
    return null ;
  }
}

```

## 生成Repository

在 `lib/app/module/home` 下新建一个 `repositorys` 文件夹

并创建一个 `home_repository.dart` 文件

然后在IDE里输入 `getrepo`

会出现代码补全提示

![代码补全提示](/flutter-getx-doc/engineer/generate_repository.png)

这将自动为你生成如下代码：

```dart
import 'package:meta/meta.dart';

class MyRepository {
  final MyApiClient apiClient;

  MyRepository({@required this.apiClient}) : assert(apiClient != null);

  getAll() {
    return apiClient.getAll();
  }

  getId(id) {
    return apiClient.getId(id);
  }

  delete(id) {
    return apiClient.delete(id);
  }

  edit(obj) {
    return apiClient.edit(obj);
  }

  add(obj) {
    return apiClient.add(obj);
  }
}


```

你可以按下Tab键进行光标的移动，并更改类名，将其更改为：

```dart
import 'package:meta/meta.dart';

class HomeRepository {
  final HomeApiClient apiClient;

  HomeRepository({@required this.apiClient}) : assert(apiClient != null);

  getAll() {
    return apiClient.getAll();
  }
}


```

## 创建http请求实例

`Provider` 只是处理请求的发送和接收返回，真正进行请求的实例是需要自己定义的。

创建目录 `app/core/utils` ，并创建文件 `dio_util.dart` 写入如下内容

```dart
import 'package:dio/dio.dart';

Dio dioUtil() {
  Dio dio = Dio();

  dio.options.baseUrl = 'https://www.xx.com/api';
  dio.options.connectTimeout = 5000;
  dio.options.receiveTimeout = 3000;

  dio.interceptors.add(InterceptorsWrapper(onRequest: (options, handler) {
    // Do something before request is sent
    return handler.next(options); //continue
    // 如果你想完成请求并返回一些自定义数据，你可以resolve一个Response对象 `handler.resolve(response)`。
    // 这样请求将会被终止，上层then会被调用，then中返回的数据将是你的自定义response.
    //
    // 如果你想终止请求并触发一个错误,你可以返回一个`DioError`对象,如`handler.reject(error)`，
    // 这样请求将被中止并触发异常，上层catchError会被调用。
  }, onResponse: (response, handler) {
    // Do something with response data
    return handler.next(response); // continue
    // 如果你想终止请求并触发一个错误,你可以 reject 一个`DioError`对象,如`handler.reject(error)`，
    // 这样请求将被中止并触发异常，上层catchError会被调用。
  }, onError: (DioError e, handler) {
    // Do something with response error
    return handler.next(e); //continue
    // 如果你想完成请求并返回一些自定义数据，可以resolve 一个`Response`,如`handler.resolve(response)`。
    // 这样请求将会被终止，上层then会被调用，then中返回的数据将是你的自定义response.
  }));

  return dio;
}

```

## 绑定Controller

`Repository` 和 `Provider` 都准备好了，接下来将 `Repository` 绑定到Controller

在 `home_controller.dart` 新增

```dart
class HomeController extends GetxController {

  HomeRepository repository;
  HomeController({@required this.repository}) : assert(repository != null);

  ...
}
```

修改 `home_binding.dart`

修改前

```dart
class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<DemoController>(
      () => DemoController(),
    );
    Get.lazyPut<HomeController>(
      () => HomeController(),
    );
  }
}
```

修改后

```dart
class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<DemoController>(
      () => DemoController(),
    );
    Get.lazyPut<HomeController>(
      () => HomeController(
        repository: HomeRepository(
          apiClient: HomeApiClient(
            httpClient: dioUtil(),
          ),
        ),
      ),
    );
  }
}
```

是的，我们通过 `binding` 将 `controller` `repository` `provider` `dioUtil` 耦合在了一起，它们各司其职，互不干扰。

## 使用

```dart
final response = await repository.getAll();
// or
repository.getAll().then((res){});
```
