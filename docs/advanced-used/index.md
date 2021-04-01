---

title: 进阶使用
toc: menu

---

## 可选的全局设置和手动配置

GetMaterialApp为你配置了一切，但如果你想手动配置Get。

```dart
MaterialApp(
  navigatorKey: Get.key,
  navigatorObservers: [GetObserver()],
);
```

你也可以在GetObserver中使用自己的中间件，这不会影响任何事情。

```dart
MaterialApp(
  navigatorKey: Get.key,
  navigatorObservers: [
    GetObserver(MiddleWare.observer) // Here
  ],
);
```

你可以为 "Get "创建_全局设置。只需在推送任何路由之前将Get.config添加到你的代码中。 或者直接在你的GetMaterialApp中做。

```dart
GetMaterialApp(
  enableLog: true,
  defaultTransition: Transition.fade,
  opaqueRoute: Get.isOpaqueRouteDefault,
  popGesture: Get.isPopGestureEnable,
  transitionDuration: Get.defaultDurationTransition,
  defaultGlobalState: Get.defaultGlobalState,
);

Get.config(
  enableLog = true,
  defaultPopGesture = true,
  defaultTransition = Transitions.cupertino
)
```

## 局部状态组件

这些Widgets允许您管理一个单一的值，并保持状态的短暂性和本地性。 我们有Reactive和Simple两种风格。 例如，你可以用它们来切换TextField中的obscureText，也许可以创建一个自定义的可扩展面板（Expandable Panel），或者在"Scaffold "的主体中改变内容的同时修改BottomNavigationBar中的当前索引。

### ValueBuilder

StatefulWidget的简化，它与.setState回调一起工作，并接受更新的值。

```dart
ValueBuilder<bool>(
  initialValue: false,
  builder: (value, updateFn) => Switch(
    value: value,
    onChanged: updateFn, // 你可以用( newValue )=> updateFn( newValue )。
  ),
  // 如果你需要调用 builder 方法之外的东西。
  onUpdate: (value) => print("Value updated: $value"),
  onDispose: () => print("Widget unmounted"),
),
```

### ObxValue

类似于ValueBuilder，但这是Reactive版本，你需要传递一个Rx实例（还记得神奇的.obs吗？自动更新......是不是很厉害？）

```dart
ObxValue((data) => Switch(
        value: data.value,
        onChanged: data, // Rx 有一个 _callable_函数! 你可以使用 (flag) => data.value = flag,
    ),
    false.obs,
),
```

## 有用的提示

`.observables` (也称为_Rx_ Types)有各种各样的内部方法和操作符。

.obs的属性是实际值，不要搞错了! 我们避免了变量的类型声明，因为Dart的编译器足够聪明，而且代码 看起来更干净，但：

```dart
var message = 'Hello world'.obs;
print( 'Message "$message" has Type ${message.runtimeType}');
```

即使message _prints_实际的字符串值，类型也是RxString！ 所以，你不能做message.substring( 0, 4 )。 你必须在_observable_里面访问真正的value。 最常用的方法是".value", 但是你也可以用...

