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

app.get('/', (req, res) => {
    res.json('hello world');
});

// Lắng nghe ở cổng được chỉ định
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
