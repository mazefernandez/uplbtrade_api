'use strict' 

const mysql = require('mysql') 
const connection = require(__dirname + '/../db.js')

exports.getItems = (req,res) => {
    connection.query('SELECT * FROM Item', [], function(err, rows, fields) {
    	if (!err) {
		    res.send(rows)
		    console.log("Retrieved all items")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving all items " + err)
		}
    })
}

exports.getItem = (req,res) => {
    connection.query('SELECT * FROM Item where item_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
		    res.send(rows[0])
		    console.log("Retrieved item")
		}
		else {
			res.send(err)
		    console.log("Error in retrieving item " + err)
		}
    })
}

exports.addItem = (req,res) => {
    var item = {
		name : req.body.name, 
		description : req.body.description,
		price : req.body.price,
		image : req.body.image,
		condition : req.body.condition,
		customer_id : req.body.customer_id
    }
    connection.query('INSERT into Item SET ?', item, function(err, rows, fields) {
		if (!err) {
		    item.item_id = rows.insertId
		    res.send(item)
		    console.log("Added new item")
		}
		else {
		    res.send(err)
		    console.log("Error in adding new item " + err)
		}
    }) 
}

exports.updateItem = (req,res) => {
    var item = {
		name : req.body.name,
		description : req.body.description,
		price : req.body.price,
		image : (typeof req.file != 'undefined') ? req.file.path.substring(req.file.path.indexOf('/../../images')).replace('images','') : req.body.image,
		condition : req.body.condition
    }
    connection.query('UPDATE Item SET name = ?, description = ?, price = ?, image = ?, `condition` = ? WHERE item_id = ?', [req.body.name, req.body.description, req.body.price, req.body.image, req.body.condition, req.params.id], function(err, rows, fields) {
        if (!err) {
		    res.send(item)
		    console.log("Updated item")
		}
		else {
		    res.send(err)
		    console.log("Error in updating item " + err) 
		}
    })
}

exports.deleteItem = (req,res) => {
    connection.query('DELETE FROM Item WHERE item_id = ?', [req.params.id], function(err, rows, fields) {
	if (!err) {
		    res.send(null)
		    console.log("Deleted item")
		}
		else {
		    res.send(err)
		    console.log("Error in deleting item " + err)
		}
    })
}

exports.searchItems = (req,res) => {
    connection.query('SELECT * FROM Item WHERE Name LIKE ?', ['%' + req.params.search + '%'], function(err,rows,fields) {
        if (!err) {
		    res.send(rows)
		    console.log("Searched for items") 
		}
		else {
		    res.send(err)
		    console.log("Error in searching for items")
		}
    })
}
