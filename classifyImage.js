const Jimp = require('jimp')
const multer = require('multer');
const tf = require('@tensorflow/tfjs')
// Load the binding (CPU computation)
// require('@tensorflow/tfjs-node')


const storage = multer.memoryStorage();
var upload = multer({storage: storage}).single('file')

const labels = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']


module.exports = (req,res, model) => {
    upload(req,res, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err)
        }
        buffer = req.file.buffer;
        Jimp.read(buffer)
            .then(image => {
                image = image.resize(224,224)
                let array = []
                for(let i = 0; i < image.bitmap.height; i++){
                    let row = [];
                    for(let j = 0; j < image.bitmap.width; j++){
                        let values = Jimp.intToRGBA(image.getPixelColor(i,j))
                        let norm = 255;
                        let pixel = [values.r / norm ,values.g / norm ,values.b / norm ];
                        row.push(pixel);
                    }
                    array.push(row)
                }
                tensor = tf.tensor3d(array).expandDims()
                outputTensor = model.predict(tensor).data()
                    .then(probs => {
                        let maxIndex = 0;
                        let maxProb = 0;
                        for(let i = 0; i < probs.length;i++){
                            if (probs[i] > maxProb){
                                maxIndex = i;
                                maxProb = probs[i];
                            }
                        }
                        let label = labels[maxIndex];
                        return res.send({'category': label, 'probability': maxProb})

                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    });
}
