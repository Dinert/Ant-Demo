module.exports = {
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
  devServer: {
    port: 5000,
    open: true,
  },
};
