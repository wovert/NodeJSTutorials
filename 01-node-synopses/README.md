# Node Synopses

## Node History

- 2009年3月，[Ryan Dahl](http://tinyclouds.org/) 在其博客上宣布准备给予 V8 创建一个**轻量级的 Web 服务器**并提供**一套库**。
- 2009年5月，[Rayn Dahl](https://github.com/ry) 在 **GitHub** 上发布了**最初的版本**。
- 2009年12月和2010年4月，两届 [JSConf](http://jsconf.com/) 大会都安排 Node 的讲座。[中国 JSConf](http://jsconf.cn/)
- 2010年底，Node 获得硅谷云计算服务商 [Joyent](https://www.joyent.com/) 公司的自助，其创始人 Ryan Dahl 加入 Joyent 公司全职负责 Node 的发展。
- 2011年7月，Node 在**微软**的支持下发布了其 **Windows 版本**。
- 2011年11月，Node 超越了 Ruby on Rails，成为 GitHut 上关注度最高的项目（随后被 Bootstrap 项目超越，目前仍居第二）
- 2012年1月底，Rayn Dahl在对 Node 架构设计满意的情况下，将掌门人的身份交给 Isaac Z.Schlueter，自己转向一些研究项目。Isaac Z. Schlueter 是 Node 的包管理器 NPM 的作者，之后 Node 的版本发布和 bug 修复等工作由他接受。
- 随后，Node 的发布计划主要集中在**性能提升**上，在v0.14之后，正式发布出v1.0版本。
- [Node.js 发布工作组发布日程](https://github.com/nodejs/Release#release-schedule1)

## Why Node

Ryan Dahl 是一名资深的C/C++程序员，在创造出 Node 之前，主要工作都是围绕高性能 Web 服务器进行的。经历过尝试一些尝试和失败之后，它找到了设计高性能，Web 服务器的几个要点。基于事件驱动、非阻塞I/O 的 Web服务器，以达到更高的性能，提供 Apache 等服务器之外的选择。大多数不设计一种更简单和更有效率的程序的主要原因是用到的阻塞I/O的库。写 Node 的时候，评估过 C, Lua, Haskell, Ruby 等语言作为备选实现。但 C 开发门槛高，可以预见不会太多的开发者能够用到业务开发，对 Haskell 玩不转， Lua 已经含有很多阻塞 I/O库，不能改变人们继续使用阻塞 I/O 库的习惯，而 Ruby 的虚拟机由于性能不好而落选。

JavaScript 比 C 的开发门槛低，比 Lua 的历史包袱要少。虽然服务器端存在已经很多年了，但是后端部分一直没有市场，可以说历史包袱为零，为其导入非阻塞 I/O 库没有额外阻力。另外，JavaScript 在浏览器中有广泛的事件驱动方面应用。Chrome 浏览器的 JavaScript 引擎 V8 性能非常高，而且给予新 BSD 许可证发布。所以，考虑到高性能、符合事件驱动、没有历史包袱这3个主要原因，JavaScript 成为了 Node.js 实现语言.

- 为什么叫 Node.js

起初，项目名为web.js 就是一个 Web 服务器，但是项目的发展超过了最初单纯开发一个 Web 服务器的想法，变成了构建**网络应用的一个基础框架**，这样可以在它的基础上构建更多的东西，诸如服务器、客户端、命令行工具等。Node 强制**不共享任何资源的单线程、单进程系统，包含十分适宜网络的库**，为构建**大型分布式应用**程序提供基础设施，其目标是成为一个构建**快速，可伸缩的网络应用平台**。通过协议来组织许多 Node，非常容易通过扩展来达成构建网络应用的目的。每一个 Node 进程都构成这个网络应用的一个节点，这是它名字所含意义的真谛。

- Node 给 JavaScript 带来的意义

- Chrome 浏览器组件构成
  - HTML JavaScript
  - WebKit V8
  - 中间层
  - 网卡 硬盘 显卡

- Node 组件构成
  - JavaScript
  - V8
  - 中间层(libuv)
  - 网卡 硬盘 显卡

浏览器中除了 V8 作为 JavaScript 引擎之外，还有一个 **WebKit 布局引擎**。HTML5 在发展的过程中定义了更多更丰富的 API。在实现上，浏览器提供了越来越多的功能暴漏给 JavaScript 和 HTML 标签。但对于前段浏览器的发展现状而言，HTML5 标准统一的过程是相对**缓慢**的。JavaScript 作为一个图灵完备的语言，长久以来却限制在浏览器的**sandbox**中运行，它的能力取决于浏览器**中间层**的支持有多少。

除了 HTML、WebKit 和 显卡这些 UI 相关技术没有支持外，Node 的结构与 Chrome 十分相识。都是基于事件驱动的异步架构，浏览器通过事件驱动来服务器界面上的交互，Node 通过是事件驱动来服务 I/O。Node中，JavaScript 随心随遇的访问本地文件，可以单间 WebSocket 服务器端，可以连接数据库，可以　Web Workers 玩转多进程。如今，JavaScript 可以运行在不同的地方，不在继续限制在浏览器中与 CSS 样式表、DOM 树打交道。如果 HTTP 协议栈是水平面，Node 就是浏览器再协议栈另一边的倒影。Node 不处理UI，但用于浏览器形同的机制和原理运行。前后端编程的统一，可以大大的降低前后端转换所需要的上下文交换代价。

- [node-webkit](https://nwjs.io/) 
- [nwjs](https://github.com/nwjs)

将 Node 中的事件循环和 WebKit 的事件循环融合在一起，既可以通过HTML、CSS 带的 UI构建，可能通过它访问本地资源，将两者优势整合到一起。桌面应用程序的开发可以完全通过HTML、CSS、JavaScript 完成。

## What is Node

> [Node.js](https://nodejs.org) is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an even-drien, non-blocking I/O model that makes it lightwieght and efficient. Node.js package ecosystem,npm,is the largest ecosystem of open source libraries in the world. 
- Author: Ryan Dahl
- [Node.js in gitub](https://github.com/nodejs)
- 提供大量的API工具库：文件操作、网络操作、操作系统
- Node = V8(ECMAScript) + libuv(系统调用)
- Node哲学：最小硬件成本、追求更高的并发，更高的处理性能

## Node Features

- 异步 I/O
- 时间与回掉函数
- 单线程
- 跨平台

## Node 应用场景

- IO 密集型
- 是否不擅长 CPU 密集型业务
- 与遗留系统和平共处
- 分布式应用

## Node 使用者

- 前后端编程语言环境统一
- 高性能 I/O 用于实时应用
- 并行 I/O 使得使用者可以更高效的利用分布式环境
- 并行 I/O，有效利用稳定接口提升 Web 渲染能力
- 云计算平台提供 Node 支持
- 游戏开发领域
- 工具类应用

## 参考资源

## Node Setup

## Node Development Tools

- Atom
  - Settings->Install->script
  - run: Ctrl+b
  - quit: Ctrl+q
- Visual Studio Code
- Vim
- Sublime

## Node Environment