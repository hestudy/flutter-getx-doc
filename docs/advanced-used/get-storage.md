---
title: GetStorage
order: 4
---

## 介绍

内存中一个快速、超轻且同步的键值，每次操作时都将数据备份到磁盘。它完全是用 `Dart` 编写的，并且很容易与 `Flutter` 的 `GetX` 集成。

支持 `Android、iOS、Web、Mac、Linux、fuchsia和Windows`。可以存储 `string、int、double、Map和List`

如果您想在磁盘上持久地存储数据，并且可以立即访问内存，那么可以使用它；

如果您想要一个数据库，可以使用索引和特定的磁盘存储工具，比如 `Hive` 和 `Sqflite/Moor` 。这种情况下 `GetStorage` 并不适合你。

一旦您声明 `write` ，文件就会立即写入内存，马上就可以使用 `box.read()` . 您也可以使用 `await box.write()` 等待将其写入磁盘。

### 用与不用

以下情况你可以使用 `GetStorage`

- 简单的 Map 存储。
- http 请求缓存
- 简单用户信息的存储。
- 简单持久的状态存储
- 当前正在使用 SharedReference。

以下情况不推荐你使用 `GetStorage`

- 需要索引。
- 当您需要在开始另一个操作之前始终检查文件是否已写入存储磁盘时（在内存中的存储会立即完成，并且可以使用 `box.read()` ，磁盘备份在后台完成。为了确保备份完成，您可以使用 `await` ，但是如果您需要一直调用 `await` ，那么使用内存存储是没有意义的。）

## 性能

GetStorage 是基于内存的，所以速度非常快。他所有的行动都是瞬间的。每个操作的备份都放在磁盘上的容器中。每个容器都有自己的文件。

![read](/flutter-getx-doc/advanced-used/get-storage/performance-read.png)

![write](/flutter-getx-doc/advanced-used/get-storage/performance-write.png)

![delete](/flutter-getx-doc/advanced-used/get-storage/performance-delete.png)

## 引入

在你的 `pubspec.yaml` 文件中添加

```yaml
dependencies:
  get_storage: ^2.0.2
```

最新版本查看[pub 仓库](https://pub.flutter-io.cn/packages/get_storage)

并运行 `flutter pub get`

## 使用

### 初始化

在你的 `main.dart` 中添加

```dart
main() async {
  await GetStorage.init();
  runApp(App());
}

```

### 声明 Storage

```dart
final box = GetStorage();
```

### 读取

```dart
box.read('quote')
```

### 写入

```dart
box.write('quote', 'GetX is the best');

```

### 删除

```dart
box.remove('quote');

```

### 监听

```dart
box.listen((){
  print('box changed');
});

```

### 清除监听

```dart
box.removeListen(listen);

```

### 监听指定 key

```dart
box.listenKey('key', (value){
  print('new key is $value');
});

```

### 清理 Storage

```dart
box.erase();

```

## 多个 Storage

你可以指定多个 Storage，只需要为它们加上一个名字

```dart
GetStorage g = GetStorage('MyStorage');

```

当然，你也需要初始化它们

```dart
await GetStorage.init('MyStorage');

```

## SharedPreferences Implementation

```dart
class MyPref {
  static final _otherBox = () => GetStorage('MyPref');

  final username = ''.val('username');
  final age = 0.val('age');
  final price = 1000.val('price', getBox: _otherBox);

  // or
  final username2 = ReadWriteValue('username', '');
  final age2 = ReadWriteValue('age', 0);
  final price2 = ReadWriteValue('price', '', _otherBox);
}

...

void updateAge() {
  final age = 0.val('age');
  // or
  final age = ReadWriteValue('age', 0, () => box);
  // or
  final age = Get.find<MyPref>().age;

  age.val = 1; // will save to box
  final realAge = age.val; // will read from box
}

```
