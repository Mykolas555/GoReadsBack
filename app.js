const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const app = express();

// Env
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(morgan('dev'));

// Cors
app.use(cors({
  origin: process.env.FRONT_END_URL, // Replace with your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true } // Set secure to true in production
}));


// Routes
const readRoutes = require('./routes/readRoutes');
app.use('/api/reads', readRoutes);


const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);



module.exports = app;