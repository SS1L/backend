const router = require('express').Router();

const UserAuth = require('../controlles/auth.controller');

router.get('/user', UserAuth.getUsers);
router.post('/reg', UserAuth.registration);
router.post('/login', UserAuth.login);

module.exports = router;
