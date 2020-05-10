const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/userModel');

async function userLogin(req, res, next) {
  try {
    const data = req.body;
    const user = await User.findOne({username: data.username});

    if(!!user) {
      if(await bcrypt.compare(data.password, user.password)) {
        const userToken = {
          id: user._id,
          name: user.name,
          username: user.username,
        }

        const token = jwt.sign({ userToken }, config.SECRET, { expiresIn: '86400s' });
        res.status(200).json({
          message: 'Login berhasil',
          token,
        })
      } else {
        res.send(404).json({message: 'login gagal'})
      }
    } else {
      res.send(404).json({message: 'login gagal'})
    }
  } catch(err) {
    res.status(500).json({message: err})
  }
}

async function userRegister(req, res, next) {
  try {
    const data = req.body;

    const user = await User.findOne({username: data.username});

    if(!!user) {
      res.status(404).json({message: 'username is taken'});
    } else {
      const newUser = new User({
        name: data.name,
        username: data.username,
        email: data.email,
        password: bcrypt.hashSync(data.password, 12),
      });

      const savedUser = await newUser.save();

      const userToken = {
        id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
      }

      const token = jwt.sign({ userToken }, config.SECRET, { expiresIn: '86400s' });
      res.status(200).json({ message: 'new user created', token });
    }
  } catch(err) {
    res.status(500).json({ message: 'error server' })
  }
}

exports.userLogin = userLogin;
exports.userRegister = userRegister;