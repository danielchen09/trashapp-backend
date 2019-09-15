const mongoose = require('mongoose');
const url = 'mongodb+srv://guest:guest@cluster0-5sqr5.mongodb.net/img?retryWrites=true&w=majority';
mongoose.connect(url);

const UserModel = require('./User');
const GroupModel = require('./Group');
const ItemModel = require('./Item');
const TrashCanModel = require('./TrashCan');

function createUser(){
  UserModel.create({
    username: "test",
    password: "test",
    name: "test",
    points: 0,
    groups: [],
    items: []
  });
}

function createGroup(){
  GroupModel.create({
    name: "test",
    users: []
  });
}
