'use strict'

const connection = require(__dirname + '/../db.js')

exports.getCustomerReviews = (req, res) => {
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


exports.getCustomerReview = (req, res) => {
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

exports.addCustomerReview = (req, res) => {
	var customer_review = {
		rating : req.body.rating,
		review : req.body.review,
		date : require('moment')().format('YYYY-MM-DD HH:mm:ss'),
		rater_id: req.body.rater_id,
		rated_id : req.body.customer_id,
		transaction_id: req.body.transaction_id
	}
	connection.query('INSERT INTO Customer_Review SET ?', customer_review, function(err, rows, fields) {
		if (!err) {
			customer_review.customer_review_id = rows.insertId;
			res.send(rows[0])
			console.log("add customer review")
		}
		else {
			res.send(err)
			console.log("Error in adding customer review" + err)
		}
	});
}

exports.getSpecificCustomerReviews = (req, res) => {
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

exports.getRating = (req, res) => {
	connection.query('SELECT AVG(rating) FROM Customer_Review where rated_id = ?', [req.params.id], function(err, rows, fields) {
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

exports.deleteCustomerReview = (req, res) => {
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
