# Node环境搭建

## Windows 下安装 NVM及Node

1. 下载 nvm-windows
[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

2. 配置nvm-windows

- 解压到一个全引文路径
- 目录下的`setting.txt`文件（不存在则创建）
  - `root: C:\nvm-noinstall`
  - `path: C:\node`
  - `arch: 64`
  - `proxy: none`

- `root`为当前nvm.exe所在目录
- `path`为node快捷方式做在目录
- `arch`为当前操作系统的位数（32|64）
- `proxy` 不用配置

3. 配置环境变量： window+r, sysdm.cpl

- `NVM_HOME` 当前nvm.exe所在目录
- `NVM_SYMLINK` node快捷方式所在目录
- `PATH+=%NVM_HOME%;%NVM_SYMLINK%`
- 测试 `set path`

- PowerShell: dir env:PATH'

4. 安装 node

`> nvm install 8.1.2`

5. 其他命令

- `> nvm uninstall <version>`
- `> nvm use <version>`
- `> nvm list`

## Sublime 中NodeJS编译环境

1. 工具->编译系统->编译新系统->node.sublime-build:

```json
{
  "cmd": ["node","$file"],
  "selector": "source.js"
}
```

2. 编辑 index.js

```js
arr=[1,3,5,7,8];
settimeout(function(){
  console.log(arr);
}, 3000);
```

3. Ctrl+b 编译输出

## CentOS 下安装 NVM 及 Node

- node v4.1.0 支持ES6

1.修改 yum 源

```sh
# cd /etc/yum.repos.d
# mv CentOS-Base.repo CentOS-Base.repo.back
# curl -o CentOS-aliyun-7.repo http://mirrors.aliyun.com/repo/Centos-7.repo
# curl -o CentOS-aliyun-epel-7.repo http://mirrors.aliyun.com/repo/epel-7.repo
```

2.安装NVM并重新启动shell

`# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash`

3.查看NVM可安装版本

`# nvm ls-remote`

4.安装最新稳定版本

`# nvm install stable`

5.查看安装的版本列表

`# nvm list`

6.切换node版本

`# nvm use <version>`

7.显示当前版本

`# nvm current`

8.指定一个默认的node版本

`# nvm alias default <version>`

9.用node之前，先use.

`# nvm use node`

- 或者加入`.bashrc`，初始化的时候启动即可