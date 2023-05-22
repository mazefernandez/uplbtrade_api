'use strict'
const mysql = require('mysql')

const connection = mysql.createConnection({
   host : 'localhost',
   user : 'root',
   password : 'E-Commerce$4',
   db : 'uplbtrade',
   port: 3306,
   timezone: '+08:00',
   multipleStatements: true
})

connection.connect((err) => {
   if (!err) {
       console.log("Database connected")
   } else {
       console.log("Error in connection to database " + err)
   }
})

connection.query('USE uplbtrade')
module.exports = connection
