const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkedUser = await User.findOne({ email });
    if (checkedUser) {
      return res.status(400).json({ message: 'User already exit' });
    }

    const encryptPassword = await bcrypt.hash(password, parseInt(process.env.SALT, 10));
    const user = await User.create({
      email,
      password: encryptPassword,
    });
    res.status(201).json({
      message: 'User has created',
      data: user,
    });
  } catch (e) {
    console.log(e);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const encryptPassword = await bcrypt.compare(password, user.password);
    if (!encryptPassword) {
      return res.status(400).json({ message: 'Something wrong' });
    }

    const payload = { email };
    const accessToken = jwt.sign(
      { payload }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      },
    );

    const refreshToken = jwt.sign(
      { payload }, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
      },
    );

    await User.updateOne(user, { refreshToken });

    res.status(200).json({ access: accessToken });
  } catch (e) {
    console.log(e);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  registration,
  login,
  getUsers,
};
