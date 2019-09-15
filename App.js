const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const uploadImage = require('./uploadImage');
const downloadImage = require('./downloadImage');
const classifyImage = require('./classifyImage');

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

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('test');
});

app.post('/testPost', (req, res) => {
  console.log(req.body);
});

app.post('/upload', (req, res) => {
  uploadImage(req, res);
});

app.post('/download', (req, res) => {
  downloadImage(req, res);
});

app.post('/classify',(req,res) => {
  classifyImage(req,res, model);
});

app.listen(port, () => console.log('server listening on port ' + port));
