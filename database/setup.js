const mongoose = require('mongoose');
const url = 'mongodb+srv://guest:guest@cluster0-5sqr5.mongodb.net/img?retryWrites=true&w=majority';
mongoose.connect(url);

const UserModel = require('./User');
const GroupModel = require('./Group');
const ItemModel = require('./Item');
const TrashCanModel = require('./TrashCan');

UserModel.create({
  username: "test",
  password: "test",
  name: "test",
  points: 0,
  groups: [],
  items: []
});

// const UserSchema = mongoose.Schema({
//   username: String,
//   password: String,
//   name: String,
//   points: Number,
//   groups: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Group'
//   }],
//   items: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Item'
//   }]
// });
