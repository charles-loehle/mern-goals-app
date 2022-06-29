const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api/users/',
		createProxyMiddleware({
			target: 'http://localhost:5000',
			changeOrigin: true,
		})
	);
	app.use(
		'/api/goals/',
		createProxyMiddleware({
			target: 'http://localhost:5000',
			changeOrigin: true,
		})
	);
};
