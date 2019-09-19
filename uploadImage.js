const multer = require('multer');
const {addItemToUser} = require('./database/functions');
const storage = require('multer-gridfs-storage')({
   url: 'mongodb+srv://guest:guest@cluster0-5sqr5.mongodb.net/img?retryWrites=true&w=majority',
   file: (req, file) => {
     console.log(file);
     return {
       bucketName: 'test',
       filename: file.originalname
     }
   }
});

let upload = null;
storage.on('connection', (db) => {
  console.log('connected');
  upload = multer({storage: storage}).single('file');
});

module.exports = (req, res) => {
  upload(req, res, (err) => {
    addItemToUser(req.body._id, req.file.id, JSON.parse(req.body.stats)).then((items) => {
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      res.status(200).json(items);
    })
  })
}
