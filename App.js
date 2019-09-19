const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const uploadImageBatch = require('./uploadImageBatch');
const uploadImage = require('./uploadImage');
const downloadImage = require('./downloadImage');
const classifyImage = require('./classifyImage');
const detectImage = require('./detectImage');

const register = require('./register');
const login = require('./login');

const tf = require('@tensorflow/tfjs')
// Load the binding (CPU computation)
require('@tensorflow/tfjs-node')

// Load the Tensorflow model
async function load_model(){
  try{
  //return await tf.loadLayersModel('./trashModel/my_tfjs_model');
  model = await tf.loadLayersModel('file://./trashModel/my_tfjs_model/model.json');
  return model;
}
  catch(err){
    console.log(err)
  }

}
let model = null;
try{
  model = load_model();
}catch(err){
  console.log(err)
}



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
});

app.post('/upload', (req, res) => {
  uploadImage(req, res);
});

app.post('/getLog', (req, res) => {
  console.log(req);
  res.send(req.body);
});

app.post('/download', (req, res) => {
  downloadImage(req, res);
});

app.post('/classify',(req,res) => {
  classifyImage(req,res, model);
});


app.post('/detect', (req,res) =>{
  detectImage(req,res);
});

app.post('/signup', (req, res) => {
  register(req, res);
})

app.post('/signin', (req, res) => {
  login(req, res);
})


app.listen(port, () => console.log('server listening on port ' + port));
