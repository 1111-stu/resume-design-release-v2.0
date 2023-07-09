<p align="center"><img width="200" src="https://gitee.com/sharemore52/resume-img/raw/master/logo.png"></p>

<p align="center">
    <a href="https://v3.vuejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Vue-%3E3.x-brightgreen?color=91aac3&labelColor=439EFD" alt="vue">
    </a>
    <a href="https://element-plus.gitee.io/#/zh-CN/component/changelog" target="_blank">
        <img src="https://img.shields.io/badge/Element--Plus-%3E2.1-brightgreen?color=91aac3&labelColor=439EFD" alt="element plus">
    </a>
    <a href="https://www.tslang.cn/" target="_blank">
        <img src="https://img.shields.io/badge/TypeScript-%3E4.4-blue?color=91aac3&labelColor=439EFD" alt="typescript">
    </a>
    <a href="https://vitejs.dev/" target="_blank">
        <img src="https://img.shields.io/badge/Vite-%3E3.0-blue?color=91aac3&labelColor=439EFD" alt="vite">
    </a>
    <a href="https://pinia.vuejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Pinia-%3E2.0-blue?color=91aac3&labelColor=439EFD" alt="vite">
    </a>
    <a href="https://pinia.vuejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Node-%3E16.0-blue?color=91aac3&labelColor=439EFD" alt="vite">
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/npm/l/vue.svg?color=91aac3&labelColor=439EFD" alt="License">
    </a>
</p>
<h1 align="center">😙化简</h1>
<h2 align="center">一款免费简历制作神器</h2>

<p align="center"><b>基于Vue3 + TypeScript + Vite + Element-plus + pinia实现</b></p>

# 目录

- [目录](#目录)
  - [项目介绍](#项目介绍)
  - [演示](#演示)
  - [功能介绍](#功能介绍)
  - [项目特性](#项目特性)
  - [如何使用](#如何使用)
    - [拉取项目](#拉取项目)
    - [安装项目依赖](#安装项目依赖)
    - [运行项目](#运行项目)
    - [构建项目](#构建项目)
    - [目录说明:](#目录说明)
    - [参考代码:](#参考代码)
  - [License](#license)

## 项目介绍

该项目目前为纯前端项目，所有数据存储在浏览器端，你可以利用该项目轻松制作出精美的简历。你可以随意添加删除简历模块、选择模板、更改字体大小、颜色、间距等等样式。

## 演示

**图片：**

![img](https://cdn.nlark.com/yuque/0/2023/png/29225964/1688894410624-78acf47c-243e-4a97-a3d5-cd961e36dc6b.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/29225964/1688894447572-a45e4333-f42d-4048-9c88-7d0705c289cc.png)



![img](https://cdn.nlark.com/yuque/0/2023/png/29225964/1688894658578-8c3f28e4-8c5f-4ab7-84b6-764007c0023d.png)

![img](https://cdn.nlark.com/yuque/0/2023/png/29225964/1688894691031-390bbbfa-5b59-4b87-a854-e8bcd04cc6ba.png)



![img](https://cdn.nlark.com/yuque/0/2023/png/29225964/1688894472314-da30398a-c59f-4edf-8a6a-80a348f5b700.png)


<p align="center"><img width="1000" src="https://gitee.com/sharemore52/resume-design/raw/main/doc/images/6.png"></p>

![img](https://cdn.nlark.com/yuque/0/2023/png/29225964/1688894328975-a64a4b2f-f371-4c27-bb4d-fae9eaccfc56.png)



## 功能介绍

- [x] 简历模板提供
- [x] 动态增删简历模块
- [x] 自定义模板中字体样式
- [x] 自定义调整模块间距
- [x] 保存草稿功能
- [x] 导出为PDF功能
- [x] 重置
- [x] 自定义头像
- [x] 自定义各模块内容
- [x] 导出JSON文件
- [ ] 集成openAI，实现AI对话，支持流式响应，上下文对话(开发中···)
- [ ] 更多的功能，敬请期待...

## 项目特性

- 技术栈：Pnpm++ Vite+Vue3 + Typescript+Pinia
- 规范化：Eslint+Pretties+Commit-lint+husky
- 打包优化：代码压缩+图片压缩+懒加载+按需打包

## 如何使用

### 拉取项目
```bash
git clone https://github.com/huajian-pro/resume-design.git
```
- 推荐使用包管理工具[pnpm](https://pnpm.io/installation)
- 或使用[yarn](https://yarnpkg.com/getting-started/install)、npm（node自带无需额外安装）包管理工具
- Node版本请确保在v16.0及以上

> pnpm全局安装方法`npm i -g pnpm`

### 安装项目依赖
```bash
cd resume-design

// 使用pnpm安装依赖（推荐）
pnpm install
```

### 运行项目
```bash
pnpm dev
```

### 构建项目
```bash
pnpm build
```

### 目录说明:

```
├─ doc			  // 项目相关文档
├─ public         // 公共资源目录
├─ scripts
├─ src
│  ├─ api         // 请求封装，暂时未用到
│  ├─ assets      // 资源文件存放目录
│  ├─ components  // 公共组件存放路径
│  ├─ router      // 项目路由配置
│  ├─ schema      // 简历模板JSON格式定义
|  ├─ store       // 状态管理文件夹
|  ├─ styles      // 一些样式文件
|  ├─ template    // 简历模板文件
|  ├─ types       // ts类型定义文件
|  ├─ utils       // 工具函数
|  ├─ views       // 页面文件
|  └─ App.vue     // 主入口页面
|  └─ env.d.ts    // ts类型声明文件
|  └─ main.ts     // 项目主入口文件
```

## 参考代码：

https://github.com/Hacker233/resume-design

## License

- [MIT](https://opensource.org/licenses/MIT)

