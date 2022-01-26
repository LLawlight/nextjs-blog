---
title: '在 Vue 2 项目中使用 Vite'
date: '2021-09-23'
---

对于生产环境来说，用户的浏览器环境复杂，使用生态丰富的 webpack 打包依旧是最佳实践，能够构建出拥有良好兼容性的 web 应用。

但是对于开发环境来说，浏览器只针对开发者自身，提升开发效率才是关键因素，拥有快速启动能力和极速热更新能让开发者如鱼得水。

所以两者并用，在不同的环境中使用最合适的构建工具，何乐而不为呢？这就是我们当前要在开发环境中使用 vite 的目的。

同时，使用新的构建构建工具必定会带来老代码的兼容问题，如果直接在生产环境应用新的构建工具，就需要对所有不兼容的文件做兼容处理，增加了开发和测试的压力。如果只在开发环境应用，那么我们只需要做好正在迭代开发的文件的兼容即可，这也是一种渐进式升级的策略。

# 使用 vue-cli-plugin-vite 插件

```bash
$ vue add vite
```

安装完成后，执行：

```bash
$ npm run vite
```

报错：

```bash
Error: esbuild: Failed to install correctly
```

这是一个已知的 esbuild 的 bug：

[Broken install binary on macOS · Issue #462 · evanw/esbuild](https://github.com/evanw/esbuild/issues/462)

解决办法，手动执行：

```bash
$ node node_modules/esbuild/install.js
```

再次执行：

```bash
$ npm run vite
```

不再报之前的错。而是出现了新的错误信息：

```bash
error when starting dev server:
Error: The following dependencies are imported but could not be resolved:

  vee-validate (imported by /Users/getui/Documents/ginsight/fe-dmpnew-bullet/src/config/validate_rule.js)
  axios (imported by /Users/getui/Documents/ginsight/fe-dmpnew-bullet/src/api/inteceptor.js)
  moment (imported by /Users/getui/Documents/ginsight/fe-dmpnew-bullet/src/config/validate_rule.js)

Are they installed?
```

实际上项目中是有这些依赖的，只不过这几个依赖是通过 CND 引入的，并配置了 externals，使用 vue-cli 的方式启动能够正常运行，但是换成 vite 就不行了。通过阅读 vue-cli-plugin-vite 的源码可以看到插件并没有将 vue-cli 的 externals 传给 vite 配置，所以 vite 默认从 node_modules 中寻找依赖，导致了 could not be resolved。

为了便于更好的管理依赖，趁此机会正好将老项目的依赖升级一下，顺便将依赖从 CDN 换成 npm 安装。

依赖问题处理完之后，我们重新执行：

```bash
$ npm run vite
```

上述的问题已经解决，但是又迎来了新的问题，控制台报了大量 vite:eslint 的错误（背景：之前此项目更换过 eslint 的配置文件，新旧文件的规范不同，一般情况下只会对 staged 状态的文件进行检查和格式化）。

通过阅读 vue-cli-plugin-vite 的源码可以观察到：

```jsx
// ...
import eslintPlugin from 'vite-plugin-eslint'
// ...

// ...
export default defineConfig({
	// ...
	plugins: [
		// ...
		viteOptions.disabledLint
      ? undefined
      : /* temporarily enabled for development */ process.env.NODE_ENV === 'development'
      ? eslintPlugin({
          /**
           * deal with some virtual module like react/refresh or windicss.
           * @see {@link https://github.com/gxmari007/vite-plugin-eslint/issues/1}
           */
          include: 'src/**/*.{vue,js,jsx,ts,tsx}',
        })
      : undefined,
		// ...
	],
	// ...
})
```

在开发环境下会默认开启 vite-plugin-eslint 插件，我们的项目并不需要开启这个插件，所以在 vue.config.js 中将其关闭：

```jsx
// ...

module.exports = {
	// ...
	pluginOptions: {
    vite: {
      disabledLint: true
    }
  },
	// ...
};
```

关闭 vite:eslint 功能之后，我们再次执行：

```bash
$ npm run vite
```

可以观察到控制台不报 eslint 错误了，但是又出现了新错误：

```bash
[vite] Internal server error: Failed to resolve import "./src/index" from "src/components/gt_top_bar/index.js". Does the file exist?
  Plugin: vite:import-analysis
```

这是因为 vite 在导入 vue 文件时需要通过后缀名来判断是否为 vue 文件，省略后缀将会导致无法正常导入。虽然我们之前在写项目的时候可能会觉得不加后缀名比较方便，同时编译时也能正确识别并编译，但是我们现在碰到了后缀名引起的问题，正好借此机会将 vue 文件全部加上后缀名。这并不是为了 vite 而妥协，而是大势所趋。因为不仅是 vite，就连 vue-cli 也开始强烈推荐加上后缀名了：

[Migrating from v3 | Vue CLI](https://cli.vuejs.org/migrating-from-v3/#vue-cli-plugin-typescript)

为所有的 vue 文件加上后缀名之后，再次尝试执行：

```bash
$ npm run vite
```

继续报错：

```bash
[vite] Internal server error: variable @base-viColor is undefined
  Plugin: vite:css
```

看来是 vite 没有读到 less 全局变量，而我们使用 webpack 编译的时候是能够正常读取的，这就说明了这部分的配置文件 vite 并不兼容。从 vue-cli-plugin-vite 的源码中，我们并不能直接看到插件将 css 的相关配置传给 vite，但是可以看到 vue-cli-plugin-vite 使用了 vite-plugin-vue-cli 插件并调用了 vueCli 方法。那我们继续探索 vueCli 这个方法，从源码中我们可以看到：

```jsx
// ...
function vueCli() {
	// ...
	let vueConfig = {};
	return {
		// ...
		config(config2) {
			// ...
			vueConfig = require(resolve("vue.config.js")) || {};
			// ...
			const css = vueConfig.css || {};
			// ...
			config2.css.preprocessorOptions = css.loaderOptions;
			// ...
		},
		// ...
	}
}
// ...
```

由此可见，vite 的 css 预处理器相关的配置是从 vue.config.js 中的 css.loaderOptions 中读取的，而我们在使用 vue.config.js 中配置 less 是通过官方推荐的 chainWebpack 去配置的，那自然是风马牛不相及。所以我们在 vue.config.js 的 css.loaderOptions 中加入相关配置：

```jsx
const path = require("path");

// ...

module.exports = {
	// ...
	css: {
    loaderOptions: {
      less: {
        additionalData: `@import "${path.resolve(
          "src/assets/style/base.less"
        )}";`
      }
    }
  },
	// ...
};
```

再次执行：

```bash
$ npm run vite
```

项目终于成功跑起来了！

接下去我们来尝试一下使用 less 全局变量与热更新，替换一个颜色常量为 less 变量并保存：

```less
~~color: #333333;~~
color: @base-viColor;
```

页面**瞬间**更新！

但是，随之而来的是又一个报错：

```bash
[plugin:vite-plugin-checker] Property 'errors' does not exist on type 'CombinedVueInstance<{ username: string; password: string; code: string; pid: string; stratery: string; isShowPwd: boolean; isRemember: boolean; isShowImgVerify: boolean; noPass: boolean; position: number; loading: boolean; } & { ...; } & { ...; } & Vue, object, object, object, Record<...>>'.
```

这里的 errors 其实是 vee-validate 为 vue 实例注入的变量，所以 data 中并不存在 errors，这就导致了 vite-plugin-checker 在类型检查时报错。而且当前实践的项目是 js 写的，所以也没有做类型相关的工作。因此我们这里选择先将类型检查功能关闭。

首先，我们得刚清楚这个 vite-plugin-checker 是从哪里来的，因为从上文可以知道，我们全程都没有安装和使用过这个插件。通过阅读 vue-cli-plugin-vite 的源码可以观察到：

```jsx
// ...
import Checker from 'vite-plugin-checker'
import { VlsChecker } from 'vite-plugin-checker-vls'
// ...

