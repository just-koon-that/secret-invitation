const {createProxyMiddleware} = require('http-proxy-middleware');

if (process.env.NODE_ENV === 'development') {
  module.exports = app => {
    app.use(
      createProxyMiddleware('/wapi', {
        target: 'https://dn08k7u8uf.execute-api.us-west-2.amazonaws.com',
        changeOrigin: true,
        pathRewrite: {
          '^/wapi': '',
        },
      })
    );
  };
}
