const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/nti', (req, res) => {
  res.send('Welcome to the NTI page!');
});

app.get('/aboutcompany', (req, res) => {
  res.sendFile(path.join(__dirname, '/aboutcompany.html'));
});

const PORT = process.env.PORT || 4784;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});