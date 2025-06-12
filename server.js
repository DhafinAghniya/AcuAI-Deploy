const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', createProxyMiddleware({
  target: 'https://back-end-acu-ai-production.up.railway.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', 
  },
}));

app.use('/predict', createProxyMiddleware({
  target: 'https://dhapunk-integrasi-acuai.hf.space',
  changeOrigin: true,
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
