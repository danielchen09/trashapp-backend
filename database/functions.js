const mongoose = require('mongoose');

function addItemToUser(userId, fileId, category, probability){
  return new Promise((resolve, reject) => {
    const UserModel = require('./User');
    const ItemModel = require('./Item');

    ItemModel.create({
      category: category,
      probability: probability,
      fileId: mongoose.Schema.Types.ObjectId(fileId),
      code: null,
    }, (err, item) => {
      UserModel.update({
        _id: mongoose.Schema.Types.ObjectId(userId)
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

    TrashCanModel.update({
      currentId: code
    }, {
      currentId: makeid(5)
    }, (err, trashCan) => {
      _addItemsToTrashCan(files, stats, code, TrashCanModel, ItemModel);
    })

  })
}

function _addItemsToTrashCan(files, stats, code, TrashCanModel, ItemModel, index=0){
  ItemModel.create({
    category: stats[index].category,
    probability: stats[index].probability,
    fileId: files[index],
    code: code,
  }, (err, item) => {
    if(index+1 < files.length){
      _addItemsToTrashCan(files, stats, code, TrashCanModel, ItemModel, index+1);
    }
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
}
