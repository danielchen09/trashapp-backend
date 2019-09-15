const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  category: Sting,
  fileId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Item', ItemSchema);
