---

title: GetUtils
order: 3

---

<Alert type='info'>这是GetX内置的工具类，方便我们进行一些操作</Alert>

## camelCase(String value) → String?

转为驼峰命名 Example: your name => yourName

## capitalize(String value) → String?

将字符串中的每个单词大写 Example: your name => Your Name, your name => Your name

## capitalizeFirst(String s) → String?

字符串中的第一个字母大写，其他字母小写 Example: your name => Your name

## createPath(String path, [Iterable? segments]) → String

创建路径

## hasCapitalletter(String s) → bool

检查字符串是否至少包含一个大写字母

## hasMatch(String? value, String pattern) → bool

检查字符串是否能匹配正则

## isAlphabetOnly(String s) → bool

检查字符串是否仅由字母组成。（无空格）

## isAPK(String filePath) → bool

检查字符串是否为apk文件。

## isAudio(String filePath) → bool

检查字符串是否为音频文件。

## isBinary(String s) → bool

检查字符串是否为二进制。

## isBlank(dynamic value) → bool?

检查数据是否为null或空（空或仅包含空格）。

## isBool(String value) → bool

检查字符串是否为布尔值。

## isCaseInsensitiveContains(String a, String b) → bool

检查a是否包含b（将大写字母和小写字母视为相同）。

## isCaseInsensitiveContainsAny(String a, String b) → bool

检查a是否包含b或b是否包含a（将大小写字母视为相同）。

## isChm(String filePath) → bool

检查字符串是否为chm文件。

## isCnpj(String cnpj) → bool

检查字符串是否为CNPJ。

## isCpf(String cpf) → bool

检查cpf是否有效。

## isCurrency(String s) → bool

检查字符串是否为货币。

## isDateTime(String s) → bool

检查字符串是否为日期时间（UTC或Iso8601）。

## isEmail(String s) → bool

检查字符串是否为电子邮件。

## isEqual(num a, num b) → bool

检查num a是否等于num b。

## isExcel(String filePath) → bool

检查字符串是否为excel文件。

## isGreaterThan(num a, num b) → bool

检查num a是否大于num b。

## isHexadecimal(String s) → bool

检查字符串是否为十六进制. Example: HexColor => #12F

## isHTML(String filePath) → bool

检查字符串是否为html文件。

## isImage(String filePath) → bool

检查字符串是否为图像文件。

## isIPv4(String s) → bool

检查字符串是否为IPv4。

## isIPv6(String s) → bool

检查字符串是否为IPv6。

## isLengthBetween(dynamic value, int minLength, int maxLength) → bool

检查数据长度是否介于minLength到maxLength之间。

## isLengthEqualTo(dynamic value, int otherLength) → bool

检查数据长度是否等于maxLength。

## isLengthGreaterOrEqual(dynamic value, int maxLength) → bool

检查数据长度是否大于或等于maxLength。

## isLengthGreaterThan(dynamic value, int maxLength) → bool

检查数据长度是否大于maxLength。

## isLengthLessOrEqual(dynamic value, int maxLength) → bool

检查数据长度是否小于或等于maxLength。

## isLengthLessThan(dynamic value, int maxLength) → bool

检查数据长度是否小于maxLength。

## isLengthLowerOrEqual(dynamic value, int maxLength) → bool

检查数据长度是否小于或等于maxLength。

## isLengthLowerThan(dynamic value, int maxLength) → bool

检查数据长度是否小于maxLength。

## isLowerThan(num a, num b) → bool

检查num a是否低于num b。

## isMD5(String s) → bool

检查字符串是否为MD5哈希。

## isNull(dynamic value) → bool

检查数据是否为空。

## isNullOrBlank(dynamic value) → bool?

检查数据是否为null或空（空或仅包含空格）。

## isNum(String value) → bool

检查字符串是int还是double。

## isNumericOnly(String s) → bool

检查字符串是否仅由数字组成. Numeric only doesn't accepting "." which double data type have

## isOneAKind(dynamic value) → bool

检查所有数据是否具有相同的值. Example: 111111 -> true, wwwww -> true, 1,1,1,1 -> true

## isPalindrom(String string) → bool

检查字符串是否为回文。

## isPassport(String s) → bool

检查字符串是否为Passport No。

## isPDF(String filePath) → bool

检查字符串是否为pdf文件。

## isPhoneNumber(String s) → bool

检查字符串是否为电话号码。

## isPPT(String filePath) → bool

检查字符串是否是powerpoint文件。

## isSHA1(String s) → bool

检查字符串是否为SHA1哈希。

## isSHA256(String s) → bool

检查字符串是否为SHA256哈希。

## isSSN(String s) → bool

检查字符串是否为SSN（社会保险号）。

## isTxt(String filePath) → bool

检查字符串是否为txt文件。

## isURL(String s) → bool

检查字符串是否为URL。

## isUsername(String s) → bool

检查字符串是否为有效用户名。

## isVector(String filePath) → bool

检查字符串是否为矢量文件。

## isVideo(String filePath) → bool

检查字符串是否为视频文件。

## isWord(String filePath) → bool

检查字符串是否为word文件。

## nil(dynamic s) → dynamic

在dart2js中（在flatterv1.17中），默认情况下var是未定义的。只有在版本<-1.17时才使用此选项。所以我们在json转换中保证null类型以避免“value”：value==null？null：值；一些变量为零如果var为null或未定义，将强制使用null类型。从ObjC取nil只是为了得到一个较短的sintax。

## numericOnly(String s, {bool firstWordOnly = false}) → String

提取字符串的数值 Example: OTP 12312 27/04/2020 => 1231227042020ß If firstword only is true, then the example return is "12312" (first found numeric word)

## printFunction(String prefix, dynamic value, String info, {bool isError = false}) → void

未知用法

## removeAllWhitespace(String value) → String

删除字符串中的所有空白 Example: your name => yourname
