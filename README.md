# 简介

​	此脚本可将 typora 的主题样式添加统一类名，可在页面的盒子标签中使用该 markdown 样式时，避免样式污染的问题。

# 准备

- NODEJS 运行环境
- 主题 CSS 文件（需格式化，默认即可）

# 运行

```bash
# 克隆项目
git clone https://github.com/fwr220807/typora-theme-css-add-class-name.git

# 进入项目目录
cd typora-theme-css-add-class-name

# 运行命令脚本，输出位置为当前文件夹
npm run exec [文件位置] [样式的类名(缺省值为 .markdown-body)]

# 例子,输出 output.css
npm run exec ./example.css
```

# License

