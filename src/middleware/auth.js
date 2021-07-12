const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const { accessToken } = req.body;
  if (!accessToken) return res.status(403).json({ message: 'Can`t find token' });
  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    res.json(e.message);
  }
};

module.exports = verifyToken;
