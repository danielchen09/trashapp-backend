const multer = require('multer');
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
  upload = multer({storage: storage}).any();
});

module.exports = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.body);
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err)
    } else if (err) {
      console.log(err);
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  });
}
