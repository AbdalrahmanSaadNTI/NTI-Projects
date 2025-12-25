const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from Angular app
app.use(express.static(path.join(__dirname, 'angular-app/dist/angular-app')));

// API route (optional, not needed for static page but good for MEAN structure)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MEAN Stack Server is running' });
});

// Serve Angular app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular-app/dist/angular-app/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

