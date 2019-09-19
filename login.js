const mongoose = require('mongoose');

const UserModel = require('./database/User');

module.exports = (req, res) => {
  UserModel.findOne({
    username: username,
    password: password
  }, (err, user) => {
    res.send({
      _id: user._id,
      name: user.name,
      usernmae: user.username,
      points: user.points
    })
  })
}
