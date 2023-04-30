const express = require('express')
const app = express()
const port = 3060
// const mysql = require('mysql')
const Auth = require('./routes/Authentication')
const Project = require('./routes/Projects')
const Image = require('./routes/image')
const Stories = require('./routes/Stories')
const Econox = require('./routes/Econox')


app.use(Auth)
app.use(Project)
app.use(Image)
app.use(Stories)
app.use(Econox)


app.get('/', (req, res) => {
    res.send('Hello Econox Api')
})

app.listen(port)