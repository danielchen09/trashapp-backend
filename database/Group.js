const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
  name: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Group', GroupSchema);
