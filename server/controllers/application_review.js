'use strict'

const mysql = require('mysql')
const connection = require(__dirname + '/../db.js')

exports.getApplicationReviews = (req,res) => {
    connection.query('SELECT * FROM Application_Review', [], function(err, rows, fields) {
		if (!err) {
		    res.send(rows)
		    console.log("Retrieved all application reviews")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving all application reviews " + err) 
		}
    })
}

exports.getApplicationReview = (req,res) => {
    connection.query('SELECT * FROM Application_Review where review_id =?', [req.params.id], function(err, rows, fields) {
    	if (!err) {
		    res.send(rows[0])
		    console.log("Retrieved application review")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving application review " + err)
		}
    })
}

exports.deleteApplicationReview = (req, res) => {
	connection.query('DELETE FROM Application_Review where review_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(null)
			console.log("Deleted application review")
		}
		else {
			res.send(err)
			console.log("Error in deleting application review " + err)
		}
	})
}

