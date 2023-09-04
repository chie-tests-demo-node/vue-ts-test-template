/* eslint-disable no-dupe-keys */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PBPATH,
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 表示CDN引入的高德地图
    }
  },
  // chainWebpack(config) {
  //   const oneOfsMap = config.module.rule('scss').oneOfs.store
  //   oneOfsMap.forEach((item) => {
  //     item
  //       .use('sass-resources-loader')
  //       .loader('sass-resources-loader')
  //       .options({
  //         resources: './src/styles/common.scss' //相对路径
  //       })
  //       .end()
  //   })  
  // },  
  configureWebpack: {
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  // 代理
  // devServer: {
  //   open: process.env.NODE_ENV !== 'production',
  //   proxy: {
  //     '/sign': {
  //       target: 'http://192.168.0.163:8888',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/sign': ''
  //       },
  //     },
  //   }
  // },
  // "stories": [
  //   "../src/**/*.stories.mdx",
  //   "../src/**/*.stories.@(js|jsx|ts|tsx)",
  //   "../src/**/**/*.stories.@(js|jsx|ts|tsx)"
  // ],
  // "addons": [
  //   "@storybook/addon-links",
  //   "@storybook/addon-essentials",
  //   "@storybook/addon-interactions"
  // ],
  // "framework": "@storybook/vue3",
  // "core": {
  //   "builder": "@storybook/builder-webpack5"
  // },
  // webpackFinal: async (config, { configType }) => {
  //   config.module.rules.push({
  //     test: /\.mjs$/,
  //     type: 'javascript/auto',
  //     resolve: {
  //       fullySpecified: false,
  //       extensions: ['.js', '.vue', '.json']
  //     }
  //   });

  //   return config;
  // }
})
