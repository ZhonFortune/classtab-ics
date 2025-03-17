# 安装与使用

由于项目采用先后端分离架构，因此需要分别安装前端和后端，启动时也需要分别启动前后端
我们推荐您使用全局安装模式 `-g` 使用本项目
---

## 前端

安装命令
```bash
npm i -g cltab-ics
```

启动命令
```bash
cltabi
```

默认运行地址为 `http://localhost:6057`
若您需要修改前端运行端口，可以在启动命令后添加 `--host` 参数并指定端口号，例如
```bash
cltabi --host 8080
```
这样就将运行地址修改为 `http://localhost:8080` 

<br>

---

## 后端

安装命令
```bash
npm i -g cltab-ics-bend
```

启动命令
```bash
cltabi
```

默认运行地址为 `http://localhost:6057`
若您需要修改后端运行端口,请参考[配置](/config)

<br>

---

[上一章: 环境配置](/env)<br>
[下一章: 配置](/config)