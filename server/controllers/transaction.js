'use strict'

import mysql from 'mysql'
const connection = require(__dirname + '/../db.js')

export function getTransactions(req, res) {
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

export function getTransaction(req, res) {
	connection.query('SELECT * FROM Transaction where transaction_id = ?', req.params.id, function(err, rows, fields) {
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

export function addTransaction(req, res) {
	var transaction = {
		item_id : req.body.item_id,
		offer_id : req.body.offer_id,
		seller_id : req.body.seller_id,
		buyer_id : req.body.buyer_id
	}
	connection.query('INSERT INTO Transaction SET ?', transaction, function (err, rows, fields) {
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

