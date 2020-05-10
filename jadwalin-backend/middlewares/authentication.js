const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config');

async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if(!!token) {
    try {
      const decoded = await jwt.verify(token.split(" ")[1], config.SECRET);
      const id = decoded.userToken.id;
      const user = await User.findById(id).exec();
      if(!!user) next()
      else res.status(401).json({message: 'token not valid'});
    } catch (err) {
      res.status(401).json({message: 'token not valid'});
    };
  } else {
    res.status(401).json({message: 'token not valid'});
  };
};

exports.verifyToken = verifyToken;