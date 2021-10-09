const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#876800",
              "@layout-header-background": "#1f1f1f",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
