const express = require('express')
const app = express()
const db = require('../modules/db.js')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/projects',async(req,res) => {
  const query = 'SELECT id, projectName,projectDescription,projectImg FROM projects'
  const result = await db.fetch (query,[])
  res.send(result)

})



module.exports=app