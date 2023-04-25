'use strict' 

const connection = require(__dirname + '/../db.js')

exports.getTags = (req,res) => {
    connection.query('SELECT * FROM Tag', [], function(err, rows, fields) {
		if (!err) {
		    res.send(rows)
		    console.log("Retrieved all tags")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving all tags" + err) 
		}
    })
}

exports.getTagsFromItem = (req,res) => {
    connection.query('SELECT tag_name FROM Tagmap where Tagmap.item_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
		    res.send(rows)
		    console.log("Retrieved all tags from item")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving all tags from item " + err) 
		}
    })
}

exports.addTags = (req,res) => {
    var tags = req.body;
    connection.query('INSERT IGNORE into Tagmap(item_id, tag_name) VALUES ?', tags, function(err, rows, fields) {
        if (!err) {
	    console.log("Added new tagmap")
            res.send(rows)
	 }
        else {
	    console.log("Error in adding new tagmap " + err)
        }
    })
}
