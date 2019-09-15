const mongoose = require('mongoose');

const UserModel = require('./User');
const GroupModel = require('./Group');
const ItemModel = require('./Item');
const TrashCanModel = require('./TrashCan');

// UserModel.create({
//   username: "test",
//   password: "test",
//   name: "test",
// })


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
