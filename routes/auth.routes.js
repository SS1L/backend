const router = require('express').Router();
const UserAuth = require('../controlles/user.auth');

router.post('/reg', UserAuth.user);
// router.post('/log', UserAuth.postLogin);

module.exports = router;