```dart
final name = 'GetX'.obs;
//只有在值与当前值不同的情况下，才会 "更新 "流。
name.value = 'Hey';

// 所有Rx属性都是 "可调用 "的，并返回新的值。
//但这种方法不接受 "null"，UI将不会重建。
name('Hello');

// 就像一个getter，打印'Hello'。
name() ;

///数字。

final count = 0.obs;

// 您可以使用num基元的所有不可变操作!
count + 1;

// 注意！只有当 "count "不是final时，这才有效，除了var
count += 1;

// 你也可以与数值进行比较。
count > 2;

/// booleans:

final flag = false.obs;

// 在真/假之间切换数值
flag.toggle();


/// 所有类型。

// 将 "value "设为空。
flag.nil();

// 所有的toString()、toJson()操作都会向下传递到`value`。
print( count ); // 在内部调用 "toString() "来GetRxInt

final abc = [0,1,2].obs;
// 将值转换为json数组，打印RxList。
// 所有Rx类型都支持Json!
print('json: ${jsonEncode(abc)}, type: ${abc.runtimeType}');

// RxMap, RxList 和 RxSet 是特殊的 Rx 类型，扩展了它们的原生类型。
// 但你可以像使用普通列表一样使用列表，尽管它是响应式的。
abc.add(12); // 将12添加到列表中，并更新流。
abc[3]; // 和Lists一样，读取索引3。


// Rx和值是平等的，但hashCode总是从值中提取。
final number = 12.obs;
print( number == 12 ); // prints > true

///自定义Rx模型。

// toJson(), toString()都是递延给子代的，所以你可以在它们上实现覆盖，并直接打印()可观察的内容。

class User {
    String name, last;
    int age;
    User({this.name, this.last, this.age});

    @override
    String toString() => '$name $last, $age years old';
}

final user = User(name: 'John', last: 'Doe', age: 33).obs;

// `user`是 "响应式 "的，但里面的属性却不是!
// 所以，如果我们改变其中的一些变量：
user.value.name = 'Roi';
// 小部件不会重建！ 
// 对于自定义类，我们需要手动 "通知 "改变。
user.refresh();

// 或者我们可以使用`update()`方法!
user.update((value){
  value.name='Roi';
});

print( user );
```

## GetView

它是一个对已注册的Controller有一个名为controller的getter的const Stateless的Widget，仅此而已。

```dart
class AwesomeController extends GetxController {
   final String title = 'My Awesome View';
 }

  // 一定要记住传递你用来注册控制器的`Type`!
 class AwesomeView extends GetView<AwesomeController> {
   @override
   Widget build(BuildContext context) {
     return Container(
       padding: EdgeInsets.all(20),
       child: Text( controller.title ), // 只需调用 "controller.something"。
     );
   }
 }
```

## GetWidget

大多数人都不知道这个Widget，或者完全搞不清它的用法。 这个用例非常少见且特殊：它 "缓存 "了一个Controller，由于_cache_，不能成为一个 "const Stateless"（因为_cache_，所以不能成为一个const Stateless）。

那么，什么时候你需要 "缓存 "一个Controller？

如果你使用了GetX的另一个 "不常见 "的特性 `Get.create()`

`Get.create(()=>Controller())` 会在每次调用时生成一个新的Controller `Get.find<Controller>()`

你可以用它来保存Todo项目的列表，如果小组件被 "重建"，它将保持相同的控制器实例。

## GetxService

这个类就像一个 "GetxController"，它共享相同的生命周期 `（"onInit()"、"onReady()"、"onClose()"）` 。 但里面没有 "逻辑"。它只是通知GetX的依赖注入系统，这个子类不能从内存中删除。

所以这对保持你的 "服务 "总是可以被Get.find()获取到并保持运行是超级有用的。比如 ApiService，StorageService，CacheService。

```dart
Future<void> main() async {
  await initServices(); /// 等待服务初始化.
  runApp(SomeApp());
}

/// 在你运行Flutter应用之前，让你的服务初始化是一个明智之举。
////因为你可以控制执行流程（也许你需要加载一些主题配置，apiKey，由用户自定义的语言等，所以在运行ApiService之前加载SettingService。
///所以GetMaterialApp()不需要重建，可以直接取值。
void initServices() async {
  print('starting services ...');
  ///这里是你放get_storage、hive、shared_pref初始化的地方。
  ///或者moor连接，或者其他什么异步的东西。
  await Get.putAsync(() => DbService().init());
  await Get.putAsync(SettingsService()).init();
  print('All services started...');
}

class DbService extends GetxService {
  Future<DbService> init() async {
    print('$runtimeType delays 2 sec');
    await 2.delay();
    print('$runtimeType ready!');
    return this;
  }
}

class SettingsService extends GetxService {
  void init() async {
    print('$runtimeType delays 1 sec');
    await 1.delay();
    print('$runtimeType ready!');
  }
}
```

实际删除一个GetxService的唯一方法是使用 `Get.reset()` ，它就像"热重启 "你的应用程序。

所以如果你需要在你的应用程序的生命周期内对一个类实例进行绝对的持久化，请使用GetxService。
