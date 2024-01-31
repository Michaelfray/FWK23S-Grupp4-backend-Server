const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const path = require('path');
const fs = require('fs');
env.config();

const router = express.Router();

const userFilePath = path.join(__dirname, '../../../user.json');
const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const SECRET_KEY = process.env.SECRET_KEY || 'yourFallbackSecretKey';

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

//Verifiera användare och skicka ut rätt känslig data information beroende på role på användaren.
router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || process.env.TOKEN_ENV;

  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, SECRET_KEY);

    // Fetcha användaren och jämför username
    const user = userData.users.find(u => u.username === verified.username);

    // Om ingen användare finns skriv ut felkod.
    if (!user) {
      return res.status(401).send('Invalid Token');
    }

    //Condition för att kolla role på användaren
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
