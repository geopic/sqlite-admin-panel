module.exports = {
  publicPath: '/',
  devServer: {
    port: 3000
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@vue/globals.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@vue': `${__dirname}/src/vue`
      }
    },
    entry: {
      app: `${__dirname}/src/vue/main.ts`
    }
  }
};
