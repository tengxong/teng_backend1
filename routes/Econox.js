const express = require('express')
const app = express()
const db = require('../modules/db.js')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    const query = 'SELECT id, firstname, lastname, email, img FROM Econox WHERE id = ? '
    const result = await db.fetch(query, [id])
    res.send(result)

})
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { email, password, username, firstname, lastname } = req.body
        const query = 'UPDATE Econox SET (email,password,username,firstname,lastname) WHERE (?,?,?,?,?)'
        const params = [email, password, username, firstname, lastname]
        const result = await db.update(query, params)
        res.send(result)
    } catch(e){
        console.log(e)
    }


})


module.exports = app