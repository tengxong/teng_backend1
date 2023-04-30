const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');
// const internal = require('stream');
// const { Server } = require('http');

const storage = multer.diskStorage({
      destination: function(req,file,cb){
            cb(null,'images');
      },
      filename: function (req, file,cb){
            const ext =path.extname(file.originalname);
            cb(null, Date.now() + ext);
      }
});


const upload = multer({storage});

// Serve image files
app.get('/images/:imageName', (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '..', 'images', imageName);
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/uploadProfileImage',upload.single('image'), (req,res) =>{
      try{
            res.send('Image uploaded');
      } catch(error){
            console.error(error)
            res.status(500).send('internal Server Error');
      }
});

module.exports = app;