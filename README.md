# vue project template with javascript for [wsf](https://github.com/csby/wsf) basic service

## 开发环境
### npm 镜像(cnpm: 国内网络加速)
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
### 安装 Vue CLI
```
cnpm install --global @vue/cli
```

## 安装项目依赖
```
cnpm install
```

### [修改配置文件:/src/config.js](/src/config.js)
```
// 网站标题
const title = "标题"

// API根路径
const api = {
    dev: "http://192.168.123.8:8080",   // 开发环境
    pro: ""                             // 生产环境（空表示与网站服务器一致）
}

// 网站跟目录
const web = {
    dev: "/",       // 开发环境
    pro: "/doc/"    // 生产环境
}
```
### [修改版本号:/src/version.js](/src/version.js)
```
const version = "1.0.1.0"
```

### 编译项目并以开发模式运行
```
cnpm run dev
```

### 编译并生成打包版本
```
cnpm run build
```
