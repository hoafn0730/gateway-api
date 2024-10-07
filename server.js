const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Proxy tới service A
app.use(
    '/sso-api',
    createProxyMiddleware({
        target: process.env.SERVICE_SSO_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/sso-api': '', // Xóa tiền tố '/service-a' khi chuyển tiếp
        },
    }),
);

// Proxy tới service B
app.use(
    '/fdemy-api',
    createProxyMiddleware({
        target: process.env.SERVICE_FDEMY_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/fdemy-api': '', // Xóa tiền tố '/service-b' khi chuyển tiếp
        },
    }),
);

// Lắng nghe ở cổng được chỉ định
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
