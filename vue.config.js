module.exports = {
  publicPath: '/',
  devServer: {
    host: 'localhost',
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
