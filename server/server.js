'use strict' 

const express = require('express')
const mysql = require('mysql')
const path = require('path')
const connection = require(__dirname + '/db.js')
const app = express()

app.get('/', (req, res) => {
	res.send('HELLO!') 
}) 

var port = process.env.PORT || 8000

app.listen(port, () => console.log('Server running on port ' + port))
