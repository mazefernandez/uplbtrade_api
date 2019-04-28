'use strict'

var mysql = require('mysql')
var connection = require(__dirname + '/../db.js')

exports.addCustomer_Report = (req, res) => {
	var customer_report = {
		message : req.body.message, 
		date : req.body.date,
		reporter_id : req.body.reporter_id,
		customer_id : req.body.customer_id
	}
	connection.query('INSERT INTO Customer_Report SET ?', customer_report, function(err, rows, fields) {
		if (!err) {
			customer_report.report_id = rows.insertId;
			res.send(customer_report)
			console.log("Retrieved customer report")
		}	
		else {
			res.send(err)
			console.log("Error in retrieving customer report" + err)
		}
	})
}

exports.getCustomerReports = (req, res) => {
	connection.query('SELECT * FROM Customer_Report', [], function(err, rows, fields) {
		if (!err) {
			res.send(rows); 
			console.log("Retrieved customer reports")
		} 
		else {
			res.send(err); 
			console.log("Error in retrieving customer reports" + err)
		}
	})
}
