'use strict'

import mysql from 'mysql'
const connection = require(__dirname + '/../db.js')

export function getApplicationReviews(req,res) {
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

export function getApplicationReview(req,res) {
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

export function getRating(req, res) {
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

export function addApplicationReview(req, res) {
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
			console.log("add application review")
		}
		else {
			res.send(err)
			console.log("Error in retrieving application reviews " + err)
		}
	});
}

export function deleteApplicationReview(req, res) {
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

export function getReviewCustomers(req,res) {
	connection.query('SELECT * FROM Application_Review, Customer where Application_Review.customer_id = Customer.customer_id', [], function(err, rows, fields) {
		if (!err) {
			res.send(rows);
			console.log("admin retrieve app reviews")
		}
		else {
			res.send(err)
			console.log("error in admin retrieve app reviews " + err)
		}
	})
}

export function getCount(req,res) {
	connection.query('SELECT count(rating) from Application_Review', [], function(err,rows,fields) {
		if (!err) {
			res.send(rows[0])
			console.log("admin retrieve app review count") 
		}
		else {
			res.send(err)
			console.log("error in admin retrieve app review count " + err)
		}
	})
}

export function getAverage(req,res) {
	connection.query('SELECT round(avg(rating),2) from Application_Review', [], function(err,rows,fields) {
		if (!err) {
			res.send(rows[0])
			console.log("admin retrieve app review average rating") 
		} 
		else {
			res.send(err) 
			console.log("error in admin retrieve app review average rating " + err)
		}
	})
}
