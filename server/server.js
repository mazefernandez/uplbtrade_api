'use strict' 

import express, { static } from 'express'
import mysql from 'mysql'
import { json, urlencoded } from 'body-parser'
import { join, resolve } from 'path'
const connection = require(__dirname + '/db.js')
const app = express()

app.use(static(join(__dirname + '/../client')))

var routes = require(__dirname + '/routes/routes.js')
app.use(json({limit:'10mb', extended:true}))
app.use(urlencoded({ extended: true}))

app.use('/', routes)

app.get('/', (req, res) => {
	res.sendFile(resolve(__dirname + '/../client/index.html')) 
})

app.get('/angular.min.js', (req, res) => {
	res.sendFile(resolve(__dirname + '/../node_modules/angular/angular.js'))
})
app.get('/angular-route.min.js', (req, res) => {
	res.sendFile(resolve(__dirname + '/../node_modules/angular-route/angular-route.js'))
})

// set timezone
process.env.TZ = 'Asia/Manila'

var port = process.env.PORT || 8000

app.listen(port, () => console.log('Server running on port ' + port))
