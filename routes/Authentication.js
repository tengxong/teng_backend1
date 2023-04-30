const express = require('express')
const app = express()
const db = require('../modules/db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv")


dotenv.config()

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
    // origin: 'https://teng-front-end.vercel.app',
    origin: 'http://localhost:5173',
    credentials: true
}))

app.post('/register', async (req, res) => {
    const { email, password, username, firstname, lastname, con_password } = req.body

    const checkExistUserQuary = "SELECT id FROM Econox WHERE email=?"
    const checkParams = [email]

    const chekExist = await db.fetch(checkExistUserQuary, checkParams)
    if (chekExist.length
        > 0) {
        res.send('Register fail,email exist')
    } else {
        const encryptPass = await bcrypt.hash(String(password), 10)
        const createUserQuery = 'INSERT INTO Econox(email,password,username,firstname,lastname) VALUES (?,?,?,?,?)'
        const params = [email, encryptPass, username, firstname, lastname]
        const result = await db.update(createUserQuery, params)
        res.send(result)

    }
}

)
app.post('/Login', async (req, res) => {
    const { email, password } = req.body
    const checkExistUserQuary = "SELECT id, password FROM Econox WHERE email=?"
    const params = [email]
    const Econox = await db.fetch(checkExistUserQuary, params)

    if (Econox.length > 0) {
        const comparePassword = await bcrypt.compare(String(password), Econox[0].password)

        if (comparePassword) {

            let payload = {
                id: Econox[0].id

            }

            let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                // maxAge: 360000 //th
            })

            const userInfoSql ='SELECT id, username ,img FROM Econox WHERE id =?'
            const userInparams = [Econox[0].id]
            const userInfo = await db.fetch(userInfoSql,userInparams)
            res.send(
                {
                    status: 200,
                    msg: 'Login success',
                    data: userInfo[0]
                })
        } else {
            res.send({
                status: 409,
                msg: 'wrong password'
            })
        }
    } else {
        res.send({
            status: 404,
            msg: 'User does not exist'
        })
    }
})
app.post('/refresh', async (req, res) => {
    try {
        const { token } = req.cookies
        const userVerify = await jwt.verify(token, process.env.SECRET_KEY)
        if (userVerify.id) {
            const userInfoSql ='SELECT id, username ,img FROM Econox WHERE id =?'
            const userInparams = [userVerify.id]
            const userInfo = await db.fetch(userInfoSql,userInparams)
            res.send({
                status: 200,
                msg: 'token is valid',
                data:userInfo[0]
            })
        } else {
            res.send({
                status: 400,
                msg: 'token is invalid'
            })
        }
    } catch (e) {
        res.send(e)
    }

})

module.exports=app