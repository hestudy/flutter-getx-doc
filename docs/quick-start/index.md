---

title: 快速开始
toc: menu

---

## 介绍

GetX 是 Flutter 上的一个轻量且强大的解决方案：高性能的状态管理、智能的依赖注入和便捷的路由管理。

GetX 有3个基本原则：

性能： GetX 专注于性能和最小资源消耗。GetX 打包后的apk占用大小和运行时的内存占用与其他状态管理插件不相上下。如果你感兴趣，这里有一个性能测试。
效率： GetX 的语法非常简捷，并保持了极高的性能，能极大缩短你的开发时长。
结构： GetX 可以将界面、逻辑、依赖和路由完全解耦，用起来更清爽，逻辑更清晰，代码更容易维护。
GetX 并不臃肿，却很轻量。如果你只使用状态管理，只有状态管理模块会被编译，其他没用到的东西都不会被编译到你的代码中。它拥有众多的功能，但这些功能都在独立的容器中，只有在使用后才会启动。

## 引入Getx

在你的 `pubspec.yaml` 文件下增加

```yaml
dependencies:
  get: ^4.1.1
```

最新版本进pub仓库查看：[pub.dev](https://pub.flutter-io.cn/packages/get)

## 状态管理

目前，Flutter有几种状态管理器。但是，它们中的大多数都涉及到使用ChangeNotifier来更新widget，这对于中大型应用的性能来说是一个很糟糕的方法。

你可以在Flutter的官方文档中查看到，[ChangeNotifier应该使用1个或最多2个监听器](https://api.flutter.dev/flutter/foundation/ChangeNotifier-class.html)，这使得它们实际上无法用于任何中等或大型应用。

Get 并不是比任何其他状态管理器更好或更差，而是说你应该分析这些要点以及下面的要点来选择只用Get，还是与其他状态管理器结合使用。

Get不是其他状态管理器的敌人，因为Get是一个微框架，而不仅仅是一个状态管理器，既可以单独使用，也可以与其他状态管理器结合使用。

Get有两个不同的状态管理器：简单的状态管理器（GetBuilder）和响应式状态管理器（GetX）。

响应式状态管理器
响应式编程可能会让很多人感到陌生，因为觉得它很复杂，但是GetX将响应式编程变得非常简单。

你不需要创建StreamControllers.
你不需要为每个变量创建一个StreamBuilder。
你不需要为每个状态创建一个类。
你不需要为一个初始值创建一个get。
使用 Get 的响应式编程就像使用 setState 一样简单。

## 官方计时器例子

首先我们创建我们的变量控制器controller

```dart
class Controller extends GetxController{
  var count = 0.obs;
  increment() => count++;
}
```

然后创建我们的页面，使用StatelessWidget节省一些内存，使用Getx你可能不再需要使用StatefulWidget。

```dart
class Home extends StatelessWidget {

  @override
  Widget build(context) {

    // 使用Get.put()实例化你的类，使其对当下的所有子路由可用。
    final Controller c = Get.put(Controller());

    return Scaffold(
      // 使用Obx(()=>每当改变计数时，就更新Text()。
      appBar: AppBar(title: Obx(() => Text("Clicks: ${c.count}"))),

      // 用一个简单的Get.to()即可代替Navigator.push那8行，无需上下文！
      body: Center(child: ElevatedButton(
              child: Text("Go to Other"), onPressed: () => Get.to(Other()))),
      floatingActionButton:
          FloatingActionButton(child: Icon(Icons.add), onPressed: c.increment));
  }
}

class Other extends StatelessWidget {
  // 你可以让Get找到一个正在被其他页面使用的Controller，并将它返回给你。
  final Controller c = Get.find();

  @override
  Widget build(context){
     // 访问更新后的计数变量
     return Scaffold(body: Center(child: Text("${c.count}")));
  }
}
```

如此便完成了官方的计时器

## 路由管理

Getx支持 `免上下文(context)` 使用 `路由/snackbars/dialogs/bottomsheets`

## 普通导航

导航到新的页面。

```dart
Get.to(NextScreen());
```

关闭SnackBars、Dialogs、BottomSheets或任何你通常会用Navigator.pop(context)关闭的东西。

```dart
Get.back();
```

进入下一个页面，但没有返回上一个页面的选项（用于SplashScreens，登录页面等）。

```dart
Get.off(NextScreen());
```

进入下一个界面并取消之前的所有路由（在购物车、投票和测试中很有用）。

```dart
Get.offAll(NextScreen());
```

要导航到下一条路由，并在返回后立即接收或更新数据。

```dart
var data = await Get.to(Payment());
```

在另一个页面上，发送前一个路由的数据。

```dart
Get.back(result: 'success');
```

<Alert type="info">
如果你不想用Getx的路由语法，它也提供了类Flutter语法，只要把 Navigator（大写）改成 navigator（小写），你就可以拥有标准导航的所有功能，而不需要使用context
</Alert>

```dart
// 默认的Flutter导航
Navigator.of(context).push(
  context,
  MaterialPageRoute(
    builder: (BuildContext context) {
      return HomePage();
    },
  ),
);

// 使用Flutter语法获得，而不需要context。
navigator.push(
  MaterialPageRoute(
    builder: (_) {
      return HomePage();
    },
  ),
);

// get语法 (这要好得多)
Get.to(HomePage());

```

## 别名导航

导航到下一个页面

```dart
Get.toNamed("/NextScreen");
```

浏览并删除前一个页面。

```dart
Get.offNamed("/NextScreen");
```

浏览并删除所有以前的页面。

```dart
Get.offAllNamed("/NextScreen");
```

要定义路由，使用GetMaterialApp。

```dart
void main() {
  runApp(
    GetMaterialApp(
      initialRoute: '/',
      getPages: [
        GetPage(name: '/', page: () => MyHomePage()),
        GetPage(name: '/second', page: () => Second()),
        GetPage(
          name: '/third',
          page: () => Third(),
          transition: Transition.zoom  
        ),
      ],
    )
  );
}
```

要处理到未定义路线的导航（404错误），可以在GetMaterialApp中定义unknownRoute页面。

```dart
void main() {
  runApp(
    GetMaterialApp(
      unknownRoute: GetPage(name: '/notfound', page: () => UnknownRoutePage()),
      initialRoute: '/',
      getPages: [
        GetPage(name: '/', page: () => MyHomePage()),
        GetPage(name: '/second', page: () => Second()),
      ],
    )
  );
}
```

## 路由传参

Get提供高级动态URL，就像在Web上一样。

```dart
Get.offAllNamed("/NextScreen?device=phone&id=354&name=Enzo");
```

获取参数：

```dart
print(Get.parameters['id']);
// out: 354
print(Get.parameters['name']);
// out: Enzo
```

你也可以用Get轻松接收NamedParameters。

```dart
void main() {
  runApp(
    GetMaterialApp(
      initialRoute: '/',
      getPages: [
      GetPage(
        name: '/',
        page: () => MyHomePage(),
      ),
      GetPage(
        name: '/profile/',
        page: () => MyProfile(),
      ),
       //你可以为有参数的路由定义一个不同的页面，也可以为没有参数的路由定义一个不同的页面，但是你必须在不接收参数的路由上使用斜杠"/"，就像上面说的那样。
       GetPage(
        name: '/profile/:user',
        page: () => UserProfile(),
      ),
      GetPage(
        name: '/third',
        page: () => Third(),
        transition: Transition.cupertino  
      ),
     ],
    )
  );
}
```

发送数据

```dart
Get.toNamed("/second/34954");
```

在第二个页面上，通过参数获取数据

```dart
print(Get.parameters['user']);
// out: 34954
```

或像这样发送多个参数

```dart
Get.toNamed("/profile/34954?flag=true");
```

在第二个屏幕上，通常按参数获取数据

```dart
print(Get.parameters['user']);
print(Get.parameters['flag']);
// out: 34954 true
```

现在，你需要做的就是使用Get.toNamed()来导航你的别名路由，不需要任何context(你可以直接从你的BLoC或Controller类中调用你的路由)，当你的应用程序被编译到web时，你的路由将出现在URL中。

## 中间件

如果你想通过监听Get事件来触发动作，你可以使用routingCallback来实现。

```dart
GetMaterialApp(
  routingCallback: (routing) {
    if(routing.current == '/second'){
      openAds();
    }
  }
)
```

如果你没有使用GetMaterialApp，你可以使用手动API来附加Middleware观察器。

```dart
void main() {
  runApp(
    MaterialApp(
      onGenerateRoute: Router.generateRoute,
      initialRoute: "/",
      navigatorKey: Get.key,
      navigatorObservers: [
        GetObserver(MiddleWare.observer), // HERE !!!
      ],
    ),
  );
}
```

创建一个MiddleWare类

```dart
class MiddleWare {
  static observer(Routing routing) {
    ///你除了可以监听路由外，还可以监听每个页面上的SnackBars、Dialogs和Bottomsheets。
    if (routing.current == '/second' && !routing.isSnackbar) {
      Get.snackbar("Hi", "You are on second route");
    } else if (routing.current =='/third'){
      print('last route called');
    }
  }
}
```

现在，在你的代码上使用Get：

```dart
class First extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.add),
          onPressed: () {
            Get.snackbar("hi", "i am a modern snackbar");
          },
        ),
        title: Text('First Route'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('Open route'),
          onPressed: () {
            Get.toNamed("/second");
          },
        ),
      ),
    );
  }
}

class Second extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.add),
          onPressed: () {
            Get.snackbar("hi", "i am a modern snackbar");
          },
        ),
        title: Text('second Route'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('Open route'),
          onPressed: () {
            Get.toNamed("/third");
          },
        ),
      ),
    );
  }
}

class Third extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Third Route"),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Get.back();
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
```

## 免context导航

### SnackBars

用Flutter创建一个简单的SnackBar，你必须获得Scaffold的context，或者你必须使用一个GlobalKey附加到你的Scaffold上。

```dart
final snackBar = SnackBar(
  content: Text('Hi!'),
  action: SnackBarAction(
    label: 'I am a old and ugly snackbar :(',
    onPressed: (){}
  ),
);

// 在小组件树中找到脚手架并使用它显示一个SnackBars。
Scaffold.of(context).showSnackBar(snackBar);
```

用Get：

```dart
Get.snackbar('Hi', 'i am a modern snackbar');
```

有了Get，你所要做的就是在你代码的任何地方调用你的Get.snackbar，或者按照你的意愿定制它。

```dart
Get.snackbar(
  "Hey i'm a Get SnackBar!", // title
  "It's unbelievable! I'm using SnackBar without context, without boilerplate, without Scaffold, it is something truly amazing!", // message
  icon: Icon(Icons.alarm),
  shouldIconPulse: true,
  onTap:(){},
  barBlur: 20,
  isDismissible: true,
  duration: Duration(seconds: 3),
);
////////// ALL FEATURES //////////
//     Color colorText,
//     Duration duration,
//     SnackPosition snackPosition,
//     Widget titleText,
//     Widget messageText,
//     bool instantInit,
//     Widget icon,
//     bool shouldIconPulse,
//     double maxWidth,
//     EdgeInsets margin,
//     EdgeInsets padding,
//     double borderRadius,
//     Color borderColor,
//     double borderWidth,
//     Color backgroundColor,
//     Color leftBarIndicatorColor,
//     List<BoxShadow> boxShadows,
//     Gradient backgroundGradient,
//     TextButton mainButton,
//     OnTap onTap,
//     bool isDismissible,
//     bool showProgressIndicator,
//     AnimationController progressIndicatorController,
//     Color progressIndicatorBackgroundColor,
//     Animation<Color> progressIndicatorValueColor,
//     SnackStyle snackStyle,
//     Curve forwardAnimationCurve,
//     Curve reverseAnimationCurve,
//     Duration animationDuration,
//     double barBlur,
//     double overlayBlur,
//     Color overlayColor,
//     Form userInputForm
///////////////////////////////////
```

如果您喜欢传统的SnackBars，或者想从头开始定制，包括只添加一行(Get.snackbar使用了一个强制性的标题和信息)，您可以使用 Get.rawSnackbar();它提供了建立Get.snackbar的RAW API。

### Dialogs

打开Dialogs：

```dart
Get.dialog(YourDialogWidget());
```

打开默认Dialogs：

```dart
Get.defaultDialog(
  onConfirm: () => print("Ok"),
  middleText: "Dialog made in 3 lines of code"
);
```

你也可以用Get.generalDialog代替showGeneralDialog。

对于所有其他的FlutterDialogs小部件，包括cupertinos，你可以使用Get.overlayContext来代替context，并在你的代码中任何地方打开它。 对于不使用Overlay的小组件，你可以使用Get.context。 这两个context在99%的情况下都可以代替你的UIcontext，除了在没有导航context的情况下使用 inheritedWidget的情况。

### BottomSheets

Get.bottomSheet类似于showModalBottomSheet，但不需要context：

```dart
Get.bottomSheet(
  Container(
    child: Wrap(
      children: <Widget>[
        ListTile(
          leading: Icon(Icons.music_note),
          title: Text('Music'),
          onTap: () {}
        ),
        ListTile(
          leading: Icon(Icons.videocam),
          title: Text('Video'),
          onTap: () {},
        ),
      ],
    ),
  )
);
```

## 嵌套导航

Get让Flutter的嵌套导航更加简单。 你不需要context，而是通过Id找到你的导航栈。

<Alert type='warning'>
注意：创建平行导航堆栈可能是危险的。理想的情况是不要使用NestedNavigators，或者尽量少用。如果你的项目需要它，请继续，但请记住，在内存中保持多个导航堆栈可能不是一个好主意(消耗RAM)。
看看它有多简单:
</Alert>

```dart
Navigator(
  key: Get.nestedKey(1), // create a key by index
  initialRoute: '/',
  onGenerateRoute: (settings) {
    if (settings.name == '/') {
      return GetPageRoute(
        page: () => Scaffold(
          appBar: AppBar(
            title: Text("Main"),
          ),
          body: Center(
            child: TextButton(
              color: Colors.blue,
              onPressed: () {
                Get.toNamed('/second', id:1); // navigate by your nested route by index
              },
              child: Text("Go to second"),
            ),
          ),
        ),
      );
    } else if (settings.name == '/second') {
      return GetPageRoute(
        page: () => Center(
          child: Scaffold(
            appBar: AppBar(
              title: Text("Main"),
            ),
            body: Center(
              child:  Text("second")
            ),
          ),
        ),
      );
    }
  }
),
```

## 国际化

## 翻译

翻译被保存为一个简单的键值字典映射。 要添加自定义翻译，请创建一个类并扩展翻译。

```dart
import 'package:get/get.dart';

class Messages extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'zh_CN': {
          'hello': '你好 世界',
        },
        'de_DE': {
          'hello': 'Hallo Welt',
        }
      };
}
```

## 使用翻译

只要将.tr追加到指定的键上，就会使用Get.locale和Get.fallbackLocale的当前值进行翻译。

```dart
Text('title'.tr);
```

## 语言

传递参数给GetMaterialApp来定义语言和翻译。

```dart
return GetMaterialApp(
    translations: Messages(), // 你的翻译
    locale: Locale('zh', 'CN'), // 将会按照此处指定的语言翻译
    fallbackLocale: Locale('en', 'US'), // 添加一个回调语言选项，以备上面指定的语言翻译不存在
);
```

## 改变语言

调用Get.updateLocale(locale)来更新语言环境。然后翻译会自动使用新的locale。

```dart
var locale = Locale('en', 'US');
Get.updateLocale(locale);
```

## 系统语言

要读取系统语言，可以使用window.locale。

```dart
import 'dart:ui' as ui;

return GetMaterialApp(
    locale: ui.window.locale,
);
```

## 主题

<Alert type='warning'>
请不要使用比GetMaterialApp更高级别的widget来更新主题，这可能会造成键重复。
</Alert>

你可以创建你的自定义主题，并简单地将其添加到Get.changeTheme中，而无需任何模板。

```dart
Get.changeTheme(ThemeData.light());
```

如果你想在 "onTap "中创建类似于改变主题的按钮，你可以结合两个GetX API来实现。

检查是否使用了深色的 "Theme "的API，以及 "Theme "更改API。
而Theme Change API，你可以把下面的代码放在onPressed里。

```dart
Get.changeTheme(Get.isDarkMode? ThemeData.light(): ThemeData.dark());
```

当.darkmode被激活时，它将切换到light主题，当light主题被激活时，它将切换到dark主题。

## 其他高级Api

```dart
// 给出当前页面的args。
Get.arguments

//给出以前的路由名称
Get.previousRoute

// 给出要访问的原始路由，例如，rawRoute.isFirst()
Get.rawRoute

// 允许从GetObserver访问Rounting API。
Get.routing

// 检查 snackbar 是否打开
Get.isSnackbarOpen

// 检查 dialog 是否打开
Get.isDialogOpen

// 检查 bottomsheet 是否打开
Get.isBottomSheetOpen

// 删除一个路由。
Get.removeRoute()

//反复返回，直到表达式返回真。
Get.until()

// 转到下一条路由，并删除所有之前的路由，直到表达式返回true。
Get.offUntil()

// 转到下一个命名的路由，并删除所有之前的路由，直到表达式返回true。
Get.offNamedUntil()

//检查应用程序在哪个平台上运行。
GetPlatform.isAndroid
GetPlatform.isIOS
GetPlatform.isMacOS
GetPlatform.isWindows
GetPlatform.isLinux
GetPlatform.isFuchsia

//检查设备类型
GetPlatform.isMobile
GetPlatform.isDesktop
//所有平台都是独立支持web的!
//你可以知道你是否在浏览器内运行。
//在Windows、iOS、OSX、Android等系统上。
GetPlatform.isWeb


// 相当于.MediaQuery.of(context).size.height,
//但不可改变。
Get.height
Get.width

// 提供当前上下文。
Get.context

// 在你的代码中的任何地方，在前台提供 snackbar/dialog/bottomsheet 的上下文。
Get.contextOverlay

// 注意：以下方法是对上下文的扩展。
// 因为在你的UI的任何地方都可以访问上下文，你可以在UI代码的任何地方使用它。

// 如果你需要一个可改变的高度/宽度（如桌面或浏览器窗口可以缩放），你将需要使用上下文。
context.width
context.height

// 让您可以定义一半的页面、三分之一的页面等。
// 对响应式应用很有用。
// 参数： dividedBy (double) 可选 - 默认值：1
// 参数： reducedBy (double) 可选 - 默认值：0。
context.heightTransformer()
context.widthTransformer()

/// 类似于 MediaQuery.of(context).size。
context.mediaQuerySize()

/// 类似于 MediaQuery.of(context).padding。
context.mediaQueryPadding()

/// 类似于 MediaQuery.of(context).viewPadding。
context.mediaQueryViewPadding()

/// 类似于 MediaQuery.of(context).viewInsets。
context.mediaQueryViewInsets()

/// 类似于 MediaQuery.of(context).orientation;
context.orientation()

///检查设备是否处于横向模式
context.isLandscape()

///检查设备是否处于纵向模式。
context.isPortrait()

///类似于MediaQuery.of(context).devicePixelRatio。
context.devicePixelRatio()

///类似于MediaQuery.of(context).textScaleFactor。
context.textScaleFactor()

///查询设备最短边。
context.mediaQueryShortestSide()

///如果宽度大于800，则为真。
context.showNavbar()

///如果最短边小于600p，则为真。
context.isPhone()

///如果最短边大于600p，则为真。
context.isSmallTablet()

///如果最短边大于720p，则为真。
context.isLargeTablet()

///如果当前设备是平板电脑，则为真
context.isTablet()

///根据页面大小返回一个值<T>。
///可以给值为：
///watch：如果最短边小于300
///mobile：如果最短边小于600
///tablet：如果最短边（shortestSide）小于1200
///desktop：如果宽度大于1200
context.responsiveValue<T>()
```

## FQ

### 重定向日志

你可以选择重定向所有来自GetX的日志信息。 如果你想使用你自己喜欢的日志包，并想查看那里的日志。

```dart
GetMaterialApp(
  enableLog: true,
  logWriterCallback: localLogWriter,
);

void localLogWriter(String text, {bool isError = false}) {
  // 在这里把信息传递给你最喜欢的日志包。
  // 请注意，即使enableLog: false，日志信息也会在这个回调中被推送。
  // 如果你想的话，可以通过GetConfig.isLogEnable来检查这个标志。
}
```
