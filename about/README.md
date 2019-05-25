# NodeJS

## JavaScript

- What is JavaScript
  - 运行于浏览器的交互式的脚本语言

- 浏览器作用
  - URL地址包装城一个请求报文
  - 渲染HTML、CSS、SVG
  - 解释执行JavaScript

- JavaScript 的运行环境？
  - 是不是运行在浏览器呢？
  - 不够严谨
  - 运行在浏览器内核中的 JS 引擎（engine）

- 浏览器中的 JavaScript 可以做什么
  - 操作DOM（对DOM的增删改查、注册事件）
  - AJAX/跨域JSONP
  - BOM操作（页面跳转、历史记录、console对象）
  - ECMAScript

- 浏览器中的 JavaScript 不可以做什么？
  - 文件操作
  - 操作系统
  - 运行环境特殊

- 在开发人员能力相同的情况下编程语言的能力取决于什么？
  - 语言本身
    - 语言本身提供变量、数据类型、流程控制、函数、定义类型等操作
  - 取决于运行该语言的平台（环境）
  - JS实际是ECMAScript，大部分能力都是由浏览器执行引擎决定
  - DOM和BOM是浏览器开发的接口
    - 比如：Cordova中提供JS调用摄像头，操作本地文件的API
  - Java 既是语言也是平台
    - java运行在Java 虚拟机（跨操作系统）
  - C# 语言
    - 平台：.NET Framework（Windows）
    - C#可以在MONO平台运行
    - 有人需要在将C#运行在Linux平台上，所以出现了MONO
  - PHP 既是语言也是平台

## What is Node

As an **asynchronous event driven** JavaScript runtime, Node is designed to build **scalable network applications**. In the following "hello world" example, many connections can be handled concurrently. Upon each connection the callback is fired, but if there is no work to be done, Node will sleep.Node 是基于异步事件驱动的 JavaScript 运行，Node 设计了构建可伸缩的网络应用。在下面的 "hello world" 实例中，很多连接可能会产生并发处理。在每个连接上回调会被触发，但如果没有工作要做，Node 会进入睡眠状态。

```js
const http = require('http'); // 加载 http 包

const hostname = '127.0.0.1'; // 主机名
const port = 3000; // 监听端口

// 创建 http 服务
const server = http.createServer((req, res) => {
  res.statusCode = 200; // 响应码 200
  res.setHeader('Content-Type', 'text/plain'); // 响应内容类型，普通文本类型
  res.end('Hello World\n'); // 响应结束之前的实体信息
});

// http 服务监听
server.listen(port, hostname, () => {
  // 服务运行输出监听服务信息
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

- Author: Ryan Dahl
- [NodeJS官网](https://nodejs.org)
- 提供大量的API工具库：文件操作、网络操作、操作系统
- Node = V8(ECMAScript) + libuv(系统调用)
- Node哲学：最小硬件成本、追求更高的并发，更高的处理性能

## NodeJS特性

- 单线程
  - Java,PHP后者.net等服务器端语言，为每一个客户端连接创建一个新的线程。而每个线程需要耗费大约2MB内存。一个8BG内存服务器可以同时连接的最大用户数位4000个左右。
  - 不为每个用户连接创建一个新的线程，而仅仅是使用一个线程。当有用户连接了，就会触发一个内部时间，通过非阻塞I/O、事件驱动机制，让Node程序宏观上是并行的。8GB内存的服务器，可以同时处理超过40K用户的连接。即每个资源消耗20KB。
  - 系统不会在就创建线程、销毁的时间开销
  - 缺点：一个用户造成线程崩溃，整个服务都崩溃，其他人也崩溃
- 非阻塞I/O
  - 一个线程永远在执行计算操作，整个线程的CPU核心利用率永远是100%
- 事件驱动
  - 事件队列、回调函数队列的构建

## 1.1.4 NodeJS优势

1. 性能（相比PHP语言86倍）
  - 时间：1s 1m30s
  - 平台：php 200(400万), node 3（6万）

2. 前台JS配合方便

3. 善于I/O，不善于计算。Node擅长任务调度，如果业务多度的CPU运算，实际上相当于整个计算阻塞了这个单线程。

4. 处理大量并发的I/O，而在向客户端发出响应之前，应用程序内部并不需要进行非常复杂的处理的时候，Node非常适合。

5. 与Web sockets配合，开发长连接的实时交互应用程序

- 用户表单收集（百度贴吧）
- 考试系统
- 聊天室
- 图文直播
- 提供JSON的API

> tracert www.qq.com
`# trace www.qq.com`

## NodeJS应用

