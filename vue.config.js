const path = require("path");

module.exports = {
  devServer: {
    port: 5000,
    open: true,
  },
  configureWebpack: {
    mode:
      process.env.NODE_ENV === "development"
        ? process.env.NODE_ENV
        : "production",
    devtool:
      process.env.NODE_ENV === "development"
        ? "inline-source-map"
        : "cheap-module-source-map",
  },
  pluginOptions: {
    // 第三方插件配置
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/style/less/index.less")], // less所在文件路径
    },
  },
  css: {
    loaderOptions: {
      less: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            'primary-color': '#13c2c2',
          },
          javascriptEnabled: true,
      }
    },
  }
};
