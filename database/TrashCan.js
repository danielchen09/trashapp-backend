const mongoose = require('mongoose');

const TrashCanSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  items:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  currentId: String
})

module.exports = mongoose.model('TrashCan', TrashCanSchema);
