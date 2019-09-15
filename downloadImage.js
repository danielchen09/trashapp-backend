const MongoClient = require('mongodb');
const url = 'mongodb+srv://guest:guest@cluster0-5sqr5.mongodb.net/img?retryWrites=true&w=majority';

module.exports = (req, res) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db('img');
    db.collection('test.files').find({_id: MongoClient.ObjectId('5d7d8f885d8ccb453869317d')}).toArray((err, file) => {
      db.collection('test.chunks').find({files_id: file[0]._id}).sort({n: 1}).toArray((err, chunks) => {
        let fileData = [];

        for(let chunk of chunks){
          fileData.push(chunk.data.toString('base64'));
        }

        console.log(fileData.join(''));
        res.send(fileData.join(''));
      })
    })
  })
}
