const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const uploadImageBatch = require('./uploadImageBatch');
const uploadImage = require('./uploadImage');
const downloadImage = require('./downloadImage')

const port = process.env.PORT || 8080;
const app = express();

const mongoose = require('mongoose');
const url = 'mongodb+srv://guest:guest@cluster0-5sqr5.mongodb.net/img?retryWrites=true&w=majority';
mongoose.connect(url);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('test');
});

app.post('/testPost', (req, res) => {
  console.log(req.body);
});

app.post('/uploadbatch', (req, res) => {
  uploadImageBatch(req, res);
})

app.post('/upload', (req, res) => {
  uploadImage(req, res);
})

app.post('/getLog', (req, res) => {
  console.log(req);
  res.send(req.body);
})

app.post('/download', (req, res) => {
  downloadImage(req, res);
})

app.listen(port, () => console.log('server listening on port ' + port));
