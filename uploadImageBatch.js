const multer = require('multer');
const {addItemsToTrashCan} = require('./database/functions');
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
  upload = multer({storage: storage}).array('file', 30);
});

module.exports = (req, res) => {
  upload(req, res, (err) => {
    addItemsToTrashCan(req.body.code, req.files, JSON.parse(req.body.stats)).then((newCode) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err)
      }
      return res.status(200).send(newCode);
    })
  });
}
