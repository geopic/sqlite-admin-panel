module.exports = {
  publicPath: '/',
  devServer: {
    port: 3000
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "${__dirname}/src/vue/globals.scss";`
      }
    }
  },
  configureWebpack: {
    entry: {
      app: `${__dirname}/src/vue/main.ts`
    }
  }
};
