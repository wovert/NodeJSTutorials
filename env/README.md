# Node 环境安装

[Node官网](https://nodejs.org/zh-cn/)

LTS 长期稳定版

## Windows 下安装 Node 环境

1. 下载 nvm 并配置环境变量

2. 配置 node 和 npm 镜像源

``` shell
# nvm node_mirror https://npm.taobao.org/mirrors/node/
# nvm npm_mirror https://npm.taobao.org/mirrors/npm/
```

3. 安装 node

``` shell
# nvm install 8.11.3
# nvm list 查看已安装的 node 版本列表
# nvm use 8.11.3 使用指定 node 版本
# node -v 查看使用 Node 版本
```

4. 查看使用 Node 版本

`node -v 查看使用 Node 版本`