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

function createTrashCan(){
  TrashCanModel.create({
    latitude: 0,
    longitude: 0,
    items: [],
    currentId: "ABCDE",
  });
}

function createItem(){
  ItemModel.create({
    category: "Test",
    probability: 1,
    fieldId: null,
    code: null
  })
}

TrashCanModel.updateOne({currentId: "ABCDE"}, {currentId: "ABBBB"}, (err, trashCan) => {
  console.log(trashCan);
})
