const mongoose = require('mongoose');

function addItemToUser(userId, fileId, stats){
  return new Promise((resolve, reject) => {
    const category = stats.category;
    const probability = stats.probability;
    const UserModel = require('./User');
    const ItemModel = require('./Item');
    console.log(userId);

    ItemModel.create({
      category: category,
      probability: probability,
      fileId: mongoose.Types.ObjectId(fileId),
      code: null,
    }, (err, item) => {
      UserModel.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(userId)
      }, {
        $push: {items: item}
      }, (err, user) => {
        resolve(user.items);
      })
    })
  })
}

function addItemsToTrashCan(code, files, stats){
  return new Promise((resolve, reject) => {
    const TrashCanModel = require('./TrashCan');
    const ItemModel = require('./Item');

    let newCode = makeid(5);
    TrashCanModel.updateOne({
      currentId: code
    }, {
      currentId: newCode
    }, (err, trashCan) => {
      _addItemsToTrashCan(files, stats, code, newCode, resolve, TrashCanModel, ItemModel);
    })
  })
}

function _addItemsToTrashCan(files, stats, code, newCode, resolve, TrashCanModel, ItemModel, index=0){
  ItemModel.create({
    category: stats[index].category,
    probability: stats[index].probability,
    fileId: files[index].id,
    code: code,
  }, (err, item) => {
    TrashCanModel.updateOne({
      currentId: newCode
    }, {
      $push: {items: item}
    }, (err, trashCan) => {
      if(err)
      console.log(err);
      console.log(newCode);
      if(index+1 < files.length){
        _addItemsToTrashCan(files, stats, code, newCode, resolve, TrashCanModel, ItemModel, index+1);
      }else{
        resolve(newCode);
      }
    })
  })
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports = {
  addItemToUser,
  addItemsToTrashCan,
}
