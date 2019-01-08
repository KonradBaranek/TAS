const router = require('express').Router()
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'WORK_HARD',
    userProperty: 'payload'
  });

const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
module.exports = router;