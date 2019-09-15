const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  category: String,
  fileId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Item', ItemSchema);
