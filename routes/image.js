const express = require('express')
const app = express()
app.get ('/images/:imageName',(req,res) =>{
      try {
      const{imageName} = req.params
      res.sendFile(imageName,{root:'./images'})
      } catch(e){
            console.log(e)
      }
})
module.exports=app