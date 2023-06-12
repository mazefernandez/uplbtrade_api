'use strict'

const connection = require(__dirname + '/../db.js')

exports.addItemReport = (req,res) => {
	var item_report = {
		message : req.body.message,
		date : require('moment')().format('YYYY-MM-DD HH:mm:ss'),
		reporter_id : req.body.reporter_id,
		item_id : req.body.item_id
	}
	connection.query('INSERT INTO Item_Report SET ?', item_report, function(err, rows, fields){
		if (!err) {
			item_report.report_id = rows.insertId;
			res.send(item_report)
			console.log("Added item report")
		}
		else {
			res.send(err)
			console.log("Failed to retrieve item report " + err)
		}
	})
}

exports.getItemReports = (req,res) => {
	connection.query('SELECT * FROM Item_Report', [], function(err, rows, fields){
		if (!err) {
			res.send(rows)
			console.log("Retrieved item reports")
		}
		else {
			res.send(err)
			console.log("Error in retrieving item reports " + err)
		}
	})
}
