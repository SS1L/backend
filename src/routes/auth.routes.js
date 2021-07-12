const router = require('express').Router();

const UserAuth = require('../controlles/user.auth');

router.post('/reg', UserAuth.registration);
router.post('/login', UserAuth.login);

module.exports = router;