// ...
export default defineConfig({
	// ...
	plugins: [
		// ...
		viteOptions.disabledTypeChecker
      ? undefined
      : Checker(
          vueVersion === 2
            ? /* temporarily enabled for development */ process.env.NODE_ENV === 'development'
              ? {
                  overlay,
                  vls: VlsChecker(/** advanced VLS options */),
                }
              : undefined
            : process.env.NODE_ENV === 'development'
            ? {
                overlay,
                vueTsc: true,
              }
            : undefined,
        ),
		// ...
	],
	// ...
})
```

默认会开启 Checker，除非我们设置了 disabledTypeChecker 为 true。所以在 vue.config.js 中将其关闭：

```jsx
// ...

module.exports = {
	// ...
	pluginOptions: {
    vite: {
      disabledTypeChecker: true
    }
  },
	// ...
};
```

再次执行：

```bash
$ npm run vite
```

并对代码作出修改：

```less
~~color: @base-viColor;~~
color: #333333;
```

终于能够正常运行了！

## 收益

### 使用 vue-cli-service 启动本地开发服务

```bash
DONE  Compiled successfully in 20535ms

  App running at:
  - Local:   http://localhost:8960/ 
  - Network: http://192.168.165.238:8960/
```

### 使用 vite 启动本地开发服务

```bash
vite v2.3.8 dev server running at:

  > Local: http://localhost:8960/
  > Network: use `--host` to expose

  ready in 3707ms.
