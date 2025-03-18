# CLASSLAB-ICS

![VUE3](https://img.shields.io/badge/Vue3-4FC08D?logo=vue.js&logoColor=white) ![!Node.js](https://img.shields.io/badge/Node.js-43853D?logo=Node.js) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![Version](https://img.shields.io/github/package-json/v/ZhonFortune/classtab-ics) ![License](https://img.shields.io/github/license/ZhonFortune/classtab-ics) ![platform](https://img.shields.io/badge/Platform-Web-01D7E2)

<br>

[在线DEMO](/) | [快速开始](#quick-start) | [后端](https://github.com/ZhonFortune/classtab-ics-backend) | [使用文档](https://zhonfortune.github.io/classtab-ics/#/)

>![TIP]请注意: 本项目仍处于开发阶段，部分功能可能尚未完善或存在BUG
但您仍可以下载先行体验部分功能

---

<br>

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
> [了解如何实现快速导入教务系统课程表](/)<br>
> [了解如何通过IPHONE以订阅日历](/)

<br>

# 快速开始 :rocket: <a id="quick-start"></a>

如果您有相关知识，可以按照以下步骤快速开始：
若您没有相关知识亦想体验本项目，请阅读[使用文档](https://zhonfortune.github.io/classtab-ics/#/)。
## 安装

```shell
#前端
npm install -g cltab-ics
#后端
npm install -g cltab-ics-bend
```

## 运行

```shell
#前端
cltabi
#后端
cltabi-bend
```

## 访问

```shell
#前端 (默认)
http://localhost:6057
#后端 (默认)
http://localhost:6058
```

## 部署

若您需要部署至服务器，请阅读[使用文档-部署](https://zhonfortune.github.io/classtab-ics/#/deploy)

<br>

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

<br>

# 更新日志 :bookmark_tabs:

```shell
#2025-03-18
#Beta 0.3.3

- [优化] Page > 优化了部分页面的UI
- [新增] Setting > 抹除数据功能
- [新增] Document > 添加了使用文档
- [后端] Backend > 修改部分接口逻辑
- [修复] BUG > 修复了部分BUG

#2025-03-17
#Beta 0.2.3

- [修复] BUG > 修复严重BUG

#2025-03-17
#Beta 0.2.2

- [修复] BUG > 修复严重BUG

#2025-03-17
#Beta 0.2.1

- [开放] Project > 正式开放项目
- [优化] Page > 优化了部分页面
- [修复] BUG > 修复了部分BUG

#2025-03-10
#Beta 0.1.9

- [新增] Page > Duration页面用于添加和展示课程节时配置
- [新增] Setting > 后端接口地址配置
- [优化] API > 优化其UI
- [修改] API > 各页面的接口调用方式
- [修复] BUG > 去掉了一些老BUG 添加了一些新BUG
```
