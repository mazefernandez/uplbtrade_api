'use strict'

const connection = require(__dirname + '/../db.js')

exports.getTransactions = (req, res) => {
	connection.query('SELECT * FROM Transaction', [], function (err, rows, fields) {
		if (!err) {
			res.send(rows)
			console.log("Retrieved all transactions")
		}
		else {
			res.send(err)
			console.log("Error retrieving all transactions" + err)
		}
	})
}

exports.getTransaction = (req, res) => {
	connection.query('SELECT * FROM Transaction where transaction_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(rows[0])
			console.log("Retrieved transaction")
		}
		else {
			res.send(err)
			console.log("Error retrieving transaction " + err)
		}
	})
}


exports.getBuyerTransactions = (req, res) => {
	connection.query('SELECT * FROM Transaction where buyer_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(rows)
			console.log("Retrieved buyer transactions")
			console.log(req.params.id)
			console.log(rows)
		}
		else {
			res.send(err)
			console.log("Error in receiving buyer transactions")
		}
	})
}

exports.getSellerTransactions = (req, res) => {
	connection.query('SELECT * FROM Transaction where seller_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
			res.send(rows)
			console.log("Retrieved seller transactions")
			console.log(req.params.id)
			console.log(rows)
		}
		else {
			res.send(err)
			console.log("Error in receiving seller transactions")
		}
	})
}

exports.addTransaction = (req, res) => {
	var transaction = {
		date : req.body.date, 
		time : req.body.time,
		venue : req.body.venue,
		item_id : req.body.item_id,
		offer_id : req.body.offer_id,
		seller_id : req.body.seller_id,
		buyer_id : req.body.buyer_id
	}
	console.log(req.body.offer_id)
	connection.query("INSERT INTO Transaction(date, time, venue, item_id, offer_id, seller_id, buyer_id) VALUES(STR_TO_DATE(?,'%Y-%m-%d'),STR_TO_DATE(?, '%h:%i:%s'),?,?,?,?,?)", 
	[req.body.date, req.body.time, req.body.venue,req.body.item_id, req.body.offer_id, req.body.seller_id, req.body.buyer_id ], function (err, rows, fields) {
		if (!err) {
			transaction.transaction_id = rows.insertId
			res.send(transaction)
			console.log("Added new transaction")
		}
		else {
			res.send(err)
			console.log("Error in adding transaction " + err)
		}
	})
}

exports.getLogs = (req,res) => {
	connection.query("SELECT Transaction.transaction_id, Transaction.date, Transaction.time, Transaction.venue, Transaction.item_id, Transaction.offer_id, Transaction.seller_id, Transaction.buyer_id, Transaction_Tracking.date, Transaction_Tracking.status FROM Transaction INNER JOIN Transaction_Tracking ON Transaction.transaction_id = Transaction_Tracking.transaction_id", [], function(err, rows, fields) {
		if(!err) {
			res.send(rows)
			console.log("Received logs")
		}
		else {
			res.send(err)
			console.log("Error in receiving logs")
		}
	})
}
