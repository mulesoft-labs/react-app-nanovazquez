const mulesoftProxy = {
  target: 'https://qax.anypoint.mulesoft.com',
  changeOrigin: true,
};

module.exports = {
  development: {
    protocol: 'https',
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/accounts': mulesoftProxy,
      '/login': mulesoftProxy,
      '/armui': mulesoftProxy,
    },
  },
};
