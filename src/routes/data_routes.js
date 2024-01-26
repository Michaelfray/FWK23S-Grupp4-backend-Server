const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const fs = require('fs');
env.config();

const router = express.Router();
const userDataPath = `${__dirname}/../user.json`; // går in i rätt mapp user.json
const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8')); // läser av user.json via path ovanför
const SECRET_KEY = process.env.SECRET_KEY || 'yourFallbackSecretKey'; // använder SECRET_KEY som lagras i env annars en default key att luta sig mot.

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');  // Replace with your frontend origin
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

//get-request för att verifiera rätt användare som sedan kollar token och du får tillgång till din role för anpassad data.
//fetchas från frontend till backend när du är inloggad för att fetcha data beroende på role.
router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, SECRET_KEY);

    // Fetcha users beroende på userID och username
    const user = userData.users.find(u => u.id === verified.userId || u.username === verified.username);

    //Om ingen användare skicka felkod 401, med invalid token
    if (!user) {
      return res.status(401).send('Invalid Token');
    }
    // access user role och anpassa info för vilken användares response.
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
