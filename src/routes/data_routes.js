const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const fs = require('fs');
env.config();

const router = express.Router();
const userDataPath = `${__dirname}/../user.json`;
const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
const SECRET_KEY = process.env.SECRET_KEY || 'yourFallbackSecretKey'; // use process.env.SECRET_KEY if available, fallback to a default key

router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, SECRET_KEY);

    // Fetch user information from user.json based on the userId or username in the token
    const user = userData.users.find(u => u.id === verified.userId || u.username === verified.username);

    if (!user) {
      return res.status(401).send('Invalid Token');
    }

    // Now you can access the user's role and customize your response
    if (user.role === 'admin') {
      res.json({ data: 'Secret data for admin!' });
    } else {
      res.json({ data: 'Secret data for user!' });
    }
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).send('Invalid Token');
  }
});

module.exports = router;
