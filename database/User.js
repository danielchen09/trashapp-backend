const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  points: Number,
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }],
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

module.exports = mongoose.model('User', UserSchema);
