const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  category: String,
  fileId: mongoose.Schema.Types.ObjectId,
  code: String,
});

module.exports = mongoose.model('Item', ItemSchema);
