const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS for Angular frontend
app.use(cors());

// Pre-defined user profiles data
const userProfiles = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software engineer with 5 years of experience in web development.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    bio: 'Full-stack developer passionate about creating user-friendly applications.'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    bio: 'Frontend specialist focused on modern JavaScript frameworks and responsive design.'
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    bio: 'Backend developer with expertise in Node.js and database optimization.'
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    bio: 'DevOps engineer ensuring smooth deployments and system reliability.'
  }
];

// API endpoint to get all user profiles
app.get('/api/users', (req, res) => {
  res.json(userProfiles);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

