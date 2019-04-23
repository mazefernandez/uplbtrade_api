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

exports.getRating = (req, res) => {
	connection.query('SELECT AVG(rating) FROM Application_Review', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(rows[0])
			console.log("Retrieved average application rating")
		}
		else {
			res.send(err)
			console.log("Error in retrieving application rating " + err)
		}
	})
}

exports.addApplicationReview = (req, res) => {
	var app_review = {
		rating : req.body.rating,
		review : req.body.review,
		date : require('moment')().format('YYYY-MM-DD HH:mm:ss'),
		customer_id : req.body.customer_id
	}
	connection.query('INSERT INTO Application_Review SET ?', app_review, function(err, rows, fields) {
		if (!err) {
			app_review.review_id = rows.insertId;
			res.send(rows[0])
			console.log("Retrieved application reviews")
		}
		else {
			res.send(err)
			console.log("Error in retrieving application reviews " + err)
		}
	});
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

