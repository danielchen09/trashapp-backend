const MongoClient = require('mongodb');
const url = 'mongodb+srv://guest:guest@cluster0-5sqr5.mongodb.net/img?retryWrites=true&w=majority';

function download(db, items, files, res, index=0){
  db.collection('items').find({_id: MongoClient.ObjectId(items[index])}).toArray((err, item) => {

    db.collection('test.files').find({_id: item[0].fileId}).toArray((err, file) => {
      db.collection('test.chunks').find({files_id: file[0]._id}).sort({n: 1}).toArray((err, chunks) => {
        console.log(file[0]._id);
        let fileData = [];

        for(let chunk of chunks){
          fileData.push(chunk.data.toString('base64'));
        }

        console.log(fileData.join(''))
        files.push(fileData.join(''));

        if(index+1 < items.length){
          download(db, items, files, res, index+1);
        }else{
          res.send(files)
        }
      })
    })
  })
}

module.exports = (req, res) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db('img');
    db.collection('users').find({_id: MongoClient.ObjectId(req.body._id)}).toArray((err, user) => {
      download(db, user[0].items, [], res);
    })
  })
}
