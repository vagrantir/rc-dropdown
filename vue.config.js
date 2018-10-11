module.exports = {
  chainWebpack: config => {
    config.module
          .rule('js')
          .type("javascript/auto");
  },
  css: {
    extract: false,
  },
};
