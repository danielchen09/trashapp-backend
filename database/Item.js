const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  category: String,
  probability: Number,
  fileId: mongoose.Schema.Types.ObjectId,
  code: String,
});

module.exports = mongoose.model('Item', ItemSchema);
