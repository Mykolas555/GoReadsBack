const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const app = express();
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(morgan('dev'));

// Cors
app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true
}));

// Routes
const readRoutes = require('./routes/readRoutes');
app.use('/api/reads', readRoutes);

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true }
}));

// Google auth
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

const findOrCreateUser = require('./controllers/userContorller').findOrCreateUser;

app.get('/auth/google/callback',

  passport.authenticate('google', { failureRedirect: process.env.FRONT_END_URL }),

  async (req, res) => {
    try {
      const userID = req.user.id;
      const userData = {
        name: req.user.name.givenName,
        lastName: req.user.name.familyName,
        email: req.user.emails[0].value
      };
      await findOrCreateUser(userID, userData);

      const token = jwt.sign(
        { id: req.user.id, name: req.user.name.givenName, tokenGo: req.user.accessToken },
        process.env.JWT_SECRET
      );

      // Set the cookies before redirecting with secure attributes
      res
      .cookie('Token', token, { httpOnly: true, secure: true, domain: process.env.FRONT_END_URL , sameSite: 'None' })
      .cookie('ID', req.user.id, { httpOnly: true, secure: true, domain: process.env.FRONT_END_URL, sameSite: 'None' })
      .cookie('User', req.user.name.givenName, { httpOnly: true, secure: true, domain: process.env.FRONT_END_URL, sameSite: 'None' })
      //.redirect(process.env.FRONT_END_URL);

      console.log("User logged in with Google");
    } catch (error) {
      console.error("Error during Google authentication callback:", error);
      res.redirect(process.env.FRONT_END_URL);
    }
  }
);



app.get('/auth/logout', (req, res) => {
  res.clearCookie('Token');
  res.clearCookie('ID');
  res.clearCookie('User');
  req.logout(err => {
    if (err) {
      console.error('Logout error:', err);
      res.redirect(process.env.FRONT_END_URL);
    } else {
      res.redirect(process.env.FRONT_END_URL);
    }
  });
});

app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = app;