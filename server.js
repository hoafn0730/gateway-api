const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(morgan('dev')); // Log HTTP requests
app.disable('x-powered-by'); // Hide Express server information

// Proxy tới service A
app.use(
    '/api/v1/auth',
    createProxyMiddleware({
        target: process.env.SERVICE_SSO_URL,
        changeOrigin: true,
        // pathRewrite: {
        //     '^/api/v1': '/api/v1', // Xóa tiền tố '/service-a' khi chuyển tiếp
        // },
    }),
);

// Proxy tới service B
app.use(
    '/api/v1',
    createProxyMiddleware({
        target: process.env.SERVICE_FDEMY_URL,
        changeOrigin: true,
        // pathRewrite: {
        //     '^/fdemy-api': '', // Xóa tiền tố '/service-b' khi chuyển tiếp
        // },
    }),
);

app.get('/', (req, res) => {
    res.json('hello world');
});

// Lắng nghe ở cổng được chỉ định
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
