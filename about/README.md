# About Node.js

As an **asynchronous event driven** JavaScript runtime, Node is designed to build **scalable network applications**. In the following "hello world" example, many connections can be handled concurrently. Upon each connection the callback is fired, but if there is no work to be done, Node will sleep.Node 是基于异步事件驱动的 JavaScript 运行，Node 设计了构建可伸缩的网络应用。在下面的 "hello world" 实例中，很多连接可能会产生并发处理。在每个连接上回调会被触发，但如果没有工作要做，Node 会进入睡眠状态。

``` NODE
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

This is in contrast to today's more common concurrency model where OS threads are employed. Thread-based networking is relatively inefficient and very difficult to use. Furthermore, users of Node are free from worries of dead-locking the process, since there are no locks. Almost no function in Node directly performs I/O, so the process never blocks. Because nothing blocks, scalable systems are very reasonable to develop in Node. 这与当今更常见的并发在操作系统线程使用上进行对比。基于线程网络是相对低效和使用起来非常困难。而且，node的用户不同担心死锁的线程，因为 node 没有阻塞。几乎在node中没有函数直接运行 I/O，所以进程永远不会阻塞。因为没有阻塞，可伸缩系统非常非常容易在node中发挥。

If some of this language is unfamiliar, there is a full article on [Blocking vs Non-Blocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/). 如果有些语言不熟悉，这里有一个关于阻塞与非阻塞的全文。

Node is similar in design to, and influenced by, systems like Ruby's Event Machine or Python's Twisted. Node takes the event model a bit further. It presents an event loop as a runtime construct instead of as a library. In other systems there is always a blocking call to start the event-loop. Typically behavior is defined through callbacks at the beginning of a script and at the end starts a server through a blocking call like EventMachine::run(). In Node there is no such start-the-event-loop call. Node simply enters the event loop after executing the input script. Node exits the event loop when there are no more callbacks to perform. This behavior is like browser JavaScript — the event loop is hidden from the user. Node 设计上类似于，像Ruby的 Event Machine 或 Python's Twisted 的系统受影响。Node 进一步尝试了事件模型。它将一个事件循环作为一个运行时结构，而不是作为一个库。在其他的系统中总是有一个阻塞调用开始的事件循环。典型的行为是通过脚本开头的回调来定义的，并且在结束时通过像EventMachine：：run（）的阻塞调用启动服务器。在 Node 中没有想这样开始事件循环调用。Node 在执行输入之后简单的进入事件循环。当没有更多的回调函数时，node会退出事件循环。这个行为像浏览器的 javaScript - 事件循环从用户中隐藏。

HTTP is a first class citizen in Node, designed with streaming and low latency in mind. This makes Node well suited for the foundation of a web library or framework. 在Node 中 HTTP 是一等公民，设计时考虑到流媒体和低延迟。这是的node非常适用于一个 web 库或框架。

Just because Node is designed without threads, doesn't mean you cannot take advantage of multiple cores in your environment. Child processes can be spawned by using our child_process.fork() API, and are designed to be easy to communicate with. Built upon that same interface is the cluster module, which allows you to share sockets between processes to enable load balancing over your cores. 仅仅是因为 Node 没有线程，这并不意味着在你的环境中不能使用多核。子进程可以通过 child_process.for() 接口来使用，并且被设计易于与之通信。在相同的接口上构建的是集群模块，它允许您在进程之间共享套接字，以便在核心上实现负载平衡。