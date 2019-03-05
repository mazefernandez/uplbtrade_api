'use strict' 

const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const path = require('path')
const connection = require(__dirname + '/db.js')
const app = express()

var routes = require(__dirname + '/routes/routes.js')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/', routes)

app.get('/', (req, res) => {
	res.send('HELLO!') 
}) 

var port = process.env.PORT || 8000

app.listen(port, () => console.log('Server running on port ' + port))
