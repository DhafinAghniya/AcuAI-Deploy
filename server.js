const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy to backend (auth, forum, feedback)
app.use('/api', createProxyMiddleware({
  target: 'https://back-end-acu-ai-production.up.railway.app',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

// Proxy to ML model
app.use('/predict', createProxyMiddleware({
  target: 'https://dhapunk-integrasi-acuai.hf.space',
  changeOrigin: true,
  pathRewrite: { '^/predict': '/predict' },
}));

// Handle all other routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