```

## 配置的兼容性

在完美运行 vite 之后，我们测试一下 vue-cli-service 是否还能够正常运行，vue-cli-service 的正常运行能够让我们在未来开发时碰到 vite 有坑的时候可以紧急启用 Plan B！

执行：

```bash
$ npm run serve
```

成功运行：

```bash
DONE  Compiled successfully in 9629ms

  App running at:
  - Local:   http://localhost:8960/ 
  - Network: http://192.168.165.238:8960/
```

开发环境的启动速度似乎变快了，应该是得益于我们在配置 vite 时对依赖重新作出的优化，看来老项目还是要经常整理才行。

同样的热更新 less 变量，编译时间：

```bash
DONE  Compiled successfully in 3197ms

  App running at:
  - Local:   http://localhost:8960/ 
  - Network: http://192.168.165.238:8960/
```

热更新的编译速度还是一如既往的慢，使用 vite 后应该可以节约不少寿命。

## 问题汇总 & 解决方案

### 1. Error: esbuild: Failed to install correctly

手动执行 `node node_modules/esbuild/install.js`

### 2. Error: The following dependencies are imported but could not be resolved

使用 npm 安装依赖或者增加 vite 的 CDN 配置

### 3. vite:eslint 错误

关闭 vite-plugin-eslint 插件：

```jsx
// ...

module.exports = {
	// ...
	pluginOptions: {
    vite: {
      disabledLint: true
    }
  },
	// ...
};
```

### 4. Failed to resolve import "./src/xxx/xx" from "src/xxx/xx.xx". Does the file exist?

为省略了后缀的 vue 文件路径增加后缀名

### 5. variable @xxx is undefined (Plugin: vite:css)

添加 vite 的 css 预处理器的全局变量配置，以 less 为例：

```jsx
const path = require("path");

// ...

module.exports = {
	// ...
	css: {
    loaderOptions: {
      less: {
        additionalData: `@import "${path.resolve(
          "src/xxx/xx.less"
        )}";`
      }
    }
  },
	// ...
};
```

### 6. [plugin:vite-plugin-checker] Property 'errors' does not exist on type 'XXX'.

JS 项目关闭 vite-plugin-checker，TS 项目完善对应类型。

关闭 vite-plugin-checker 的方法：

```jsx
// ...

module.exports = {
	// ...
	pluginOptions: {
    vite: {
      disabledTypeChecker: true
    }
  },
	// ...
};
```

### 7. [plugin:vite:import-analysis] Failed to parse source for import analysis because the content contains invalid JS syntax.

这种情况一般是因为使用了 JSX 所致。只需开启 vite 的 JSX 配置：

```jsx
// ...

module.exports = {
	// ...
	pluginOptions: {
    vite: {
      vitePluginVue2Options: {
				jsx: true
			}
    }
  },
	// ...
};
```

如果是在 vue 文件中使用了 JSX 语法，还需将 script 中的 lang 指定为 jsx：

```jsx
<script lang="jsx">
// ...
</script>
```

### 8. [vite] Internal server error: Inline JavaScript is not enabled. Is it set in your options? (Plugin: vite:css)

这种情况是在 css 预处理器中使用了函数所致，只需要开启对应 loader 的 JS 支持即可：

```jsx
javascriptEnabled: true
```

注意：vue-cli（老版本 loader） 和 vite 的配置不一定相同！举例，如果你之前项目中的写法是：

```jsx
// ...

module.exports = {
	// ...
	css: {
    loaderOptions: {
      less: {
        lessOptions: {
					// ...
          javascriptEnabled: true,
        },
      },
    },
  },
	// ...
}
```

需要改为：

```jsx
// ...

module.exports = {
	// ...
	css: {
    loaderOptions: {
      less: {
				// ...
        javascriptEnabled: true,
      },
    },
  },
	// ...
}
```

### 9. 在 vue 文件中的 template 里使用 @/xxx/xx.xxx （比如图片资源），浏览器控制台报 404 错误

这并不是 vite 的问题，但这是一个 vue 的问题，主要问题是在 @vue/compiler-sfc 上，这个问题目前已经修复，升级 @vue/compiler-sfc（3.0.6及以上） 即可。