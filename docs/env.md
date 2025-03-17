# 环境配置

本项目以 Vite 为开发工具，且使用 Vue3 作为开发框架，因此您需要安装 Node.js，并确保 Node.js 的版本在 16.0.0 以上

<br>

---
## 介绍 Node.js

>Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows developers to execute JavaScript code outside of a web browser, making it possible to use JavaScript for server-side scripting. This enables the creation of dynamic web page content before the page is sent to the user's web browser
<br><br>Key Features of Node.js :
<br>1.Event-Driven and Non-Blocking I/O Model: <br>Node.js uses an event-driven, non-blocking I/O model, which makes it lightweight and efficient. This model is particularly suitable for applications that require real-time interaction or handle a large number of concurrent connections
<br>2.Single-Threaded: <br>Node.js operates on a single-threaded event loop, which can handle multiple connections simultaneously. This design avoids the overhead of creating multiple threads and makes it easier to manage resources
<br>3.High Performance: <br>The V8 engine, developed by Google, compiles JavaScript directly to native machine code, resulting in high performance and fast execution
<br><br>Applications of Node.js:
<br>Node.js can be used for a variety of applications, including:
<br>1.Web Development: <br>Node.js is commonly used for building web applications. Frameworks like Express.js simplify the process of creating web servers and handling HTTP requests
<br>2.Real-Time Applications: <br>Node.js is ideal for real-time applications such as chat applications, online gaming, and collaborative tools. Libraries like Socket.io enable real-time, bidirectional communication between web clients and servers
<br>3.API Services: <br>Node.js can be used to create RESTful APIs, which can serve as the backend for web and mobile applications
<br>4.Web Scraping: <br>Tools like Cheerio and Request allow developers to scrape web pages and extract data
<br>5.Static Site Generation: <br>Frameworks like Hexo enable the creation of static websites and blogs

<br>

Node.js 是一个基于 Chrome 的 V8 JavaScript 引擎构建的 JavaScript 运行时环境。它允许开发者在浏览器之外执行 JavaScript 代码，使 JavaScript 能够用于服务器端脚本编写。这使开发者能够在将页面发送给用户的 web 浏览器之前创建动态网页内容
<br><br>Node.js 的关键特性:
<br>1.事件驱动和非阻塞 I/O 模型:<br>Node.js 使用事件驱动和非阻塞 I/O 模型，这使得它轻量且高效。这种模型特别适合需要实时交互或处理大量并发连接的应用程序
<br>2.单线程:<br>Node.js 在单线程事件循环上运行，可以同时处理多个连接。这种设计避免了创建多个线程的开销，并使资源管理更容易
<br>3.高性能:<br>由 Google 开发的 V8 引擎将 JavaScript 直接编译为原生机器代码，从而实现高性能和快速执行
<br><br>Node.js 的应用:
<br>Node.js 可以用于各种应用程序，包括:
<br>1.网络开发:<br>Node.js 通常用于构建网络应用程序。Express.js 等框架简化了创建 web 服务器和处理 HTTP 请求的过程
<br>2.实时应用程序:<br>Node.js 非常适合实时应用程序，如聊天应用程序、在线游戏和协作工具。Socket.io 等库使 web 客户端和服务器之间的实时双向通信成为可能
<br>3.API 服务:<br>Node.js 可以用于创建 RESTful API，可以作为 web 和移动应用程序的后端
<br>4.网页抓取:<br>Cheerio 和 Request 等工具允许开发者抓取网页并提取数据
<br>5.静态网站生成:<br>Hexo 等框架使开发者能够创建静态网站和博客

>[!TIP]描述来源于网络

<br>

---
## 安装 Node.js

请前往 [Node.js 官网](https://nodejs.org/zh-cn/) 下载并安装 Node.js，安装完成后打开终端，输入以下命令以确认 Node.js 是否安装成功


```bash
node -v
```
如果安装成功，终端会显示 Node.js 的版本号

<br>

---
## 配置 Node.js

由于 Node.js 的官方 npm 仓库速度较慢，建议使用淘宝镜像源进行安装，以下为安装淘宝镜像源的命令

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

如果您需要修改 Node.js 的全局安装路径，可以使用以下命令

```bash
npm config set prefix {path}
```

其中 {path} 为您需要修改的路径，请根据您的实际情况进行修改

<br>

---

[上一章: 前言](/guide)<br>
[下一章: 安装与使用](/use)