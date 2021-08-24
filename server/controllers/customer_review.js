'use strict'

import mysql from 'mysql'
const connection = require(__dirname + '/../db.js')

export function getCustomerReviews(req, res) {
	connection.query('SELECT * FROM Customer_Review', [], function(err, rows, fields) {
		if (!err) {
			res.send(rows)
			console.log("Retrieved Customer Reviews")
		}
		else {
			res.send(err)
			console.log("Error in retrieving Customer Reviews")
		}
	})
}


export function getCustomerReview(req, res) {
	connection.query('SELECT * FROM Customer_Review where customer_review_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(rows[0])
			console.log("Retrieved Customer Review")
		}
		else {
			res.send(err) 
			console.log("Error in retrieving customer review")
		}
	})
}

export function getSpecificCustomerReviews(req, res) {
	connection.query('SELECT * FROM Customer_Review where customer_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(rows)
			console.log("Retrieved specific customer reviews")
		}
		else {
			res.send(err)
			console.log("Error in retrieving specific customer reviews")
		}
	})
}

export function getRating(req, res) {
	connection.query('SELECT AVG(rating) FROM Customer_Review where customer_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(rows[0])
			console.log("Retrieved average customer rating")
		}
		else {
			res.send(err)
			console.log("Error in retrieving customer rating")
		}
	})
}

export function deleteCustomerReview(req, res) {
	connection.query('DELETE FROM Customer_Review where customer_review_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(null)
			console.log("Deleted Customer Review")
		}
		else {
			res.send(err)
			console.log("Error in deleting customer review")
		}
	})
}