- Node 应用
  - [pomelo](https://github.com/NetEase/pomelo)
  - [NodeJS资源](https://github.com/sindresorhus/awesome-nodejs)
  - [阮一峰](htttps://javascript.ruanyifeng.com/#nodejs)

This is in contrast to today's more common concurrency model where OS threads are employed. Thread-based networking is relatively inefficient and very difficult to use. Furthermore, users of Node are free from worries of dead-locking the process, since there are no locks. Almost no function in Node directly performs I/O, so the process never blocks. Because nothing blocks, scalable systems are very reasonable to develop in Node. 这与当今更常见的并发在操作系统线程使用上进行对比。基于线程网络是相对低效和使用起来非常困难。而且，node的用户不同担心死锁的线程，因为 node 没有阻塞。几乎在node中没有函数直接运行 I/O，所以进程永远不会阻塞。因为没有阻塞，可伸缩系统非常非常容易在node中发挥。

If some of this language is unfamiliar, there is a full article on [Blocking vs Non-Blocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/). 如果有些语言不熟悉，这里有一个关于阻塞与非阻塞的全文。

Node is similar in design to, and influenced by, systems like Ruby's Event Machine or Python's Twisted. Node takes the event model a bit further. It presents an event loop as a runtime construct instead of as a library. In other systems there is always a blocking call to start the event-loop. Typically behavior is defined through callbacks at the beginning of a script and at the end starts a server through a blocking call like EventMachine::run(). In Node there is no such start-the-event-loop call. Node simply enters the event loop after executing the input script. Node exits the event loop when there are no more callbacks to perform. This behavior is like browser JavaScript — the event loop is hidden from the user. Node 设计上类似于，像Ruby的 Event Machine 或 Python's Twisted 的系统受影响。Node 进一步尝试了事件模型。它将一个事件循环作为一个运行时结构，而不是作为一个库。在其他的系统中总是有一个阻塞调用开始的事件循环。典型的行为是通过脚本开头的回调来定义的，并且在结束时通过像EventMachine：：run（）的阻塞调用启动服务器。在 Node 中没有想这样开始事件循环调用。Node 在执行输入之后简单的进入事件循环。当没有更多的回调函数时，node会退出事件循环。这个行为像浏览器的 javaScript - 事件循环从用户中隐藏。

HTTP is a first class citizen in Node, designed with streaming and low latency in mind. This makes Node well suited for the foundation of a web library or framework. 在Node 中 HTTP 是一等公民，设计时考虑到流媒体和低延迟。这是的node非常适用于一个 web 库或框架。

Just because Node is designed without threads, doesn't mean you cannot take advantage of multiple cores in your environment. Child processes can be spawned by using our child_process.fork() API, and are designed to be easy to communicate with. Built upon that same interface is the cluster module, which allows you to share sockets between processes to enable load balancing over your cores. 仅仅是因为 Node 没有线程，这并不意味着在你的环境中不能使用多核。子进程可以通过 child_process.for() 接口来使用，并且被设计易于与之通信。在相同的接口上构建的是集群模块，它允许您在进程之间共享套接字，以便在核心上实现负载平衡。

## node命令
- REPL环境(Read, Eval, Print, Loop): `$ node`
- 执行脚本字符串：`$ node -e 'console.log("hello")'`
- 运行脚本：`$ node index[.js]`
- 查看帮助：`$ node --help`

1.退出node交互式模式
`> .exit` 
`> process.exit()` 退出进程 

2.使用严格交互式模式
`# node --use-strict`

3.显示上一条执行结果，下划线
`_`

4.执行代码
`# ndoe -e 'cosole.log("hello world")`

## 异步操作

- Node单线程运行、一次只能运行一个任务
- Node大量采用异步操作(Asynchronous operation),即任务不是马上执行，而是插在任务的尾部，等到前面的任务运行完后在执行
- 错误优先
- 回调黑洞的问题（不好的地方）

## 进程和线程

- 正在运行的应用程序称为进程
- node进程启动后自动创建一个线程，线程用于**执行代码**
- main Thread, Thread 1
- 每次异步都会创建一个线程放入**调度任务**当中
- 一个进程内部，可以有很多的线程
- 一个线程内部，同时只可以干一件事
- 传统的的开发方式大部分都是I/O阻塞的
  - 阻塞代码创建线程并在其线程中执行
- 所以需要多线程来更好的利用硬件资源
- 错觉:线程越多越好

### 什么原因让多线程没落

- 多线程都是假的，因为只有一个CPU（单核）
- 线程之间共享某些数据，同步某个状态都很麻烦
- 更致命的是：
  - 创建线程耗费
  - 线程数量有限(每个线程占用2M,2G/2M=1024线程)
  - CPU在不同线程之间上下文切换，这个转换非常消耗时间

## 全局对象

- global：类似于客户端JavaScript运行环境中的Window对象

- process
  - 用于获取当前Node进程信息，一般用户获取环境之类的信息
  - `process.stdout.write()`
  - `process.argv` 命令参数数组 
  - 清空控制台
    - `process.stdout.write("\033[2J")`
    - `process.stdout.write("\033[of")`
    - `process.stdout.getWindowSize()[1]`	// height
    - `process.on('SIGINT',function(){process.exit()})`

- console
  - 内置console模块，提供操作控制台的输入输出功能，常见使用方式与客户端类似
  - console.time('start')
  - console.timeEnd('start');

## 绘制字符动画

[图片转化为字符](http://www.degraeve.com/img2txt.php)

## 调试

`$ node debug file.js`
> help
watch('i')
n：下一步

## 第三方提供的调试工具

```sh
$ npm install node-inspector -g
$ npm install devtool -g
$ node-debug file.js
```