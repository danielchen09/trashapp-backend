const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const uploadImage = require('./uploadImage');
const downloadImage = require('./downloadImage')

const port = process.env.PORT || 8080;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('test');
});

app.post('/testPost', (req, res) => {
  console.log(req.body);
});

app.post('/upload', (req, res) => {
  uploadImage(req, res)
})

app.post('/download', (req, res) => {
  downloadImage(req, res);
})

app.listen(port, () => console.log('server listening on port ' + port));
