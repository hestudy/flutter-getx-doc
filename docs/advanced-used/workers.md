---

title: Workers
order: 2

---

Workers将协助你在事件发生时触发特定的回调。

```dart
///每次`count1`变化时调用。
ever(count1, (_) => print("$_ has been changed"));

///只有在变量$_第一次被改变时才会被调用。
once(count1, (_) => print("$_ was changed once"));

///防DDos - 每当用户停止输入1秒时调用，例如。
debounce(count1, (_) => print("debouce$_"), time: Duration(seconds: 1));

///忽略1秒内的所有变化。
interval(count1, (_) => print("interval $_"), time: Duration(seconds: 1));
```

所有Workers(除 "debounce "外)都有一个名为 "condition"的参数，它可以是一个 "bool "或一个返回 "bool "的回调。 这个condition定义了callback函数何时执行。

所有worker都会返回一个Worker实例，你可以用它来取消（通过dispose()）worker。

- ever 每当_Rx_变量发出一个新的值时，就会被调用。
- everAll 和 "ever "很像，但它需要一个_Rx_值的 "List"，每次它的变量被改变时都会被调用。就是这样。
- once 'once'只在变量第一次被改变时被调用。
- debounce debounce'在搜索函数中非常有用，你只希望API在用户完成输入时被调用。如果用户输入 "Jonny"，你将在API中进行5次搜索，分别是字母J、o、n、n和y。使用Get不会发生这种情况，因为你将有一个 "debounce "Worker，它只会在输入结束时触发。
- interval 'interval'与debouce不同，debouce如果用户在1秒内对一个变量进行了1000次修改，他将在规定的计时器（默认为800毫秒）后只发送最后一次修改。Interval则会忽略规定时间内的所有用户操作。如果你发送事件1分钟，每秒1000个，那么当用户停止DDOS事件时，debounce将只发送最后一个事件。建议这样做是为了避免滥用，在用户可以快速点击某样东西并获得一些好处的功能中（想象一下，用户点击某样东西可以赚取硬币，如果他在同一分钟内点击300次，他就会有300个硬币，使用间隔，你可以设置时间范围为3秒，无论是点击300次或100万次，1分钟内他最多获得20个硬币）。debounce适用于防DDOS，适用于搜索等功能，每次改变onChange都会调用你的api进行查询。Debounce会等待用户停止输入名称，进行请求。如果在上面提到的投币场景中使用它，用户只会赢得1个硬币，因为只有当用户 "暂停 "到既定时间时，它才会被执行。

<Alert type='warning'>
Worker应该总是在启动Controller或Class时使用，所以应该总是在onInit(推荐)、Class构造函数或StatefulWidget的initState(大多数情况下不推荐这种做法，但应该不会有任何副作用)。
</Alert>
