---
title: 'webpack 搭建本地 https 开发环境'
date: '2021-03-05'
---

开启本地 https 访问开发地址很简单，以 `vue.config.js` 举例，只需要：

```js
devServer: {
  https: true
}
```

配置完后重新启动服务就可以用 https 访问开发地址了。

但是这样做有一个问题，就是访问的时候浏览器会提示不安全，原因就是没有配置本地证书，为了更好的开发体验，我们把证书也配置上去。

首先，我们先安装一个制作本地证书的工具 —— `mecert`：

```bash
brew install mkcert
```

然后，创建一个本地的 `CA`：

```bash
mkcert -install
```

创建成功后就可以在项目中生成证书了，比如：

```bash
mkcert my-local-cert
```

`my-local-cert` 可以换成任何你喜欢的名字。

生成成功之后，执行命令的目录下会生成 `my-local-cert.pem` 和 `my-local-cert-key.pem`。

接着，我们修改 `vue.config.js` 中的配置：

```js
devServer: {
  https: {
    key: fs.readFileSync('./my-local-cert-key.pem'),
    cert: fs.readFileSync('./my-local-cert.pem')
  }
}
```

最后，重新启动本地服务，再从新的浏览器标签栏打开开发地址，就能正常访问 https 了，浏览器也不会显示连接不安全了。



