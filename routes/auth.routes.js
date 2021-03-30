const express = require('express');
const router = express.Router();
const UserAuth = require('../controlles/user.auth');
const SearchBook = require('../controlles/search')
const { verify } = require('../middleware/jwt');

router.post('/reg', UserAuth.postAuth);
router.post('/log', UserAuth.postLogin);
router.get('/book', SearchBook.searchBook);

module.exports = router;