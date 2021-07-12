const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
}, {
  timestamps: false,
});

module.exports = mongoose.model('User', userSchema);
