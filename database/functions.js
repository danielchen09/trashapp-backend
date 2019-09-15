const mongoose = require('mongoose');

function addItemToUser(user, item){
  const UserModel = require('./User');
  UserModel.update({_id: user._id}, {$push: {items: item}}, (err, user) => {
    
  });
}
