module.exports = {
    plugins: [
      {
        plugin: {
          overrideWebpackConfig: ({ webpackConfig }) => {
            webpackConfig.resolve.fallback = {
              buffer: require.resolve('buffer/'),
            };
            return webpackConfig;
          },
        },
      },
    ],
  };
  