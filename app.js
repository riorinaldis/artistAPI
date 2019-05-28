const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

const router = require('./routes/user.js')

app.use(router)

app.get("/", (req, res) => {
    console.log("Responding to root route ")
    res.send("Hello from Root")
})

const PORT = process.env.PORT || 3003

// localhost PORT
app.listen(PORT, () => {
    console.log("server is up listenning on" + PORT)
})
