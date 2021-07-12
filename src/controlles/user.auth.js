const User = require('../models/user');

const registration = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ message: data });
  } catch (e) {
    console.log(e);
  }
};

const login = (req, res) => {
  try {
    res.status(200).json({ message: 'All work' });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  registration,
  login,
};
