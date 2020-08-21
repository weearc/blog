---
title: js从入门到坚持（转载）
tags:
  - js
  - 教程
  - 转载文章
categories: 转载精品
abbrlink: 38757
date: 2017-12-26 19:48:56
---

***本手册的使用说明：***
1. 按着顺序看就应该能懂，并且少走弯路
2. 👉👉👉 后面的链接为主要内容
3. 更多 后面的链接为补充内容，不一定需要看
4. ⚠️ 的意思是「需要注意的是」

<!--more-->

5. 🙈 的意思是「随便看看不用记，需要的时候再翻」
6. ‼️ 的意思是「有更正」
7. 链接主要来自 MDN，比 W3school 之类的强多了，学习 Web 技术都尽量看 MDN 的资源 (最好也看看英文的，顶部可以切换语言，我发现有的中文翻译的专有名词有点奇怪，还不给英文原词)

# 基础语法与 DOM 操作

*本阶段：我想留住头发。能进行绝大多数页面交互，包括响应用户操作、编辑界面元素、AJAX 数据交换。*

## JS 是什么? 如何使用?

一门 **动态类型、面向对象** 的 **解释执行** 语言。是唯一 **可以在浏览器上直接执行** 的程序设计语言。

JS 几乎可以做任何事，是现在使用最广泛的程序设计语言之一，同时也是 GitHub 上最活跃的语言 ([GitHut](https://madnight.github.io/githut/)）。  
本阶段主要学习的是 JS 在前端开发中的使用。  

JS 可以使用 `<script>` 标签内嵌在 HTML 内，或链接引入 JS 脚本文件。 
```html
<script>
    alert("hello, world");
</scrpit>

<script src="script.js"></script>
```

学习 JS 一个方便的方式是使用浏览器的 **开发者工具->Console (控制台)**，Console 内的代码将被直接求值。  
开发者工具内还能显示错误信息 ([MDN 什么地方出了错？](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_went_wrong)) 与设置断点 ([Chrome断点调试](https://www.cnblogs.com/lurensang/p/6515080.html)) 来帮助调试。  

2015 年 JS 迎来了一次重大语法更新 ES6。ES6 中新增的内容大多与入门无关，新增的语法糖将会随着各部分内容一并介绍。

更多：[MDN 什么是JavaScript？](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript)

## 基础语法

JavaScript 从 Java 中借用了大部分语法，但也受到 Awk，Perl 和 Python的影响。 JavaScript是区分大小写的，并使用 Unicode字符集。  
在JavaScript中，指令被称为  statements，并用分号 `;` 分隔。ECMAScript 规定了如何自动插入分号来结束语句。但是，建议随时添加分号来结束语句，以避免可能的副作用。

**注释** 在代码内的解释性文字，不会被执行。JS 的注释语法与 C++、Java 等语言相同。
```js
// 单行注释

/* 这是一个更长的,
   多行注释
*/

/* 然而, 你不能, /* 嵌套注释 */ 语法错误 */
```

### 变量

变量就是用于 **存放数据的容器**。  

👉👉👉 **[MDN 变量](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables)**

ES6 中新增了关键字 `let`, `const` 来申明变量与常量，与 `var` 差异不大，可以在第三阶段「JS 的并发编程及其他语法」中学习。

**数据类型**

变量存放着数据，而数据有不同的类型。数据类型的概念从程序语言使用的角度来讲，就是能对一个变量所进行的操作的类别。 **变量存储不同类型的数据时，能进行的操作也不一样**。

JS 有 6 种 **原始数据类型** `String, Number, Boolean, Symbol, null, undefined` (`Symbol` 为 ES6 新增类型) 与 `Object` **对象类型**。  
对象类型是一类类型的统称，它们各自能进行不同的操作，JS 中常见的对象类型有 `Array, Error, Date` 等。关于对象类型可以在第二阶段「JS 的面向对象」中学习。(‼️ `Math` 是一个对象不是类型)

⚠️ JS 中未赋值的变量 (包括函数参数) 值都为 `undefined`。

使用 typeof 运算符可以获得变量的数据类型，有 `“string”, “number”, “boolean”, “object”, “function”, “symbol”, “undefined”`。typeof 的运算结果为 String 类型。  
⚠️ `typeof null` 的结果为 `"object"`。  
⚠️ 在 JS 中函数 (Function) 也是一种类型 (变量值) 但不是「数据」类型。

更多：[MDN 语法和数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#数据结构和类型)

### 字符串

👉👉👉 **[MDN JavaScript中的字符串](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Strings)**

ES6 中新增了反引号 `` ` `` 包围起来的字符串，称为 **模板字符串**  
模板字符串中插入变量不再需要用 `+` 将字符串与变量连接起来，而是直接在模板字符串内使用 `${expr}` 嵌入：  
```js
`Hello ${name}, nice to meet you!`
```

更多：  
[MDN 有用的字符串方法](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods)  
[MDN String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

### 数组

👉👉👉 **[MDN 数组](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays)**  

ES6 **数组的解构赋值**  
```js
var [a, b, c] = [1, 2, 3];
// a = 1, b = 2, c = 3

var [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

var [ , , third] = ["foo", "bar", "baz"];
third // "baz"

var [x, , y] = [1, 2, 3];
x // 1
y // 3
```
**左值** (被赋值的变量) 按照对应位置提取右值数组中的值。右值为变量而不是字面量时也可解构：  
```js
var array = [1, 2, 3];
var [a, b, c] = array;
```

ES6 **剩余 (rest) 语句** 与 **扩展语句** 🙈  

语法均为 `...variable`，区别在于 `variable` 是左值还是右值。  
事实上，剩余语句在函数参数中使用更为广泛。见 基础语法->函数  
数组的解构赋值中可以使用剩余语句来将没有对应左值的余下右值放入一个数组中：
```js
var [a, b, ...arr] = [1, 2, 3, 4, 5];
// a = 1, b = 2, arr = [3, 4, 5]
```

扩展语句可以将数组展开，在数组中的应用是合并数组与元素等：
```js
var merged = [...array, "abc", ...arr];
// merged = [1, 2, 3, "abc", 3, 4, 5]
```

更多：[MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 运算符

**算数运算与比较运算**

👉👉👉 **[MDN 数字和操作符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math)**

ES6 中新增了幂运算，如 a 的 b 次方 `a ** b`  

⚠️ JS 对于非 Boolean 值的比较运算，以及非 Boolean 值到 Boolean 值的转换非常混乱与诡异，是 JS 语言中最大的败笔。遇到上述两种情况时，务必先查阅以下链接，及代码片段：  

🙈 真值表 [Oh My Dear JavaScript](https://thomas-yang.me/projects/oh-my-dear-js/)  
```js
🙈 // Falsy
if (false)
if (null)
if (undefined)
if (0)
if (NaN)    // Not A Number
if ('')     // emplty strings
if ("")     // emplty strings

🙈 // Truthy
if (true)
if ({})     // Objects
if ([])
if (42)
if ("foo")  // non-empty strings
if (new Date())
if (-42)
if (3.14)
if (-3.14)
if (Infinity)
if (-Infinity)
```

**逻辑运算** 

名称        | 运算符            | 描述
---         | ---               | ---
逻辑与(AND) | `expr1 && expr2`  | 如果 expr1 能被转换为false (falsy 值)，那么返回expr1；否则，返回expr2。
逻辑或(OR)  | `expr1 || expr2`  | 如果 expr1 能被转换为true (truthy 值)，那么返回expr1；否则，返回expr2。
逻辑非(NOT) | `!expr`           | 如果操作数能够转换为true (truthy 值) 则返回false；否则返回true。

⚠️ Truthy 值与 Falsy 值可查阅以上代码。  
⚠️ 对于 Boolean 值逻辑运算符的作用与数学中相同，但对于非 Boolean 值，JS 的逻辑运算符能起到条件判断的作用，如下🙈：
```js
var action = input || "default";    // 若 input 为 truthy 则将 input 的值赋给 action，
                                    // 否则 action 赋值为 "default"
// 作用同于
var action = input ? input : "default"; // 条件运算符见下
// 以及
if (input) {
    var action = input;
} else {
    var action = "default";
}
                                    
var a = b && c; // 若 b 为 falsy 则 a = b，否则 a = c
```

**条件运算符**  

`condition ? expr1 : expr2`  
若 `condition` 为 truthy，则对 `expr1` 求值并返回，否则对 `expr2` 求值并返回。

更多：[MDN 表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators)

### 流程控制

流程控制是程序设计的最根本的内容，学习完本章内容后，理论上已经可以写出任何功能的程序，只是效率和可读性上有所欠缺。

**语句与语句块**  

在 if 条件语句，与 for 及 while 循环语句中，判断或循环条件后的多条语句需要用大括号 `{}` 包围起来，称为语句块：
```js
if (true) {
    alert("这些");
    alert("语句");
    alert("都会");
    alert("执行");
}
```

而不使用 `{}` 时，只有判断或循环条件后的第一条语句受到该流程控制语句的作用：
```js
var count = 5;
while (count--)
    alert("这条语句会重复执行");
alert("这两条只");
alert("执行一次");
```

**条件语句**  

JS 有两种条件语句：if...else 和 switch

👉👉👉 **[MDN 条件语句](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/Building_blocks/conditionals)**

⚠️ 如果某条 case 语句后没有 break，通过该 case 条件的流程会穿过其它 case 执行直到遇到 break 语句。

**循环语句**  

JS 有 5 种循环语句：
```js
// 这三种在本节学习
for (initialExpression; condition; incrementExpression) statement
while (condition) statement
do statement while (condition);

// for...of 可在更多链接里学习，这是 ES6 新增的语法
for (variable of array) statement

// for...in 需要在学习 JS 的面向对象之后理解
for (variable in object) statement
```
👉👉👉 **[MDN 循环吧代码](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/Building_blocks/Looping_code)**  

⚠️ for 语句后如果有使用到循环变量 (在循环条件使用的变量) ，循环变量的值是第一个不满足循环条件的值，而不是最后一个满足循环条件的值。

更多：[MDN 循环和迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration)

### 函数

🙈 👉👉👉 **[MDN 函数-可复用代码块](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/Building_blocks/Functions)**

**函数的定义与调用**  

我们先来看看数学中的函数 `$F(x,y)=x^3 + y + 3$`。它用 JS 函数写出来是这样：
```js
function F(x, y) {
    return x ** 3 + y + 3;
}
```
其中
* `function` 是申明函数的关键字
* `F` 是 **函数名**，与变量命名规则相同，可省略
* `(x, y)` 是 **参数列表**，由逗号分隔，没有参数时括号也不能省略
* 大括号 `{}` 包围的内容称为 **函数体**，是调用函数时执行的代码，可有 0 到多条语句
* `return` 是函数的返回语句，意味着函数调用后输出的值。无 return 语句意味着不返回值 (准确的说是返回 `undefined`)

使用它就如同数学中的 `$Let \ \ a = F(2, 3)$`：
```js
var value = F(2, 3);
// value 为 14
```

但程序语言的函数跟数学中的函数依然有着很大差别，例如程序语言的函数的参数不一定是数字 (如 `alert(message)` 参数是 String)，甚至可能没有参数；程序语言的函数也不一定会返回数字 (如 `String#split(separator)` 返回 Array)，甚至不会返回值。(`#` 不是 JS 的操作符，详见 DOM 操作->初窥对象)

那么没有参数或返回值的函数有什么用呢？如同前面链接里的 `draw()` 函数，它们提供的是 **重复使用一个流程的便捷方法**。

**函数返回值**  

👉👉👉 **[MDN 函数返回值](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/Building_blocks/Return_values)**

**将函数赋值给变量**  

这是 JS 中最灵活，对于初学者也最为之迷惑的特点之一，**函数本身是一个变量值** (Lambda 函数)， 函数本身可以赋值给任何变量 ，乃至将函数作为函数参数、函数返回另一个函数：
```js
var f = F;  // 上面定义的 F
f(2, 3);    // = 14

function produceFunction(welcome) {
    return function(name) {
        return `${welcome}, ${name} !`;
    }
}
produceFunction("Long time no see")("Sandy");   // "Long time no see, Sandy !""
```
前面链接中的将匿名函数赋值给一个变量，实际上就是产生了一个 **函数类型** 的变量值，然后这个变量值被赋值给了变量。  
任何函数类型的变量值，都可以通过函数调用操作符 `()` 调用。

**即时执行函数 (IIFE) 🙈**  

只要将函数的定义用括号 `()` 包围，就可以立即用函数调用操作符 `()` 调用：
```js
(function(name) {
    var nothing = 0;
    return "Hello " + name;
})("Vincent"); // "Hello Vincent"
```
使用 IIFE 的一个好处就是，IIFE 内的名称不会污染到外部乃至全局 (global)。

**箭头函数 🙈**  

ES6 新增语法 [MDN 箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

**不定参数函数 🙈**  

定义函数时，参数列表中的各个参数叫做 **形参** (Parameters)；调用函数时，传递给函数的各个参数叫做 **实参** (Arguments)。  
形参与实参的个数不一定相同。对于有确定最大参数个数的函数，参数列表里形参的数量可以与最大参数个数相等，实参数量不足时，靠后的参数值为 `undefined`；而对于有不确定个数参数的函数，可以使用 **剩余语句** (见 基础语法->数组) 来接受不定个数的参数：
```js
function getRestArguments(first, ...rest) {
    return rest;
}
getRestArguments(1, 2, 3, 4, 5);    // [2, 3, 4, 5]
```

同时，可以使用 **扩展语句** 来将数组展开为函数参数：
```js
var array = [6, 7, 8, 9];
getRestArguments(...array);     // [7, 8, 9]
```

更多：[MDN 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)

## DOM 操作

文档对象模型 (Document Object Model) 是以面向对象方式描述的文档模型，利用 DOM 可以对整个网页界面进行任何操作。

### 初窥对象

⚠️ 不是去盯着男票/女票看！禁止虐狗(我)！  

泛指的对象其实是没有实际意义的抽象名词，可以用任何一个词替代，例如东西、玩意 ~~、鬼东西、🐔儿玩意~~。  
前面使用的所有变量值都是一个对象，因为 ~~它们都是一个东西~~ JS 将一切都视为对象。(所有对象都有名为 `toString()` 的方法，除了整数需要加括号才能访问外，其它任何量都可以直接访问，`3.14.toString()`。)  

至于为啥原始类型变成对象了，多半是借用的 Java 中原始数据类型与包装类的概念 ([Java中基本数据类型和包装器类型的关系](https://www.cnblogs.com/huajiezh/p/5225637.html))。

每个对象(东西)都可能有属于它的东西，称为 **属性**，例如数组的长度 `Array#length`，文档的 body 结点 `document.body`。(`#` 不是 JS 的操作符，它的意思是某种类型都有某个属性，实际使用时是对一个对象使用 `.` 操作符，如 `[1, 2, 3].length`。)

每个对象(东西)也都可能拥有某些功能，称为 **方法**，例如在数组末尾添加项目 `Array#push(item)`, 在文档中用选择器查找结点 `document.querySelector(selector)`。

访问对象的属性与方法需要使用 **成员访问操作符 `.`**。

### 原生 DOM 操作

🙈 👉👉👉 **[MDN 事件介绍](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)**

🙈 👉👉👉 **[MDN 操作文档](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)**

### 使用 JQuery

最流行的 DOM 操作库有 JQuery, Zepto.js 等，它们封装了基本的 DOM 操作，提供更简练的语法，进行更高效的开发。

👉👉👉 **[W3school JQuery](http://www.w3school.com.cn/jquery/jquery_install.asp)**

只需要学习 入门、HTML、遍历、AJAX 即可。动画由于现在移动端的性能需求，更多通过 CSS 来实现。

大体上 $(selectors) 的用法与 document.querySelector(selectors) 相同。

# JS 的面向对象

*本阶段：苍茫的前端是我的爱。更加庞大的 Web App 开发，以及使用主流前端框架 (React, Vue 等)。*  

# JS 的并发编程及其他语法

*本阶段：我想深♂入了解 TA 的全♀部，以及使用 JS 后端开发。*