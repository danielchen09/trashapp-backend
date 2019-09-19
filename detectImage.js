const Jimp = require('jimp')
const multer = require('multer');
const tf = require('@tensorflow/tfjs')
const short = require('short-uuid')

const storage = multer.memoryStorage();
var upload = multer({storage: storage}).single('file')

//Detection happens here!
module.exports = (req,res) => {
    upload(req,res, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err)
        }

        buffer = req.file.buffer;
        let name = short.generate()

        // write the buffer for the python program
        Jimp.read(buffer)
            .then(image => {
                image.write(name+'.jpg')
            }).then(() => {
                let spawn = require('child_process').spawn;

                let process = spawn('python', ['./detectImage.py',name])

                process.stdout.on('data', function(data) { 
                    data = JSON.parse(data.toString())
                    returnData = {'objects':[]};
                    for(let o of data['objects']){
                        d = {};
                        d['category'] = data['name'];
                        d['probability'] = data['percentage_probability'];
                        d['points'] = data['box_points'];
                        returnData.push(d);
                    }
                    res.send(returnData); 
                }); 
            });

        /*
        Jimp.read(buffer)
            .then(image => {
               
            })
            .catch(err => {
                console.log(err);
            });*/
    });
}
