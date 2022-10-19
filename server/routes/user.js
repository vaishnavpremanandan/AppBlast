const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const wrapAsync = require('../utils/wrapAsync');
const { validateUser } = require('../middleware');
const passport = require('passport');

// Register user route

router.post('/signup', validateUser, wrapAsync(user.registerUser));

// Login user route

router.post('/login', wrapAsync(user.loginUser));

// Protected route ( not used )

router.get('/protected', passport.authenticate('jwt', {session: false}), user.authenticateUser);

module.exports = router;