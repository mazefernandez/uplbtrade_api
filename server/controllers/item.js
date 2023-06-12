'use strict' 

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

exports.getItemByImg = (req, res) => {
	connection.query('SELECT * FROM Item where image = ?', [req.params.img], function(err, rows, fields) {
		if (!err) {
			res.send(rows[0])
			console.log("Retrieved item_id")
		}
		else {
			res.send(err)
			console.log("Error in retrieving item_id " + err)
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
	    item_id : req.params.id,
	    name : req.body.name,
		description : req.body.description,
		price : req.body.price,
		image : req.body.image,
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

exports.searchItemTags = (req,res) => {
    var values = []
    var tags = values.concat(req.body)

    var query = 'SELECT DISTINCT item_id from Tagmap WHERE '
    for (let i=0; i<tags.length; i++) {
        query = query + 'tag_name = ? OR '
        values.push(tags[i])
    }
    console.log(values)
    var sql = query.slice(0,-3)
    connection.query(sql, values, function(err,rows,fields) {
        if (!err) {
	    res.send(rows)
	    console.log(rows)
	    console.log("Used tags to search for items")
        }
	else {
	    res.send(err)
	    console.log("Error in using tags to search for items" + err)
	}
    })
}

exports.getItemsByIds = (req,res) => {
    var values = []
    var ids = values.concat(req.body)

    var query = 'SELECT * from Item WHERE '
    for (let i=0; i<ids.length; i++) {
	query = query + 'item_id = ? OR '
	values.push(ids[i])
    }
    var sql = query.slice(0,-3)
    connection.query(sql, values, function(err,rows,fields) {
	if (!err) {
	    res.send(rows)
	    console.log("Retrieved the items from tags")
	}
	else {
	    res.send(err)
	    console.log("Error in retrieving items from tags")
	}
    })
}

