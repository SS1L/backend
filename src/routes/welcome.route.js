const router = require('express').Router();
const welcome = require('../controlles/welcome.controller');
const verifyToken = require('../middleware/auth');

router.get('/welcome', verifyToken, welcome.welcome);

module.exports = router;
