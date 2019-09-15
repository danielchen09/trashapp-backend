const mongoose = require('mongoose');

const UserModel = require('./database/User');

module.exports = (req, res) => {
  UserModel.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    points: 0,
    groups: [],
    items: []
  }, (err, user) => {
    res.send({
      _id: user._id,
      name: user.name,
      usernmae: user.username,
      points: user.points
    })
  });
}
