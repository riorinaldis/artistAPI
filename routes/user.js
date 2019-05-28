const express = require('express')
const mysql = require('mysql')
const router = express.Router()

module.exports = router

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'ba013bd94f44e2',
    password: '93d2ee82',
    database: 'heroku_0c7d50678939a26' 
})

function getConnection(){
    return pool
    }

router.get("/actors", (req, res) => {
    
    const connection = getConnection()
    const queryString = "SELECT * FROM users"

    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Gagal melakukan query" +err)
            res.sendStatus(500)
            return
        }
        res.json({"actors": rows})
        
    })
})

router.get('/user/:id', (req, res) => {

    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"

    connection.query(queryString, [userId], (err, rows, fields) => {
        if(err){
            console.log("failed to query for user: " + err)
            res.sendStatus(500)
            return
        }
        console.log("users successfull")
        const users = rows.map((row) => {

            return [{firstName: row.first_name, lastName: row.last_name}]
        })
        res.json(users)
    })
})


router.post('/user_create', (req, res, err) => {
    console.log("Mencoba menambahkan artis")
    console.log("Apakah anda akan menambahkan artis?")
    console.log("Name: " + req.body.create_name)

    const artistName = req.body.create_name
    const artistCountry = req.body.create_country
    const artistImage = req.body.create_image
    const artistChildren = req.body.create_children
    const artistDob = req.body.create_dob
    const artistDescription = req.body.create_description
    const artistSpouse = req.body.create_spouse
    const artistHeight = req.body.create_height

    const queryString = "INSERT INTO users (name, country, image, children, dob, description, spouse, height) VALUES (?, ?, ?, ?, ?, ?,?,?) "
    getConnection().query(queryString, [artistName, artistCountry, artistImage, artistChildren, artistDob, artistDescription, artistSpouse, artistHeight], (err, results, fields) => {
        if (err) {
            console.log("Gagal Menambahkan User: " +err)
            res.sendStatus(500)
            return
        }
        console.log("Menambahkan user dengan ID: ", results.insertedId);
        res.end()
    })
})


router.get('/messages', (req, res) => {
    console.log("Route Message")
    res.end()
})


