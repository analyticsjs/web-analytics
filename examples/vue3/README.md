# vue3-example

Example of using the `@web-analytics/vue` package in a Vue 3 project.

一个在 Vue 3 项目中使用 `@web-analytics/vue` 包的示例。

## Preparation Phase

Please open the command line tool first and follow the commands and prompts below.

请先打开命令行工具并按照下方的命令和提示进行操作。

```bash
# First clone this repo to the local
# 请先将本仓库克隆至本地
git clone https://github.com/analyticsjs/web-analytics.git

# Enter the project directory
# 进入项目目录
cd web-analytics

# You must use `pnpm` as the package manager for this project
# 必须使用 `pnpm` 作为该项目的包管理器
npm i -g pnpm

# Install workspace dependencies with `pnpm`
# 使用 `pnpm` 安装工作区依赖
pnpm i -w

# Build all packages
# 构建所有包
pnpm build:all
```

## Run this example

After completing the preparatory work, your command line tool should now be in the project root directory.

完成准备工作后，命令行工具现在应该位于项目根目录中。

Please continue to follow the commands and prompts.

请继续按照命令和提示进行操作。

```bash
# Enter this example directory
# 进入本示例目录
cd ./examples/vue3

# Install dependencies for this example with `pnpm`
# 使用 `pnpm` 安装本示例的依赖
pnpm i

# Start the local development service
# 启动本地开发服务
pnpm dev
```

## Usage reference

Usually you only need to pay attention to the usage reference under the `src` directory of the current example, without paying attention to other configurations.

通常只需要关注当前示例的 `src` 目录下的用法参考，而无需关注其他配置。

## Feedback

If you have any questions, please report to the [GitHub Issue](https://github.com/analyticsjs/web-analytics/issues).

如有疑问，请到 [GitHub Issue](https://github.com/analyticsjs/web-analytics/issues) 反馈。
