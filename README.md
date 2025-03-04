# CLASSLAB-ICS

![VUE3](https://img.shields.io/badge/Vue3-4FC08D?logo=vue.js&logoColor=white) ![!Node.js](https://img.shields.io/badge/Node.js-43853D?logo=Node.js) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![Version](https://img.shields.io/github/package-json/v/ZhonFortune/classtab-ics) ![License](https://img.shields.io/github/license/ZhonFortune/classtab-ics) ![platform](https://img.shields.io/badge/Platform-Web-01D7E2)

<br>

[在线DEMO](/) | [快速开始](#quick-start) | [后端](/) | [使用文档](/)

---

# 项目简介 :page_with_curl:
本项目是一个基于Vite3和Vue3的在线课程表，用于展示课程表信息。采用前后端分离的架构，前端使用Vue3开发，后端使用Node.js开发。在应用中我们实现如下功能:

- 多用户登录
- 课程表预览 / 展示 / 编辑 / 删除
- IPHONE订阅日历
- 课程表导出为PDF
- 课程表导出为ICS
- ...
- 教务系统导入课程表(仍在开发)

> [!TIP]
> [了解如何实现快速导入教务系统课程表](/)
> [了解如何通过IPHONE以订阅日历](/)

# 快速开始 :rocket: <a id="quick-start"></a>

如果您有相关知识，可以按照以下步骤快速开始：
若您没有相关知识亦想体验本项目，请阅读[使用文档](/)。
## 安装

```shell
#前端
npm install -g
#后端
npm install -g
```

## 运行

```shell
#前端
citabi
#后端
citabi-backend
```

## 访问

```shell
#前端 (默认)
http://localhost:5173
#后端 (默认)
http://localhost:6058
```

## 部署

若您需要部署至服务器，请阅读[使用文档-部署](/)

# 技术栈 :computer:

## 前端

- [Vue3](https://v3.cn.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [Axios](https://axios-http.com/)

## 后端

- [Node.js](https://nodejs.org/zh-cn/)
- [Express](https://expressjs.com/)

## 数据库

- [SQLite](https://www.sqlite.org/index.html)

---