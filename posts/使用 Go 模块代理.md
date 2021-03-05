---
title: '使用 Go 模块代理'
date: '2021-02-22'
---

以下方法适用于 Go 版本在 Go 1.13 及以上。

## 开启 Go module 功能

```shell
$ go env -w GO111MODULE=on
```

## 配置 Goproxy 环境变量

```shell
$ go env -w GOPROXY=https://goproxy.cn,direct
```
