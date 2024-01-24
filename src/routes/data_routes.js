
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];
        if(!token) return res.status(401).send('Access Denied');

        const { data } = await axios.get('http://auth-server/auth/verify', {
          headers: {
            authorization: `Bearer ${token}`,
            },
        });

        req.user = data;
        next();
  } catch (error) {
    res.status(401).send('Invalid Token');
  }
});

router.get('/secret-data', (req, res) => {
    if(req.user.role === 'admin') {
      res.json({ data: 'Secret data for admin!' });
    } else {
      res.json({ data: 'Secret data for user!' });
    }
});


/* router.get('/', (req, res) => {
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
}); */

module.exports = router;

