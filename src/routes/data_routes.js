
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'secretKey');
    if (verified.role === 'admin') {
      res.json({ data: 'Secret data for admin!' });
    } else {
      res.json({ data: 'Secret data for user!' });
    }
  } catch {
    res.status(401).send('Invalid Token');
  }
});

module.exports = router;

