const express = require('express')
const app = express()
const db = require('../modules/db.js')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/stories',async(req,res) => {
  const query = 'SELECT id, storyName,storyDesscription,storyImg,storyStartedYear FROM stories'
  const result = await db.fetch (query,[])
  res.send(result)

})



module.exports=app