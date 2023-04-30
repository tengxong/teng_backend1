const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer');
const { log } = require('console');
const db = require ('../modules/db')

const storage = multer.diskStorage({
      destination: function(req,file,cb){
            cb(null,'images');
      },
      filename: function (req, file,cb){
            const ext =path.extname(file.originalname);
            const newFilename = Date.now() + ext;
            cb(null,newFilename);
            req.newFilename = newFilename;
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
            const sql = 'UPDATE Econox SET img = ? WHERE id = ?'
            const params = [req.newFilename, req.body?.id]
            const result = db.update(sql,params);
            res.send({
                  status:200,
                  mesg:'succuss',
                  data:{
                        img: req.newFilename
                  }
            });
            // res.send('Image uploaded:' + req.newFilename);
      } catch(error){
            console.error(error)
            res.status(500).send('internal Server Error');
      }
});

// app.post('/uploadProfileImage', (req,res) =>{
//       res.send('hello')
// })
module.exports = app;