const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;