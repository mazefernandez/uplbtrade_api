'use strict'
const mysql = require('mysql')

const connection = mysql.createConnection({
   host : 'uplbtrade.cmou0pg51tob.ap-southeast-1.rds.amazonaws.com',
   user : 'mazefernandez',
   password : 'petrichor11',
   db : 'uplbtrade',
   port : '3306',
   timezone: '+08:00',
})

connection.connect((err) => {
   if (!err) {
       console.log("Database connected")
   } else {
       console.log("Error in connection to database " + err)
   }
})

connection.query('USE uplbtrade')
module.exports = connection;
