'use strict' 

const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const path = require('path')

const connection = require(__dirname + '/db.js')
const app = express()

app.use(express.static(path.join(__dirname + '/../client')))

var routes = require(__dirname + '/routes/routes.js')
app.use(bodyParser.json({limit:'10mb', extended:true}))
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/', routes)

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/../client/index.html')) 
})

app.get('/angular.min.js', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/../node_modules/angular/angular.js'))
})
app.get('/angular-route.min.js', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/../node_modules/angular-route/angular-route.js'))
})

// set timezone
process.env.TZ = 'Asia/Manila'

var port = process.env.PORT || 8000

app.listen(port, () => console.log('Server running on port ' + port))

