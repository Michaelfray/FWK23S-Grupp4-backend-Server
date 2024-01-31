
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dataRoutes = require('./routes/data_routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());;
app.use(helmet()); 
app.use(bodyParser.json());
app.use('/data', dataRoutes);

module.exports = app;

