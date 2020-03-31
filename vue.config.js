module.exports = {
  publicPath: '/',
  devServer: {
    port: 3000
  },
  configureWebpack: {
    entry: {
      app: `${__dirname}/src/vue/main.ts`
    }
  }
};
