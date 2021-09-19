'use strict' 

import express from 'express'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connection = import(__dirname + '/db.js')
const app = express()

app.use(express.static(join(__dirname + '/../client')))

import routes from './routes/routes.js'

app.use(express.json({limit:'10mb', extended:true}))
app.use(express.urlencoded({ extended: true}))

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

