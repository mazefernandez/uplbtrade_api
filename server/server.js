'use strict' 

const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const path = require('path')
const connection = require(__dirname + '/db.js')
const app = express()

app.use(express.static(__dirname + '/../client'))

var routes = require(__dirname + '/routes/routes.js')
app.use(bodyParser.json({limit:'10mb', extended:true}))
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/', routes)

app.get('/', (req, res) => {
	res.sendFile(path.resolve('index.html')) 
}) 

app.get('/*', (req, res) => {
	res.sendFile(path.resolve('index.html')) 
}) 

var port = process.env.PORT || 8000

app.listen(port, () => console.log('Server running on port ' + port))
